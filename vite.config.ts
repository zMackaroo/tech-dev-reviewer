import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project site: https://zmackaroo.github.io/tech-dev-reviewer/
const base = process.env.VITE_BASE_PATH ?? '/tech-dev-reviewer/'

export default defineConfig({
  base,
  plugins: [react()],
})
