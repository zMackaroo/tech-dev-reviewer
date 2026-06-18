import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InteractiveMode } from '../components/InteractiveMode'
import { QuestionCard } from '../components/QuestionCard'
import { SENIOR_NEXTJS_FE_ROLE } from '../data/roles/senior-nextjs-fe'
import { sectionToPath } from '../routes'
import { getPhaseLabel, getRoleQuestions, getRoleStats, groupRoleQuestionsByCategory } from '../utils/roleQuestions'

type Tab = 'roadmap' | 'practice'

const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2 }

export function RoleReviewerPage() {
  const navigate = useNavigate()
  const role = SENIOR_NEXTJS_FE_ROLE
  const stats = useMemo(() => getRoleStats(role), [role])
  const questions = useMemo(() => getRoleQuestions(role), [role])

  const [tab, setTab] = useState<Tab>('roadmap')
  const [search, setSearch] = useState('')
  const [phaseFilter, setPhaseFilter] = useState<number | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [interactiveOpen, setInteractiveOpen] = useState(false)
  const [interactiveStartIndex, setInteractiveStartIndex] = useState(0)

  const filteredQuestions = useMemo(() => {
    const query = search.toLowerCase().trim()
    return questions.filter((q) => {
      const matchesPhase = phaseFilter === 'all' || q.phase === phaseFilter
      const matchesSearch =
        !query ||
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.sectionLabel.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query)
      return matchesPhase && matchesSearch
    })
  }, [questions, search, phaseFilter])

  const questionGroups = useMemo(
    () => groupRoleQuestionsByCategory(filteredQuestions, role),
    [filteredQuestions, role],
  )

  const phases = stats.phases

  const openInteractiveMode = () => {
    const startIndex =
      openId != null
        ? filteredQuestions.findIndex((q) => `${q.section}-${q.id}` === openId)
        : 0
    setInteractiveStartIndex(Math.max(0, startIndex))
    setInteractiveOpen(true)
  }

  return (
    <main className="page role-reviewer-page">
      <div className="role-hero">
        <span className="role-badge">Custom Study Plan</span>
        <h1>{role.title}</h1>
        <p className="role-subtitle">{role.subtitle}</p>
        <p className="role-summary">{role.summary}</p>
        <div className="role-stats">
          <div className="role-stat">
            <span className="role-stat-value">{stats.totalQuestions}</span>
            <span className="role-stat-label">Practice Questions</span>
          </div>
          <div className="role-stat">
            <span className="role-stat-value">{stats.sectionCount}</span>
            <span className="role-stat-label">Reviewer Sections</span>
          </div>
          <div className="role-stat">
            <span className="role-stat-value">{phases.length}</span>
            <span className="role-stat-label">Study Phases</span>
          </div>
        </div>
      </div>

      <div className="role-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          className={tab === 'roadmap' ? 'active' : ''}
          onClick={() => setTab('roadmap')}
        >
          Study Roadmap
        </button>
        <button
          type="button"
          role="tab"
          className={tab === 'practice' ? 'active' : ''}
          onClick={() => setTab('practice')}
        >
          Practice Questions ({stats.totalQuestions})
        </button>
      </div>

      {tab === 'roadmap' && (
        <div className="role-roadmap">
          <section className="role-requirements">
            <h2>What This Role Requires</h2>
            <div className="requirements-grid">
              <div>
                <h3>Key Responsibilities</h3>
                <ul>
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Required Skills</h3>
                <ul>
                  {role.requiredSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {phases.map((phase) => (
            <section key={phase} className="role-phase">
              <h2>{getPhaseLabel(role, phase)}</h2>
              <div className="role-phase-cards">
                {stats.bySection
                  .filter((s) => s.phase === phase)
                  .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
                  .map((plan) => (
                    <article key={plan.section} className={`role-section-card priority-${plan.priority}`}>
                      <div className="role-section-card-header">
                        <h3>{plan.label}</h3>
                        <span className={`priority-badge ${plan.priority}`}>{plan.priority}</span>
                      </div>
                      <p>{plan.reason}</p>
                      {plan.focusCategories && (
                        <div className="role-focus-tags">
                          {plan.focusCategories.map((cat) => (
                            <span key={cat} className="matcher-tag">{cat}</span>
                          ))}
                        </div>
                      )}
                      <div className="role-section-card-footer">
                        <span>{plan.questionCount} curated questions</span>
                        <button
                          type="button"
                          className="matcher-study-btn"
                          onClick={() => navigate(sectionToPath(plan.section))}
                        >
                          Full Section →
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}

          {role.supplementary.length > 0 && (
            <section className="role-supplementary">
              <h2>Additional Topics to Study</h2>
              {role.supplementary.map((topic) => (
                <article key={topic.title} className="supplementary-card">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <ul>
                    {topic.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </section>
          )}
        </div>
      )}

      {tab === 'practice' && (
        <div className="role-practice">
          <div className="study-toolbar">
            <div className="study-toolbar-row">
              <input
                type="search"
                className="search-input"
                placeholder="Search curated questions…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setOpenId(null)
                }}
              />
              <button
                type="button"
                className="interactive-mode-btn"
                onClick={openInteractiveMode}
                disabled={filteredQuestions.length === 0}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="1.5" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M5 6H11M5 9H9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
                Interactive mode
              </button>
              <span className="results-meta" aria-live="polite">
                {filteredQuestions.length} / {questions.length}
              </span>
            </div>
            <div className="category-pills">
              <button
                type="button"
                className={phaseFilter === 'all' ? 'active' : ''}
                onClick={() => { setPhaseFilter('all'); setOpenId(null) }}
              >
                All Phases
              </button>
              {phases.map((phase) => (
                <button
                  key={phase}
                  type="button"
                  className={phaseFilter === phase ? 'active' : ''}
                  onClick={() => { setPhaseFilter(phase); setOpenId(null) }}
                >
                  {getPhaseLabel(role, phase).replace(/^Phase \d+ — /, '')}
                </button>
              ))}
            </div>
          </div>

          <div className="question-list role-question-groups">
            {questionGroups.map((group) => (
              <section
                key={`${group.section}-${group.category}`}
                className="question-category-group"
              >
                <header className="question-category-header">
                  <div className="question-category-title">
                    <span className="role-question-section">{group.sectionLabel}</span>
                    <h3>{group.category}</h3>
                  </div>
                  <div className="question-category-meta">
                    <span className={`priority-badge ${group.priority}`}>{group.priority}</span>
                    <span className="role-question-phase">Phase {group.phase}</span>
                    <span className="question-category-count">
                      {group.questions.length} question{group.questions.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </header>
                <div className="question-category-list">
                  {group.questions.map((q) => {
                    const key = `${q.section}-${q.id}`
                    return (
                      <QuestionCard
                        key={key}
                        question={q}
                        open={openId === key}
                        onToggle={() => setOpenId(openId === key ? null : key)}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
            {questionGroups.length === 0 && (
              <p className="no-results">No questions match your search.</p>
            )}
          </div>

          {interactiveOpen && (
            <InteractiveMode
              questions={filteredQuestions}
              title={role.title}
              initialIndex={interactiveStartIndex}
              onClose={() => setInteractiveOpen(false)}
            />
          )}
        </div>
      )}
    </main>
  )
}
