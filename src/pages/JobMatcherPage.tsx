import { useMemo, useState } from 'react'
import type { NavSection } from '../types'
import { matchJobDescription, SAMPLE_JOB_DESCRIPTIONS } from '../utils/jobMatcher'

interface JobMatcherPageProps {
  onSelectSection: (section: NavSection) => void
}

export function JobMatcherPage({ onSelectSection }: JobMatcherPageProps) {
  const [jobDescription, setJobDescription] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  const results = useMemo(() => {
    if (!analyzed || jobDescription.trim().length < 20) return []
    return matchJobDescription(jobDescription)
  }, [analyzed, jobDescription])

  const handleAnalyze = () => {
    if (jobDescription.trim().length >= 20) setAnalyzed(true)
  }

  const handleSample = (text: string) => {
    setJobDescription(text)
    setAnalyzed(true)
  }

  const totalQuestions = results.reduce((sum, r) => sum + r.questionCount, 0)

  return (
    <main className="page job-matcher-page">
      <div className="page-header">
        <h1>Find Your Reviewer</h1>
        <p className="page-subtitle">
          Paste a job description and we will recommend the best study sections based on required skills and technologies.
        </p>
      </div>

      <div className="matcher-input-section">
        <label htmlFor="job-description" className="matcher-label">
          Job Description
        </label>
        <textarea
          id="job-description"
          className="matcher-textarea"
          placeholder="Paste the full job description here — include required skills, technologies, and responsibilities…"
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value)
            setAnalyzed(false)
          }}
          rows={10}
        />
        <div className="matcher-actions">
          <button
            type="button"
            className="matcher-analyze-btn"
            onClick={handleAnalyze}
            disabled={jobDescription.trim().length < 20}
          >
            Analyze Job Description
          </button>
          <span className="matcher-hint">
            {jobDescription.trim().length < 20
              ? `${20 - jobDescription.trim().length} more characters needed`
              : 'Ready to analyze'}
          </span>
        </div>
      </div>

      <div className="matcher-samples">
        <span className="matcher-samples-label">Try a sample:</span>
        {SAMPLE_JOB_DESCRIPTIONS.map((sample) => (
          <button
            key={sample.title}
            type="button"
            className="matcher-sample-btn"
            onClick={() => handleSample(sample.text)}
          >
            {sample.title}
          </button>
        ))}
      </div>

      {analyzed && results.length === 0 && (
        <p className="no-results matcher-empty">
          No strong matches found. Try adding more technical keywords (e.g. React, TypeScript, API, testing).
        </p>
      )}

      {results.length > 0 && (
        <div className="matcher-results">
          <div className="matcher-summary">
            <h2>Your Study Plan</h2>
            <p>
              Based on your job description, focus on <strong>{results.length} sections</strong> covering{' '}
              <strong>{totalQuestions.toLocaleString()} questions</strong>.
              {results[0] && (
                <> Start with <strong>{results[0].label}</strong> — your strongest match.</>
              )}
            </p>
          </div>

          <div className="matcher-cards">
            {results.map((result, index) => (
              <article key={result.section} className={`matcher-card priority-${result.priority}`}>
                <div className="matcher-card-header">
                  <span className="matcher-rank">#{index + 1}</span>
                  <div className="matcher-card-title">
                    <h3>{result.label}</h3>
                    <span className={`priority-badge ${result.priority}`}>{result.priority}</span>
                  </div>
                  <div className="matcher-score">
                    <span className="score-value">{result.percentage}%</span>
                    <span className="score-label">match</span>
                  </div>
                </div>

                <div className="matcher-progress">
                  <div className="matcher-progress-bar" style={{ width: `${result.percentage}%` }} />
                </div>

                <p className="matcher-description">{result.description}</p>
                <p className="matcher-reason">{result.reason}</p>

                {result.matchedKeywords.length > 0 && (
                  <div className="matcher-tags">
                    {result.matchedKeywords.slice(0, 6).map((kw) => (
                      <span key={kw} className="matcher-tag">{kw}</span>
                    ))}
                  </div>
                )}

                <div className="matcher-card-footer">
                  <span className="question-count">{result.questionCount} questions</span>
                  <button
                    type="button"
                    className="matcher-study-btn"
                    onClick={() => onSelectSection(result.section)}
                  >
                    Start Studying →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
