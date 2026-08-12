// Flashcards with spaced repetition.
//
// Only cards due today are shown. Grading one schedules its next appearance
// through lib/srs.js and persists immediately.

import { useMemo, useState } from 'react'
import { flashcardsOnly } from '../lib/selectors.js'
import { dueCards, reviewCard, newCard } from '../lib/srs.js'
import { todayKey } from '../lib/dates.js'
import { getTopic } from '../data/topics.js'
import { Button, Card, Badge, EmptyState, BackLink, ProgressBar } from '../components/ui.jsx'

export default function FlashcardsScreen({ bank, srs, setSrs }) {
  const today = todayKey()
  const all = useMemo(() => flashcardsOnly(bank), [bank])

  // Frozen at mount: grading a card would otherwise remove it from the queue
  // mid-session and shuffle the remaining cards under the user.
  const [queue] = useState(() => dueCards(all, srs, today))
  const [position, setPosition] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = queue[position]

  function grade(g) {
    setSrs((prev) => ({
      ...prev,
      [card.id]: reviewCard(prev[card.id] || newCard(), g, today),
    }))
    setFlipped(false)
    setPosition((p) => p + 1)
  }

  if (all.length === 0) {
    return (
      <EmptyState icon="🃏" title="No flashcards yet" action={<BackLink />}>
        Flashcards appear here as topics are filled in.
      </EmptyState>
    )
  }

  if (!card) {
    const reviewed = queue.length
    return (
      <EmptyState
        icon={reviewed > 0 ? '✅' : '🌙'}
        title={reviewed > 0 ? `Done — ${reviewed} card${reviewed === 1 ? '' : 's'} reviewed` : 'Nothing due today'}
        action={<BackLink />}
      >
        {reviewed > 0
          ? 'Come back tomorrow for the next batch.'
          : `All ${all.length} cards are scheduled for a future day.`}
      </EmptyState>
    )
  }

  const topic = getTopic(card.topic)

  return (
    <div className="stage" style={{ '--topic-accent': topic?.accent }}>
      <div className="stage__bar">
        <BackLink />
        <span>
          {topic?.icon} {topic?.title}
        </span>
        <span className="stage__counter">
          {position + 1} / {queue.length}
        </span>
      </div>

      <ProgressBar value={(position / queue.length) * 100} label="Cards reviewed" />

      <Card className="mt-4 text-center">
        <Badge>{card.tier}</Badge>
        <p className="prompt mt-3">{card.prompt}</p>

        {flipped ? (
          <>
            <div className="explain">{card.back}</div>
            <p className="muted mt-4">How well did you know it?</p>
            <div className="result__actions">
              <Button variant="danger" onClick={() => grade('again')}>
                Again
              </Button>
              <Button variant="secondary" onClick={() => grade('good')}>
                Good
              </Button>
              <Button variant="primary" onClick={() => grade('easy')}>
                Easy
              </Button>
            </div>
          </>
        ) : (
          <Button variant="primary" block onClick={() => setFlipped(true)}>
            Show answer
          </Button>
        )}
      </Card>
    </div>
  )
}
