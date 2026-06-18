const STORAGE_KEY = 'coding-practice-completed'

export function getCompletedQuestionIds(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as number[]
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

export function markQuestionCompleted(id: number): void {
  const completed = getCompletedQuestionIds()
  completed.add(id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
}

export function resetCodingPracticeProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getSessionCorrectCount(): number {
  try {
    const raw = sessionStorage.getItem('coding-practice-session-count')
    return raw ? Number(raw) : 0
  } catch {
    return 0
  }
}

export function incrementSessionCorrectCount(): number {
  const next = getSessionCorrectCount() + 1
  sessionStorage.setItem('coding-practice-session-count', String(next))
  return next
}

export function resetSessionCorrectCount(): void {
  sessionStorage.removeItem('coding-practice-session-count')
}
