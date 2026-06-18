import { useCallback, useMemo, useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'
import { PracticeTerminal } from '../components/PracticeTerminal'
import { QuestionSidebar } from '../components/QuestionSidebar'
import {
  CODING_PRACTICE_QUESTIONS,
  CODING_PRACTICE_POOL_SIZE,
  CODING_PRACTICE_SESSION_SIZE,
  REAL_WORLD_QUESTION_COUNT,
  type CodingPracticeQuestion,
} from '../data/coding-practice'
import {
  getCompletedQuestionIds,
  getSessionCorrectCount,
  incrementSessionCorrectCount,
  markQuestionCompleted,
  resetCodingPracticeProgress,
  resetSessionCorrectCount,
} from '../utils/codingPracticeProgress'
import {
  getSolutionStarter,
  wrapUserSolution,
} from '../utils/codingScaffold'
import {
  allTestsPassed,
  runCodingTests,
  type CodingTestResult,
} from '../utils/runCodingTests'

function pickRandomQuestion(completed: Set<number>): CodingPracticeQuestion | null {
  const remaining = CODING_PRACTICE_QUESTIONS.filter((q) => !completed.has(q.id))
  if (remaining.length === 0) return null
  const index = Math.floor(Math.random() * remaining.length)
  return remaining[index]
}

export function CodingPracticePage() {
  const [completedIds, setCompletedIds] = useState(() => getCompletedQuestionIds())
  const [sessionCorrect, setSessionCorrect] = useState(() => getSessionCorrectCount())
  const [current, setCurrent] = useState<CodingPracticeQuestion | null>(() =>
    pickRandomQuestion(getCompletedQuestionIds()),
  )
  const [code, setCode] = useState(() => (current ? getSolutionStarter(current) : ''))
  const [results, setResults] = useState<CodingTestResult[] | null>(null)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [success, setSuccess] = useState(false)

  const remainingCount = CODING_PRACTICE_POOL_SIZE - completedIds.size
  const sessionDone = sessionCorrect >= CODING_PRACTICE_SESSION_SIZE || remainingCount === 0

  const stats = useMemo(
    () => ({
      completed: completedIds.size,
      remaining: remainingCount,
      sessionCorrect,
      sessionRemaining: Math.max(0, CODING_PRACTICE_SESSION_SIZE - sessionCorrect),
    }),
    [completedIds.size, remainingCount, sessionCorrect],
  )

  const loadQuestion = useCallback((question: CodingPracticeQuestion | null) => {
    setCurrent(question)
    setCode(question ? getSolutionStarter(question) : '')
    setResults(null)
    setTerminalLines([])
    setSuccess(false)
  }, [])

  const handleRun = async () => {
    if (!current || running) return

    setRunning(true)
    setSuccess(false)

    const { results: testResults, terminalLines: lines } = await runCodingTests(
      wrapUserSolution(current, code),
      current.functionName,
      current.tests,
    )
    setResults(testResults)
    setTerminalLines(lines)

    if (allTestsPassed(testResults)) {
      setSuccess(true)
      markQuestionCompleted(current.id)

      const nextCompleted = new Set(completedIds)
      nextCompleted.add(current.id)
      setCompletedIds(nextCompleted)

      const nextSessionCount = incrementSessionCorrectCount()
      setSessionCorrect(nextSessionCount)

      if (nextSessionCount < CODING_PRACTICE_SESSION_SIZE) {
        const next = pickRandomQuestion(nextCompleted)
        if (next) {
          setTimeout(() => loadQuestion(next), 900)
        }
      }
    }

    setRunning(false)
  }

  const handleSkip = () => {
    if (!current) return
    loadQuestion(pickRandomQuestion(completedIds))
  }

  const handleReset = () => {
    resetCodingPracticeProgress()
    resetSessionCorrectCount()
    const fresh = getCompletedQuestionIds()
    setCompletedIds(fresh)
    setSessionCorrect(0)
    loadQuestion(pickRandomQuestion(fresh))
  }

  const handleNewSession = () => {
    resetSessionCorrectCount()
    setSessionCorrect(0)
    loadQuestion(pickRandomQuestion(completedIds))
  }

  const mainWorkspace = current ? (
    <article className="coding-practice-card">
      <div className="coding-practice-card-header">
        <span className="question-category-tag">{current.category}</span>
        <span className="coding-practice-meta">#{current.id}</span>
      </div>
      <h2 className="coding-practice-title">{current.title}</h2>
      <p className="coding-practice-prompt">{current.prompt}</p>

      <CodeEditor question={current} value={code} onChange={setCode} onRun={handleRun} disabled={running} />

      <PracticeTerminal lines={terminalLines} />

      <div className="coding-practice-actions">
        <button type="button" className="coding-practice-btn" onClick={handleRun} disabled={running}>
          {running ? 'Running…' : 'Run tests'}
        </button>
        <button type="button" className="coding-practice-btn-secondary" onClick={handleSkip}>
          Random question
        </button>
      </div>

      {success && (
        <p className="coding-practice-success" role="status">
          All tests passed — loading next question…
        </p>
      )}

      {results && (
        <div className="coding-practice-results">
          <h3>Test results</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index} className={result.passed ? 'pass' : 'fail'}>
                <span className="coding-practice-result-label">{result.label ?? `Test ${index + 1}`}</span>
                {result.passed ? (
                  <span className="coding-practice-result-status">Passed</span>
                ) : (
                  <span className="coding-practice-result-error">{result.error ?? 'Failed'}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  ) : (
    <p className="no-results">Select a question from the list or reset progress.</p>
  )

  if (!current && completedIds.size >= CODING_PRACTICE_POOL_SIZE) {
    return (
      <main className="page coding-practice-page">
        <header className="page-header page-header-compact">
          <h1>Coding Practice</h1>
          <p className="page-subtitle">You completed all {CODING_PRACTICE_POOL_SIZE} challenges.</p>
        </header>
        <div className="coding-practice-complete">
          <p>Great work — you have solved every question in the pool.</p>
          <button type="button" className="coding-practice-btn" onClick={handleReset}>
            Reset progress and start over
          </button>
        </div>
      </main>
    )
  }

  if (sessionDone && sessionCorrect >= CODING_PRACTICE_SESSION_SIZE) {
    return (
      <main className="page coding-practice-page">
        <header className="page-header page-header-compact">
          <h1>Coding Practice</h1>
          <p className="page-subtitle">Session complete — {CODING_PRACTICE_SESSION_SIZE} questions solved.</p>
        </header>
        <div className="coding-practice-complete">
          <p>
            {remainingCount > 0
              ? `${remainingCount} questions remain in the pool. Start a new session for more practice.`
              : 'You have completed the entire pool.'}
          </p>
          <div className="coding-practice-complete-actions">
            {remainingCount > 0 && (
              <button type="button" className="coding-practice-btn" onClick={handleNewSession}>
                New session
              </button>
            )}
            <button type="button" className="coding-practice-btn-secondary" onClick={handleReset}>
              Reset all progress
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page coding-practice-page">
      <header className="page-header page-header-compact">
        <h1>Coding Practice</h1>
        <p className="page-subtitle">
          {CODING_PRACTICE_POOL_SIZE} challenges ({REAL_WORLD_QUESTION_COUNT} real-world) — pick any question
          from the list. Each question shows sample inputs and a function signature — write only the
          body inside the braces and use <strong>return</strong> for the answer.
        </p>
      </header>

      <div className="coding-practice-stats">
        <span>
          Session: <strong>{stats.sessionCorrect}</strong> / {CODING_PRACTICE_SESSION_SIZE}
        </span>
        <span>
          Pool: <strong>{stats.completed}</strong> solved · <strong>{stats.remaining}</strong> left
        </span>
        <button type="button" className="coding-practice-reset-link" onClick={handleReset}>
          Reset progress
        </button>
      </div>

      <div className="coding-practice-layout">
        <div className="coding-practice-workspace">{mainWorkspace}</div>
        <QuestionSidebar
          questions={CODING_PRACTICE_QUESTIONS}
          currentId={current?.id ?? null}
          completedIds={completedIds}
          onSelect={loadQuestion}
        />
      </div>
    </main>
  )
}
