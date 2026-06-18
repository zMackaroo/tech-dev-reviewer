import type { CodingTestCase } from '../data/coding-practice/types'

export interface CodingTestResult {
  passed: boolean
  label?: string
  actual?: unknown
  expected?: unknown
  error?: string
}

export interface CodingRunOutput {
  results: CodingTestResult[]
  terminalLines: string[]
}

function valuesEqual(actual: unknown, expected: unknown): boolean {
  if (actual === expected) return true
  if (typeof actual === 'number' && typeof expected === 'number' && Number.isNaN(actual) && Number.isNaN(expected)) {
    return true
  }
  if (expected === undefined) return actual === undefined
  try {
    return JSON.stringify(actual) === JSON.stringify(expected)
  } catch {
    return false
  }
}

function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return JSON.stringify(value)
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function buildTestRunner(userCode: string, functionName: string): (...args: unknown[]) => { result: unknown; output: string[] } {
  const runner = new Function(`
    function __formatLog(value) {
      if (value === undefined) return 'undefined';
      if (value === null) return 'null';
      if (typeof value === 'object') {
        try { return JSON.stringify(value); } catch { return String(value); }
      }
      return String(value);
    }

    const __terminal = [];
    const __push = (...args) => {
      __terminal.push(args.map(__formatLog).join(' '));
    };

    console.log = __push;
    console.info = __push;
    console.warn = (...args) => __push('[warn]', ...args);
    console.error = (...args) => __push('[error]', ...args);

    ${userCode}

    return function __runTest(...args) {
      __terminal.length = 0;
      const result = ${functionName}(...args);
      return { result, output: __terminal.slice() };
    };
  `) as () => (...args: unknown[]) => { result: unknown; output: string[] }

  return runner()
}

function buildFailureMessage(
  actual: unknown,
  expected: unknown,
  output: string[],
): string {
  const base = `Expected ${formatValue(expected)}, got ${formatValue(actual)}`

  if (actual === undefined && output.length > 0) {
    return `${base}. Your function did not return a value — use return instead of only console.log. Terminal: ${output.join(' · ')}`
  }

  if (actual === undefined) {
    return `${base}. Your function did not return a value — make sure to return the result.`
  }

  return base
}

export async function runCodingTests(
  userCode: string,
  functionName: string,
  tests: CodingTestCase[],
): Promise<CodingRunOutput> {
  const terminalLines: string[] = []
  let runTest: (...args: unknown[]) => { result: unknown; output: string[] }

  try {
    runTest = buildTestRunner(userCode, functionName)
  } catch (error) {
    return {
      results: [{
        passed: false,
        error: `Could not parse your code: ${error instanceof Error ? error.message : error}`,
      }],
      terminalLines: [`Error: ${error instanceof Error ? error.message : error}`],
    }
  }

  if (typeof runTest !== 'function') {
    return {
      results: [{ passed: false, error: `Define a function named "${functionName}".` }],
      terminalLines: [`Error: function "${functionName}" was not found.`],
    }
  }

  const results: CodingTestResult[] = []

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i]
    const label = test.label ?? `Test ${i + 1}`

    terminalLines.push(`> ${label}`)

    try {
      let actual: unknown
      let output: string[] = []

      try {
        const run = runTest(...test.args)
        actual = run.result
        output = run.output
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        terminalLines.push(`  ✗ ${message}`)
        results.push({ passed: false, label, error: message })
        continue
      }

      if (actual != null && typeof (actual as Promise<unknown>).then === 'function') {
        actual = await (actual as Promise<unknown>)
      }

      output.forEach((line) => terminalLines.push(`  ${line}`))

      const passed = valuesEqual(actual, test.expected)
      results.push({
        passed,
        label,
        actual,
        expected: test.expected,
        error: passed ? undefined : buildFailureMessage(actual, test.expected, output),
      })

      terminalLines.push(passed ? '  ✓ passed' : '  ✗ failed')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      terminalLines.push(`  ✗ ${message}`)
      results.push({ passed: false, label, error: message })
    }
  }

  return { results, terminalLines }
}

export function allTestsPassed(results: CodingTestResult[]): boolean {
  return results.length > 0 && results.every((r) => r.passed)
}
