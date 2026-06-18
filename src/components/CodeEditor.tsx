import type { KeyboardEvent } from 'react'
import type { CodingPracticeQuestion } from '../data/coding-practice'
import {
  formatInputData,
  getFunctionClose,
  getFunctionOpen,
} from '../utils/codingScaffold'

interface CodeEditorProps {
  question: CodingPracticeQuestion
  value: string
  onChange: (value: string) => void
  onRun?: () => void
  disabled?: boolean
}

export function CodeEditor({ question, value, onChange, onRun, disabled }: CodeEditorProps) {
  const inputData = formatInputData(question)
  const functionOpen = getFunctionOpen(question)
  const functionClose = getFunctionClose()

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      onRun?.()
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const start = event.currentTarget.selectionStart
      const end = event.currentTarget.selectionEnd
      const next = `${value.slice(0, start)}  ${value.slice(end)}`
      onChange(next)
      requestAnimationFrame(() => {
        event.currentTarget.selectionStart = start + 2
        event.currentTarget.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="code-editor">
      {inputData && (
        <div className="code-editor-inputs">
          <span className="code-editor-section-label">Sample inputs (first test)</span>
          <pre className="code-editor-inputs-body" aria-readonly="true">
            <code>{inputData}</code>
          </pre>
        </div>
      )}

      <div className="code-editor-workspace">
        <span className="code-editor-section-label">Your solution</span>
        <div className="code-editor-scaffold">
          <pre className="code-editor-scaffold-line" aria-hidden="true">
            <code>{functionOpen}</code>
          </pre>
          <textarea
            id="coding-practice-editor"
            className="code-editor-textarea code-editor-solution"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label={`Solution body for ${question.functionName}`}
            rows={8}
          />
          <pre className="code-editor-scaffold-line" aria-hidden="true">
            <code>{functionClose}</code>
          </pre>
        </div>
      </div>

      <p className="code-editor-hint">
        Write only the function body — use <strong>return</strong> for the result. Tab to indent · Ctrl+Enter or ⌘+Enter
        to run tests.
      </p>
    </div>
  )
}
