// Stats: accuracy by topic and tier, weakest areas, and a reset.

import topics from '../data/topics.js'
import { countsByTopic } from '../lib/selectors.js'
import { scorePercent, masteryBand } from '../lib/grading.js'
import { clearAll, storageAvailable } from '../lib/storage.js'
import { Card, Badge, ProgressBar, Button, EmptyState, BackLink, Notice } from '../components/ui.jsx'

function tierBreakdown(bank, seen) {
  const rows = {}
  for (const q of bank) {
    const s = seen[q.id]
    if (!s || !s.seen) continue
    const row = rows[q.tier] || { seen: 0, correct: 0 }
    row.seen += s.seen
    row.correct += s.correct
    rows[q.tier] = row
  }
  return rows
}

export default function StatsScreen({ bank, progress, seen, daily, bossRecord }) {
  const counts = countsByTopic(bank)
  const attempted = topics.filter((t) => progress?.[t.id])
  const tiers = tierBreakdown(bank, seen || {})

  const answered = Object.values(seen || {}).reduce((a, s) => a + (s.seen || 0), 0)
  const gotRight = Object.values(seen || {}).reduce((a, s) => a + (s.correct || 0), 0)

  const weakest = attempted
    .map((t) => ({ topic: t, pct: progress[t.id].bestPercent ?? 0 }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3)

  function reset() {
    if (window.confirm('Delete all saved progress, streaks and flashcard scheduling?')) {
      clearAll()
      window.location.reload()
    }
  }

  if (answered === 0) {
    return (
      <EmptyState icon="📊" title="No stats yet" action={<BackLink />}>
        Finish a quiz and your accuracy will show up here.
      </EmptyState>
    )
  }

  return (
    <>
      <div className="page-head">
        <h1>Your stats</h1>
        <p className="page-head__sub">
          {gotRight} correct out of {answered} answered — {scorePercent(gotRight, answered)}% overall
        </p>
      </div>

      {!storageAvailable && (
        <Notice>
          Local storage is blocked in this browser, so these numbers cover this session only.
        </Notice>
      )}

      <div className="grid-modes">
        <Card className="card--pad-sm">
          <p className="muted">Overall accuracy</p>
          <p className="result__pct">{scorePercent(gotRight, answered)}%</p>
        </Card>
        <Card className="card--pad-sm">
          <p className="muted">Daily streak</p>
          <p className="result__pct">🔥 {daily?.streak ?? 0}</p>
          <p className="muted">longest {daily?.longest ?? 0}</p>
        </Card>
        <Card className="card--pad-sm">
          <p className="muted">Boss high score</p>
          <p className="result__pct">{bossRecord?.highScore ?? 0}</p>
          <p className="muted">
            {bossRecord?.runs ?? 0} runs · best combo {bossRecord?.bestCombo ?? 0}
          </p>
        </Card>
      </div>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Accuracy by difficulty</h2>
        </div>
        <div className="stack">
          {['easy', 'intermediate', 'hard'].map((tier) => {
            const row = tiers[tier]
            const pct = row ? scorePercent(row.correct, row.seen) : 0
            return (
              <div key={tier}>
                <div className="row row--between">
                  <span>{tier}</span>
                  <Badge tone={row ? masteryBand(pct) : undefined}>
                    {row ? `${pct}% of ${row.seen}` : 'not tried'}
                  </Badge>
                </div>
                <ProgressBar value={pct} label={`${tier} accuracy`} />
              </div>
            )
          })}
        </div>
      </section>

      {weakest.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2 className="section__title">Worth another look</h2>
          </div>
          <div className="grid-topics">
            {weakest.map(({ topic, pct }) => (
              <a
                key={topic.id}
                className="tile"
                href={`#/quiz/${topic.id}`}
                style={{ '--topic-accent': topic.accent }}
              >
                <div className="tile__top">
                  <span className="tile__icon" aria-hidden="true">
                    {topic.icon}
                  </span>
                  <Badge tone={masteryBand(pct)}>{pct}%</Badge>
                </div>
                <span className="tile__title">{topic.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Every topic you have tried</h2>
          <span className="section__count">
            {attempted.length}/{topics.length}
          </span>
        </div>
        <div className="stack">
          {attempted.map((t) => {
            const p = progress[t.id]
            return (
              <div key={t.id}>
                <div className="row row--between">
                  <span>
                    {t.icon} {t.title}{' '}
                    <span className="muted">
                      ({p.attempts} run{p.attempts === 1 ? '' : 's'} · {counts[t.id]} Qs)
                    </span>
                  </span>
                  <Badge tone={masteryBand(p.bestPercent)}>best {p.bestPercent}%</Badge>
                </div>
                <ProgressBar value={p.bestPercent} label={`${t.title} best score`} />
              </div>
            )
          })}
        </div>
      </section>

      <Button variant="danger" onClick={reset}>
        Reset all progress
      </Button>
    </>
  )
}
