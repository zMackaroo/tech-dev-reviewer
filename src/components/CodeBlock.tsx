import { useMemo } from 'react'
import { highlightCode } from '../utils/highlight'

interface CodeBlockProps {
  code: string
  title?: string
  language?: string
}

export function CodeBlock({ code, title = 'Example', language }: CodeBlockProps) {
  const highlighted = useMemo(() => highlightCode(code, language), [code, language])

  if (!highlighted) return null

  return (
    <div className="code-block">
      <div className="code-block-label">{title}</div>
      <pre>
        <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  )
}
