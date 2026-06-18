import { useMemo, useState } from 'react'
import { InteractiveMode } from '../components/InteractiveMode'
import { QuestionCard } from '../components/QuestionCard'
import type { InterviewQuestion } from '../types'

interface TopicPageProps {
  title: string
  subtitle: string
  questions: InterviewQuestion[]
  categories: string[]
}

export function TopicPage({ title, subtitle, questions, categories }: TopicPageProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [openId, setOpenId] = useState<number | null>(null)
  const [interactiveOpen, setInteractiveOpen] = useState(false)
  const [interactiveStartIndex, setInteractiveStartIndex] = useState(0)

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()
    return questions.filter((q) => {
      const matchesCategory = category === 'All' || q.category === category
      const matchesSearch =
        !query ||
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [search, category, questions])

  const useCategorySelect = categories.length > 6

  const openInteractiveMode = () => {
    const startIndex = openId != null ? filtered.findIndex((q) => q.id === openId) : 0
    setInteractiveStartIndex(Math.max(0, startIndex))
    setInteractiveOpen(true)
  }

  return (
    <main className="page topic-page">
      <header className="page-header page-header-compact">
        <div className="page-header-row">
          <div>
            <h1>{title}</h1>
            <p className="page-subtitle">{subtitle}</p>
          </div>
          <button
            type="button"
            className="interactive-mode-btn"
            onClick={openInteractiveMode}
            disabled={filtered.length === 0}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2" y="1.5" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.25" />
              <path d="M5 6H11M5 9H9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            Interactive mode
          </button>
        </div>
      </header>

      <div className="study-toolbar">
        <div className="study-toolbar-row">
          <input
            type="search"
            className="search-input"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setOpenId(null)
            }}
            aria-label="Search questions"
          />
          <span className="results-meta" aria-live="polite">
            {filtered.length} / {questions.length}
          </span>
        </div>

        {useCategorySelect ? (
          <label className="category-select-wrap">
            <span className="visually-hidden">Filter by category</span>
            <select
              className="category-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setOpenId(null)
              }}
            >
              <option value="All">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        ) : (
          <div className="category-pills" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              role="tab"
              className={category === 'All' ? 'active' : ''}
              onClick={() => { setCategory('All'); setOpenId(null) }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                className={category === cat ? 'active' : ''}
                onClick={() => { setCategory(cat); setOpenId(null) }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="question-list">
        {filtered.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            open={openId === q.id}
            onToggle={() => setOpenId(openId === q.id ? null : q.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="no-results">No questions match your search.</p>
        )}
      </div>

      {interactiveOpen && (
        <InteractiveMode
          questions={filtered}
          title={title}
          initialIndex={interactiveStartIndex}
          onClose={() => setInteractiveOpen(false)}
        />
      )}
    </main>
  )
}
