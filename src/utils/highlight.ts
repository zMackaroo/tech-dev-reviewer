import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('python', python)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)

const AUTO_LANGUAGES = [
  'javascript',
  'typescript',
  'css',
  'xml',
  'bash',
  'json',
  'sql',
  'python',
  'yaml',
  'markdown',
] as const

export function highlightCode(code: string, language?: string): string {
  const trimmed = code.trim()
  if (!trimmed) return ''

  if (language) {
    return hljs.highlight(trimmed, { language, ignoreIllegals: true }).value
  }

  return hljs.highlightAuto(trimmed, [...AUTO_LANGUAGES]).value
}
