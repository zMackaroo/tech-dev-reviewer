import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../utils/theme'
import { getInitialTheme, getStoredTheme, getSystemTheme, setTheme, toggleTheme } from '../utils/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (getStoredTheme() === null) {
        const system = getSystemTheme()
        setThemeState(system)
        setTheme(system)
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setThemeState((current) => toggleTheme(current))
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}
