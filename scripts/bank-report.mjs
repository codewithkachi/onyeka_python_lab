// Question-bank dashboard. Run with: npm run bank:report
//
// This is a plain Node script, NOT a test, so it never fails a build. It is the
// progress dashboard during content authoring.
//
//   npm run bank:report                  full per-topic table
//   npm run bank:report -- --grep len    list existing prompts matching "len"
//
// Use --grep BEFORE authoring a topic to check a question is not already asked
// somewhere else. That is what stops "what does len() return" appearing in four
// different topics.

import topics from '../src/data/topics.js'
import { allQuestions } from '../src/data/questions/index.js'
import { validateBank } from '../src/lib/validateBank.js'

const args = process.argv.slice(2)
const grepAt = args.findIndex((a) => a === '--grep')
const grepTerm = grepAt >= 0 ? args[grepAt + 1] : null

// ---------------------------------------------------------------- grep mode
if (grepTerm) {
  const needle = grepTerm.toLowerCase()
  const hits = allQuestions.filter(
    (q) =>
      q.prompt.toLowerCase().includes(needle) ||
      (q.code || '').toLowerCase().includes(needle) ||
      (q.tags || []).some((t) => t.toLowerCase().includes(needle)),
  )
  console.log(`\n  ${hits.length} existing question(s) matching "${grepTerm}":\n`)
  for (const q of hits) {
    console.log(`  [${q.topic}/${q.tier}/${q.type}] ${q.id}`)
    console.log(`      ${q.prompt.replace(/\s+/g, ' ').slice(0, 100)}`)
  }
  console.log('')
  process.exit(0)
}

// --------------------------------------------------------------- table mode
const TYPES = ['mcq', 'multi', 'output', 'bug', 'order', 'flashcard']
const pad = (s, n) => String(s).padEnd(n)
const num = (s, n) => String(s).padStart(n)

const header =
  pad('topic', 24) +
  num('tgt', 4) +
  num('act', 5) +
  '  ' +
  num('esy', 4) +
  num('int', 4) +
  num('hrd', 4) +
  '  ' +
  TYPES.map((t) => num(t.slice(0, 4), 6)).join('') +
  '   status'

console.log('')
console.log(header)
console.log('-'.repeat(header.length))

let totalTarget = 0
let totalActual = 0
const incomplete = []

for (const t of topics) {
  const qs = allQuestions.filter((q) => q.topic === t.id)
  const tier = (name) => qs.filter((q) => q.tier === name).length
  const typeCount = (name) => qs.filter((q) => q.type === name).length

  totalTarget += t.target
  totalActual += qs.length

  const graded = qs.filter((q) => q.type !== 'flashcard' && q.type !== 'order')
  const problems = []
  if (qs.length !== t.target) problems.push(`${qs.length}/${t.target}`)
  if (qs.length > 0) {
    if (typeCount('flashcard') !== 2) problems.push(`flashcards=${typeCount('flashcard')}`)
    if (typeCount('order') !== 1) problems.push(`order=${typeCount('order')}`)
    if (typeCount('output') < 2) problems.push(`output=${typeCount('output')}`)
    if (typeCount('bug') < 1) problems.push('bug=0')
    if (typeCount('multi') < 1) problems.push('multi=0')
    if (graded.length > 0 && TIERS_MISSING(qs)) problems.push('tier-gap')
  }

  const status = qs.length === 0 ? 'empty' : problems.length === 0 ? 'OK' : problems.join(' ')
  if (status !== 'OK') incomplete.push(t.id)

  console.log(
    pad(t.id, 24) +
      num(t.target, 4) +
      num(qs.length, 5) +
      '  ' +
      num(tier('easy'), 4) +
      num(tier('intermediate'), 4) +
      num(tier('hard'), 4) +
      '  ' +
      TYPES.map((ty) => num(typeCount(ty), 6)).join('') +
      '   ' +
      status,
  )
}

function TIERS_MISSING(qs) {
  return !['easy', 'intermediate', 'hard'].every((t) => qs.some((q) => q.tier === t))
}

console.log('-'.repeat(header.length))
console.log(pad('TOTAL', 24) + num(totalTarget, 4) + num(totalActual, 5))

const core = allQuestions.filter((q) => {
  const t = topics.find((x) => x.id === q.topic)
  return t && t.group === 'core'
}).length
const pct = totalActual > 0 ? ((core / totalActual) * 100).toFixed(1) : '0.0'
console.log(`\n  core: ${core}   ml: ${totalActual - core}   core share: ${pct}%  (target ~60%)`)
console.log(`  complete topics: ${topics.length - incomplete.length}/${topics.length}`)

const { errors, warnings } = validateBank(allQuestions, topics)
console.log(`  validation errors: ${errors.length}`)
errors.slice(0, 10).forEach((e) => console.log(`    ERROR ${e.id ?? `#${e.index}`}: ${e.message}`))
console.log(`  near-duplicate warnings: ${warnings.length}`)
warnings.slice(0, 10).forEach((w) => console.log(`    WARN  ${w.id}: ${w.message}`))

if (incomplete.length > 0) {
  console.log(`\n  still to do: ${incomplete.join(', ')}`)
}
console.log('')
