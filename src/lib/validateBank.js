// Question-bank validation.
//
// Pure and dependency-free. Returns errors instead of throwing, so a single bad
// question can be reported and dropped rather than crashing the app.
//
// This is the safety net that makes it possible to author hundreds of questions
// in batches: every structural mistake that a bulk-authoring pass can make is
// caught here and fails `npm test` before it can reach a user.

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} topic
 * @property {'easy'|'intermediate'|'hard'} tier
 * @property {'mcq'|'multi'|'output'|'bug'|'order'|'flashcard'} type
 * @property {string} prompt
 * @property {string} [code]
 * @property {string} explanation
 * @property {string[]} [tags]
 * @property {string[]} [options]
 * @property {number} [answerIndex]
 * @property {number[]} [answerIndices]
 * @property {string[]} [items]
 * @property {string} [back]
 */

export const TIERS = ['easy', 'intermediate', 'hard']
export const TYPES = ['mcq', 'multi', 'output', 'bug', 'order', 'flashcard']

/** Which answer-shape field belongs to which type. Anything else is a mistake. */
const ANSWER_FIELDS = {
  mcq: ['options', 'answerIndex'],
  multi: ['options', 'answerIndices'],
  output: ['options', 'answerIndex'],
  bug: ['options', 'answerIndex'],
  order: ['items'],
  flashcard: ['back'],
}

const ALL_ANSWER_FIELDS = ['options', 'answerIndex', 'answerIndices', 'items', 'back']

const LIMITS = {
  promptMin: 10,
  promptMax: 400,
  explanationMin: 20,
  explanationMax: 600,
  optionMax: 200,
}

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0

/** Lowercase and collapse whitespace, for duplicate detection. */
export function normalize(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** The key two questions must not share. */
export function dupKey(q) {
  return `${normalize(q && q.prompt)}||${normalize(q && q.code)}`
}

/**
 * Validate one question.
 * @returns {string[]} human-readable problems; empty means valid.
 */
export function validateQuestion(q, knownTopicIds) {
  const errors = []

  if (!q || typeof q !== 'object' || Array.isArray(q)) {
    return ['question is not an object']
  }

  // --- required strings -----------------------------------------------------
  // `explanation` is required everywhere EXCEPT flashcards, where `back` is
  // already the teaching content and a second field would just duplicate it.
  const requiredStrings = ['id', 'topic', 'tier', 'type', 'prompt']
  if (q.type !== 'flashcard') requiredStrings.push('explanation')
  for (const field of requiredStrings) {
    if (!isNonEmptyString(q[field])) errors.push(`${field} must be a non-empty string`)
  }
  if (errors.length) return errors // nothing else can be checked meaningfully

  // --- enums ----------------------------------------------------------------
  if (!TIERS.includes(q.tier)) errors.push(`tier "${q.tier}" must be one of ${TIERS.join(', ')}`)
  if (!TYPES.includes(q.type)) {
    errors.push(`type "${q.type}" must be one of ${TYPES.join(', ')}`)
    return errors // per-type checks below are meaningless without a valid type
  }

  // --- topic integrity ------------------------------------------------------
  // The id-prefix rule catches the single most common bulk-authoring mistake:
  // copying a whole topic file and forgetting to change the ids and topic.
  const known = knownTopicIds instanceof Set ? knownTopicIds : new Set(knownTopicIds || [])
  if (!known.has(q.topic)) errors.push(`topic "${q.topic}" does not exist in topics.js`)
  if (!q.id.startsWith(`${q.topic}-`)) {
    errors.push(`id "${q.id}" must start with "${q.topic}-" (topic and id disagree)`)
  }

  // --- no stray answer fields from another type -----------------------------
  const allowed = ANSWER_FIELDS[q.type]
  for (const field of ALL_ANSWER_FIELDS) {
    if (!allowed.includes(field) && q[field] !== undefined) {
      errors.push(`type "${q.type}" must not define "${field}" (half-converted from another type?)`)
    }
  }
  for (const field of allowed) {
    if (q[field] === undefined) errors.push(`type "${q.type}" requires "${field}"`)
  }

  // --- code required for the code-reading types -----------------------------
  if ((q.type === 'output' || q.type === 'bug') && !isNonEmptyString(q.code)) {
    errors.push(`type "${q.type}" requires a non-empty code block`)
  }

  // --- option-based types ---------------------------------------------------
  if (allowed.includes('options') && Array.isArray(q.options)) {
    const opts = q.options
    if (opts.length < 2) errors.push('options needs at least 2 entries')
    if (q.type === 'multi' && (opts.length < 4 || opts.length > 6)) {
      errors.push(`multi needs 4-6 options, got ${opts.length}`)
    }
    if (q.type !== 'multi' && opts.length > 6) {
      errors.push(`options must have at most 6 entries, got ${opts.length}`)
    }
    opts.forEach((o, i) => {
      if (!isNonEmptyString(o)) errors.push(`option ${i} is empty`)
      else if (o.length > LIMITS.optionMax) errors.push(`option ${i} exceeds ${LIMITS.optionMax} chars`)
    })
    // A repeated option makes the question unanswerable.
    const seen = new Set()
    opts.forEach((o, i) => {
      const key = normalize(o)
      if (seen.has(key)) errors.push(`option ${i} duplicates an earlier option ("${o}")`)
      seen.add(key)
    })
  } else if (allowed.includes('options')) {
    errors.push('options must be an array')
  }

  // --- answerIndex ----------------------------------------------------------
  if (allowed.includes('answerIndex')) {
    const n = Array.isArray(q.options) ? q.options.length : 0
    if (!Number.isInteger(q.answerIndex)) errors.push('answerIndex must be an integer')
    else if (q.answerIndex < 0 || q.answerIndex >= n) {
      errors.push(`answerIndex ${q.answerIndex} is out of range for ${n} options`)
    }
  }

  // --- answerIndices --------------------------------------------------------
  if (allowed.includes('answerIndices')) {
    const n = Array.isArray(q.options) ? q.options.length : 0
    const a = q.answerIndices
    if (!Array.isArray(a)) {
      errors.push('answerIndices must be an array')
    } else {
      if (a.length < 2) errors.push('multi needs at least 2 correct answers')
      if (n > 0 && a.length >= n) errors.push('multi cannot have every option correct')
      if (!a.every(Number.isInteger)) errors.push('answerIndices must all be integers')
      if (a.some((i) => i < 0 || i >= n)) errors.push(`answerIndices out of range for ${n} options`)
      if (new Set(a).size !== a.length) errors.push('answerIndices contains duplicates')
      if (a.some((v, i) => i > 0 && v <= a[i - 1])) errors.push('answerIndices must be ascending')
    }
  }

  // --- order ----------------------------------------------------------------
  // items are stored in the CORRECT order; the runtime shuffles for display.
  if (allowed.includes('items')) {
    if (!Array.isArray(q.items)) {
      errors.push('items must be an array')
    } else {
      if (q.items.length < 3 || q.items.length > 7) {
        errors.push(`order needs 3-7 items, got ${q.items.length}`)
      }
      q.items.forEach((it, i) => {
        if (!isNonEmptyString(it)) errors.push(`item ${i} is empty`)
      })
      const seen = new Set()
      q.items.forEach((it, i) => {
        const key = normalize(it)
        if (seen.has(key)) errors.push(`item ${i} duplicates an earlier item`)
        seen.add(key)
      })
    }
  }

  // --- flashcard ------------------------------------------------------------
  if (allowed.includes('back')) {
    if (!isNonEmptyString(q.back)) errors.push('back must be a non-empty string')
    else if (q.back.length < 3 || q.back.length > 400) errors.push('back must be 3-400 chars')
  }

  // --- length bounds (catch truncated or runaway generations) ---------------
  if (q.prompt.length < LIMITS.promptMin || q.prompt.length > LIMITS.promptMax) {
    errors.push(`prompt must be ${LIMITS.promptMin}-${LIMITS.promptMax} chars, got ${q.prompt.length}`)
  }
  if (typeof q.explanation === 'string') {
    if (q.explanation.length < LIMITS.explanationMin || q.explanation.length > LIMITS.explanationMax) {
      errors.push(
        `explanation must be ${LIMITS.explanationMin}-${LIMITS.explanationMax} chars, got ${q.explanation.length}`,
      )
    }
  }

  // --- optional tags --------------------------------------------------------
  if (q.tags !== undefined) {
    if (!Array.isArray(q.tags) || !q.tags.every(isNonEmptyString)) {
      errors.push('tags must be an array of non-empty strings')
    }
  }

  return errors
}

/**
 * Validate the whole bank.
 * @returns {{errors: {id: string|undefined, index: number, message: string}[],
 *            warnings: {id: string|undefined, message: string}[]}}
 */
export function validateBank(questions, topics) {
  const errors = []
  const warnings = []
  const knownTopicIds = new Set((topics || []).map((t) => t.id))

  const list = Array.isArray(questions) ? questions : []

  // per-question
  list.forEach((q, index) => {
    for (const message of validateQuestion(q, knownTopicIds)) {
      errors.push({ id: q && q.id, index, message })
    }
  })

  // bank-level: unique ids
  const idCounts = new Map()
  list.forEach((q) => {
    const id = q && q.id
    if (typeof id === 'string') idCounts.set(id, (idCounts.get(id) || 0) + 1)
  })
  for (const [id, count] of idCounts) {
    if (count > 1) errors.push({ id, index: -1, message: `duplicate id used ${count} times` })
  }

  // bank-level: exact duplicate prompt+code is an error
  const byDupKey = new Map()
  list.forEach((q, index) => {
    if (!q || typeof q.prompt !== 'string') return
    const key = dupKey(q)
    if (byDupKey.has(key)) {
      errors.push({
        id: q.id,
        index,
        message: `duplicate question - same prompt and code as "${byDupKey.get(key)}"`,
      })
    } else {
      byDupKey.set(key, q.id)
    }
  })

  // bank-level: near-duplicates are warnings only (a human decides)
  const byPrefix = new Map()
  const byOptionSet = new Map()
  list.forEach((q) => {
    if (!q || typeof q.prompt !== 'string') return
    const prefix = normalize(q.prompt).slice(0, 60)
    if (prefix.length === 60) {
      if (byPrefix.has(prefix)) {
        warnings.push({ id: q.id, message: `near-duplicate prompt of "${byPrefix.get(prefix)}"` })
      } else {
        byPrefix.set(prefix, q.id)
      }
    }
    if (Array.isArray(q.options) && q.options.length >= 3) {
      const key = q.options.map(normalize).sort().join('|')
      if (byOptionSet.has(key)) {
        warnings.push({ id: q.id, message: `identical option set to "${byOptionSet.get(key)}"` })
      } else {
        byOptionSet.set(key, q.id)
      }
    }
  })

  return { errors, warnings }
}

export default validateBank
