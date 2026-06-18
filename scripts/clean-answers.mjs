import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const DATA_DIR = 'src/data'

function removeTrailingSentence(text, prefix) {
  const idx = text.lastIndexOf(prefix)
  if (idx === -1) return text

  let inQuote = false
  let quoteChar = ''
  let end = text.length

  for (let i = idx; i < text.length; i++) {
    const c = text[i]
    const prev = text[i - 1]

    if ((c === '"' || c === "'") && prev !== '\\') {
      if (!inQuote) {
        inQuote = true
        quoteChar = c
      } else if (c === quoteChar) {
        inQuote = false
      }
    }

    if (!inQuote && c === '.' && i === text.length - 1) {
      end = i + 1
      break
    }

    if (!inQuote && c === '.' && text[i + 1] === ' ') {
      end = i + 1
      break
    }
  }

  return (text.slice(0, idx) + text.slice(end)).replace(/\s+/g, ' ').trim()
}

function cleanAnswer(text) {
  let answer = text
  answer = removeTrailingSentence(answer, ' In a real app')
  answer = removeTrailingSentence(answer, ' For example,')
  answer = removeTrailingSentence(answer, ' This matters')
  return answer.replace(/\s{2,}/g, ' ').trim()
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      if (entry === 'roles') continue
      walk(path, files)
    } else if (entry.endsWith('.ts') && entry !== 'index.ts' && entry !== 'sectionRegistry.ts') {
      files.push(path)
    }
  }
  return files
}

let total = 0

for (const file of walk(DATA_DIR)) {
  const original = readFileSync(file, 'utf8')
  let changed = false

  const updated = original.replace(/answer:\s*'((?:\\'|[^'])*)'/g, (match, answer) => {
    const cleaned = cleanAnswer(answer.replace(/\\'/g, "'"))
    const originalAnswer = answer.replace(/\\'/g, "'")
    if (cleaned !== originalAnswer) {
      changed = true
      total++
      const escaped = cleaned.replace(/'/g, "\\'")
      return `answer: '${escaped}'`
    }
    return match
  })

  if (changed) {
    writeFileSync(file, updated)
    console.log('Updated', file)
  }
}

console.log(`Cleaned ${total} answers.`)
