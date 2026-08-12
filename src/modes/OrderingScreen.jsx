// Code-ordering puzzles.
//
// Reordering is done with Move up / Move down buttons rather than HTML5
// drag-and-drop: native drag does not work on touch at all and is invisible to
// keyboard users. Buttons work everywhere and are announced properly.

import { useMemo, useState } from 'react'
import { orderingOnly } from '../lib/selectors.js'
import { shuffleDifferent } from '../lib/random.js'
import { isCorrect } from '../lib/grading.js'
import { getTopic } from '../data/topics.js'
import { Button, Card, Badge, EmptyState, BackLink } from '../components/ui.jsx'

export default function OrderingScreen({ bank }) {
  const puzzles = useMemo(() => orderingOnly(bank), [bank])
  const [index, setIndex] = useState(0)
  const puzzle = puzzles[index]

  const [items, setItems] = useState(() =>
    puzzle ? shuffleDifferent(puzzle.items) : [],
  )
  const [checked, setChecked] = useState(false)

  function move(from, to) {
    if (checked || to < 0 || to >= items.length) return
    const next = [...items]
    ;[next[from], next[to]] = [next[to], next[from]]
    setItems(next)
  }

  function nextPuzzle() {
    const n = index + 1
    setIndex(n)
    setChecked(false)
    setItems(puzzles[n] ? shuffleDifferent(puzzles[n].items) : [])
  }

  function retry() {
    setChecked(false)
    setItems(shuffleDifferent(puzzle.items))
  }

  if (puzzles.length === 0) {
    return (
      <EmptyState icon="🧩" title="No ordering puzzles yet" action={<BackLink />}>
        These appear as topics are filled in.
      </EmptyState>
    )
  }

  if (!puzzle) {
    return (
      <EmptyState icon="🎉" title="You finished every puzzle" action={<BackLink />}>
        All {puzzles.length} ordering puzzles are done.
      </EmptyState>
    )
  }

  const topic = getTopic(puzzle.topic)
  const correct = checked && isCorrect(puzzle, items)

  return (
    <div className="stage" style={{ '--topic-accent': topic?.accent }}>
      <div className="stage__bar">
        <BackLink />
        <span>
          {topic?.icon} {topic?.title}
        </span>
        <span className="stage__counter">
          {index + 1} / {puzzles.length}
        </span>
      </div>

      <Card className="mt-4">
        <Badge>{puzzle.tier}</Badge>
        <p className="prompt mt-3">{puzzle.prompt}</p>

        <ol className="options">
          {items.map((line, i) => {
            const rightHere = checked && puzzle.items[i] === line
            const cls = checked ? (rightHere ? 'option option--correct' : 'option option--wrong') : 'option'
            return (
              <li key={line} className={cls}>
                <span className="option__key" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="option__text">{line}</span>
                {!checked && (
                  <span className="row">
                    <Button
                      className="btn--icon"
                      variant="ghost"
                      onClick={() => move(i, i - 1)}
                      disabled={i === 0}
                      aria-label={`Move line ${i + 1} up`}
                    >
                      ▲
                    </Button>
                    <Button
                      className="btn--icon"
                      variant="ghost"
                      onClick={() => move(i, i + 1)}
                      disabled={i === items.length - 1}
                      aria-label={`Move line ${i + 1} down`}
                    >
                      ▼
                    </Button>
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        {checked && (
          <div className={`explain ${correct ? 'explain--correct' : 'explain--wrong'}`}>
            <strong className="explain__verdict">
              {correct ? '✓ That is the right order' : '✗ Not quite'}
            </strong>
            {!correct && (
              <>
                <p className="mt-2">The correct order is:</p>
                <pre className="code mt-2">
                  <code>{puzzle.items.join('\n')}</code>
                </pre>
              </>
            )}
            {puzzle.explanation && <p className="mt-2">{puzzle.explanation}</p>}
          </div>
        )}

        <div className="result__actions">
          {checked ? (
            <>
              {!correct && (
                <Button variant="secondary" onClick={retry}>
                  Try again
                </Button>
              )}
              <Button variant="primary" onClick={nextPuzzle}>
                {index + 1 < puzzles.length ? 'Next puzzle →' : 'Finish'}
              </Button>
            </>
          ) : (
            <Button variant="primary" block onClick={() => setChecked(true)}>
              Check order
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
