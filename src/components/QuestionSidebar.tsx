import { useMemo, useState } from 'react'
import type { CodingPracticeQuestion } from '../data/coding-practice'

interface QuestionSidebarProps {
  questions: CodingPracticeQuestion[]
  currentId: number | null
  completedIds: Set<number>
  onSelect: (question: CodingPracticeQuestion) => void
}

export function QuestionSidebar({
  questions,
  currentId,
  completedIds,
  onSelect,
}: QuestionSidebarProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    const set = new Set(questions.map((q) => q.category))
    return ['All', ...Array.from(set).sort()]
  }, [questions])

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()
    return questions.filter((q) => {
      const matchesCategory = category === 'All' || q.category === category
      const matchesSearch =
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.prompt.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query) ||
        String(q.id).includes(query)
      return matchesCategory && matchesSearch
    })
  }, [questions, search, category])

  return (
    <aside className="coding-practice-sidebar" aria-label="Question list">
      <div className="coding-practice-sidebar-header">
        <h2>Questions</h2>
        <span className="coding-practice-sidebar-count">
          {filtered.length} / {questions.length}
        </span>
      </div>

      <input
        type="search"
        className="search-input coding-practice-sidebar-search"
        placeholder="Search questions…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search questions"
      />

      <label className="coding-practice-sidebar-filter">
        <span className="visually-hidden">Filter by category</span>
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <ul className="coding-practice-question-list">
        {filtered.map((question) => {
          const isActive = question.id === currentId
          const isDone = completedIds.has(question.id)

          return (
            <li key={question.id}>
              <button
                type="button"
                className={`coding-practice-question-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                onClick={() => onSelect(question)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="coding-practice-question-item-id">#{question.id}</span>
                <span className="coding-practice-question-item-body">
                  <span className="coding-practice-question-item-title">{question.title}</span>
                  <span className="coding-practice-question-item-category">{question.category}</span>
                </span>
                {isDone && (
                  <span className="coding-practice-question-item-check" aria-label="Completed">
                    ✓
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
