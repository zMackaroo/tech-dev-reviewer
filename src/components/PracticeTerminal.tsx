interface PracticeTerminalProps {
  lines: string[]
  emptyMessage?: string
}

export function PracticeTerminal({
  lines,
  emptyMessage = 'Run tests to see console output here.',
}: PracticeTerminalProps) {
  return (
    <div className="practice-terminal">
      <div className="practice-terminal-header">
        <span className="practice-terminal-title">Terminal</span>
        <span className="practice-terminal-subtitle">console.log · console.warn · console.error</span>
      </div>
      <pre className="practice-terminal-body" aria-live="polite">
        {lines.length === 0 ? (
          <span className="practice-terminal-empty">{emptyMessage}</span>
        ) : (
          lines.map((line, index) => (
            <span key={index} className="practice-terminal-line">
              {line}
              {'\n'}
            </span>
          ))
        )}
      </pre>
    </div>
  )
}
