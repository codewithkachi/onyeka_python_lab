// Home: the fun-mode tiles, then the topic grid split into Core Python and
// Python for ML/AI.

import topics, { TOPIC_GROUPS } from '../data/topics.js'
import { countsByTopic } from '../lib/selectors.js'
import { masteryBand } from '../lib/grading.js'
import { buildHash } from '../lib/routes.js'
import { storageAvailable } from '../lib/storage.js'
import { IS_PORTABLE } from '../lib/buildMode.js'
import { Badge, ProgressBar, Notice } from '../components/ui.jsx'

const MODES = [
  { route: 'daily', icon: '📅', title: 'Daily Challenge', desc: 'Ten questions. Same set worldwide. Keep your streak alive.' },
  { route: 'boss', icon: '⚔️', title: 'Boss Battle', desc: 'Beat the clock with three lives and a rising combo multiplier.' },
  { route: 'flashcards', icon: '🃏', title: 'Flashcards', desc: 'Spaced repetition for the things worth memorising.' },
  { route: 'ordering', icon: '🧩', title: 'Code Ordering', desc: 'Drag scrambled lines back into working order.' },
  { route: 'playground', icon: '🐍', title: 'Python Playground', desc: 'Run real Python in your browser.', needsNet: true },
  { route: 'stats', icon: '📊', title: 'Your Stats', desc: 'Accuracy by topic and tier, and your weakest areas.' },
]

function TopicCard({ topic, count, progress }) {
  const pct = progress?.bestPercent
  const empty = count === 0

  const inner = (
    <>
      <div className="tile__top">
        <span className="tile__icon" aria-hidden="true">
          {topic.icon}
        </span>
        {empty ? (
          <Badge>soon</Badge>
        ) : pct !== undefined ? (
          <Badge tone={masteryBand(pct)}>{pct}%</Badge>
        ) : (
          <Badge>{count} Qs</Badge>
        )}
      </div>
      <span className="tile__title">{topic.title}</span>
      {pct !== undefined && <ProgressBar value={pct} label={`${topic.title} best score`} />}
    </>
  )

  if (empty) {
    return (
      <div className="tile tile--empty" aria-disabled="true">
        {inner}
      </div>
    )
  }

  return (
    <a
      className="tile"
      href={buildHash('quiz', { topicId: topic.id })}
      style={{ '--topic-accent': topic.accent }}
    >
      {inner}
    </a>
  )
}

export default function HomeScreen({ bank, progress }) {
  const counts = countsByTopic(bank)
  const groups = ['core', 'ml']

  const answered = Object.values(progress || {}).reduce((a, p) => a + (p.attempts || 0), 0)

  return (
    <>
      <div className="page-head">
        <h1>Onyeka Python Lab</h1>
        <p className="page-head__sub">
          {bank.length} questions across {topics.length} topics — core Python through machine
          learning and AI.
        </p>
      </div>

      {!storageAvailable && (
        <Notice>
          This browser is blocking local storage, so your progress won’t be saved between visits.
          Everything else works normally.
        </Notice>
      )}

      <div className="grid-modes">
        {MODES.map((m) => (
          <a className="tile" key={m.route} href={buildHash(m.route)}>
            <div className="tile__top">
              <span className="tile__icon" aria-hidden="true">
                {m.icon}
              </span>
              {m.needsNet && IS_PORTABLE && <Badge>needs internet</Badge>}
            </div>
            <span className="tile__title">{m.title}</span>
            <span className="tile__desc">{m.desc}</span>
          </a>
        ))}
      </div>

      {answered > 0 && (
        <div className="stat-row mb-4">
          <span>
            <span className="stat-row__value">{Object.keys(progress).length}</span> topics attempted
          </span>
          <span>
            <span className="stat-row__value">{answered}</span> runs completed
          </span>
        </div>
      )}

      {groups.map((group) => {
        const list = topics.filter((t) => t.group === group)
        const ready = list.filter((t) => (counts[t.id] || 0) > 0).length
        return (
          <section className="section" key={group}>
            <div className="section__head">
              <h2 className="section__title">{TOPIC_GROUPS[group]}</h2>
              <span className="section__count">
                {ready}/{list.length} ready
              </span>
            </div>
            <div className="grid-topics">
              {list.map((t) => (
                <TopicCard
                  key={t.id}
                  topic={t}
                  count={counts[t.id] || 0}
                  progress={progress?.[t.id]}
                />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
