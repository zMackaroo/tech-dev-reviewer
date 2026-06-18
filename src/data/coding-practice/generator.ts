import type { CodingPracticeQuestion, CodingTestCase } from './types'
import { buildRealWorldQuestions } from './real-world'

let nextId = 1

function q(
  category: string,
  title: string,
  prompt: string,
  functionName: string,
  params: string,
  tests: CodingTestCase[],
): CodingPracticeQuestion {
  return { id: nextId++, category, title, prompt, functionName, params, tests }
}

// ── Arrays (100) ──────────────────────────────────────────────

function arrayQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  out.push(
    q('Arrays', 'Sum of array', 'Return the sum of all numbers in the array.', 'sum', 'arr', [
      { args: [[1, 2, 3]], expected: 6 },
      { args: [[10, -2, 5]], expected: 13 },
      { args: [[]], expected: 0 },
    ]),
    q('Arrays', 'Product of array', 'Return the product of all numbers in the array.', 'product', 'arr', [
      { args: [[2, 3, 4]], expected: 24 },
      { args: [[1, 5, 2]], expected: 10 },
      { args: [[]], expected: 1 },
    ]),
    q('Arrays', 'Average', 'Return the arithmetic mean of numbers in arr. Return 0 for empty array.', 'average', 'arr', [
      { args: [[2, 4, 6]], expected: 4 },
      { args: [[1, 2]], expected: 1.5 },
      { args: [[]], expected: 0 },
    ]),
    q('Arrays', 'Maximum value', 'Return the largest number in arr.', 'maxValue', 'arr', [
      { args: [[3, 9, 1]], expected: 9 },
      { args: [[-5, -1]], expected: -1 },
    ]),
    q('Arrays', 'Minimum value', 'Return the smallest number in arr.', 'minValue', 'arr', [
      { args: [[3, 9, 1]], expected: 1 },
      { args: [[-5, -1]], expected: -5 },
    ]),
    q('Arrays', 'Count evens', 'Return how many even numbers are in arr.', 'countEvens', 'arr', [
      { args: [[1, 2, 3, 4]], expected: 2 },
      { args: [[2, 4, 6]], expected: 3 },
    ]),
    q('Arrays', 'Count odds', 'Return how many odd numbers are in arr.', 'countOdds', 'arr', [
      { args: [[1, 2, 3]], expected: 2 },
      { args: [[2, 4]], expected: 0 },
    ]),
    q('Arrays', 'Double values', 'Return a new array with each number doubled.', 'doubleValues', 'arr', [
      { args: [[1, 2, 3]], expected: [2, 4, 6] },
      { args: [[0, -2]], expected: [0, -4] },
    ]),
    q('Arrays', 'Absolute values', 'Return a new array with Math.abs applied to each item.', 'absoluteValues', 'arr', [
      { args: [[-1, 2, -3]], expected: [1, 2, 3] },
    ]),
    q('Arrays', 'Reverse array', 'Return a new array with elements in reverse order (do not mutate input).', 'reverseArray', 'arr', [
      { args: [[1, 2, 3]], expected: [3, 2, 1] },
      { args: [['a', 'b']], expected: ['b', 'a'] },
    ]),
    q('Arrays', 'Unique values', 'Return an array of unique values preserving first-seen order.', 'unique', 'arr', [
      { args: [[1, 2, 2, 3]], expected: [1, 2, 3] },
      { args: [['a', 'a', 'b']], expected: ['a', 'b'] },
    ]),
    q('Arrays', 'Flatten one level', 'Flatten nested arrays one level deep.', 'flattenOnce', 'arr', [
      { args: [[[1, 2], [3]]], expected: [1, 2, 3] },
      { args: [[1, [2, 3]]], expected: [1, 2, 3] },
    ]),
    q('Arrays', 'First element', 'Return the first element or undefined if empty.', 'first', 'arr', [
      { args: [[1, 2]], expected: 1 },
      { args: [[]], expected: undefined },
    ]),
    q('Arrays', 'Last element', 'Return the last element or undefined if empty.', 'last', 'arr', [
      { args: [[1, 2, 3]], expected: 3 },
      { args: [[]], expected: undefined },
    ]),
    q('Arrays', 'Is empty', 'Return true if arr has length 0.', 'isEmpty', 'arr', [
      { args: [[]], expected: true },
      { args: [[1]], expected: false },
    ]),
    q('Arrays', 'Includes value', 'Return true if arr contains value (strict equality).', 'includesValue', 'arr, value', [
      { args: [[1, 2, 3], 2], expected: true },
      { args: [[1, 2, 3], 5], expected: false },
    ]),
    q('Arrays', 'Filter positives', 'Return numbers greater than 0.', 'filterPositives', 'arr', [
      { args: [[-1, 0, 2, 3]], expected: [2, 3] },
    ]),
    q('Arrays', 'Filter negatives', 'Return numbers less than 0.', 'filterNegatives', 'arr', [
      { args: [[-1, 0, 2]], expected: [-1] },
    ]),
    q('Arrays', 'Square values', 'Return each number squared.', 'squareValues', 'arr', [
      { args: [[2, 3]], expected: [4, 9] },
      { args: [[-2]], expected: [4] },
    ]),
    q('Arrays', 'Increment all', 'Add 1 to every number.', 'incrementAll', 'arr', [
      { args: [[1, 2]], expected: [2, 3] },
    ]),
  )

  for (let n = 2; n <= 10; n++) {
    out.push(
      q('Arrays', `Take first ${n}`, `Return the first ${n} elements of arr.`, 'take', 'arr, n', [
        { args: [[1, 2, 3, 4, 5], n], expected: [1, 2, 3, 4, 5].slice(0, n) },
        { args: [[10, 20], n], expected: n >= 2 ? [10, 20] : [10] },
      ]),
      q('Arrays', `Drop first ${n}`, `Return arr without the first ${n} elements.`, 'drop', 'arr, n', [
        { args: [[1, 2, 3, 4], n], expected: [1, 2, 3, 4].slice(n) },
      ]),
    )
  }

  for (let size = 2; size <= 8; size++) {
    out.push(
      q('Arrays', `Chunk by ${size}`, `Split arr into sub-arrays of length ${size} (last chunk may be shorter).`, 'chunk', 'arr, size', [
        { args: [[1, 2, 3, 4, 5], size], expected: chunkArr([1, 2, 3, 4, 5], size) },
      ]),
    )
  }

  for (let i = 0; i < 15; i++) {
    const nums = [i, i + 1, i + 2, i + 3]
    out.push(
      q('Arrays', `Intersection ${i + 1}`, 'Return values that appear in both arr and other.', 'intersection', 'arr, other', [
        { args: [nums, [i + 1, i + 5]], expected: nums.filter((x) => [i + 1, i + 5].includes(x)) },
      ]),
    )
  }

  while (out.length < 100) {
    const i = out.length
    out.push(
      q('Arrays', `Union ${i}`, 'Return unique values from arr followed by unique values from other not in arr.', 'union', 'arr, other', [
        { args: [[1, 2], [2, 3]], expected: [1, 2, 3] },
        { args: [[i], [i + 1]], expected: [i, i + 1] },
      ]),
    )
  }

  return out.slice(0, 100)
}

function chunkArr(arr: number[], size: number): number[][] {
  const result: number[][] = []
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
  return result
}

// ── Strings (100) ─────────────────────────────────────────────

function stringQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  const basics: Omit<CodingPracticeQuestion, 'id'>[] = [
    {
      category: 'Strings',
      title: 'Reverse string',
      prompt: 'Return str reversed.',
      functionName: 'reverseString',
      params: 'str',
      tests: [
        { args: ['hello'], expected: 'olleh' },
        { args: [''], expected: '' },
      ],
    },
    {
      category: 'Strings',
      title: 'To uppercase',
      prompt: 'Return str in uppercase.',
      functionName: 'toUpper',
      params: 'str',
      tests: [{ args: ['abc'], expected: 'ABC' }],
    },
    {
      category: 'Strings',
      title: 'To lowercase',
      prompt: 'Return str in lowercase.',
      functionName: 'toLower',
      params: 'str',
      tests: [{ args: ['ABC'], expected: 'abc' }],
    },
    {
      category: 'Strings',
      title: 'Capitalize first',
      prompt: 'Uppercase first character, lowercase the rest. Empty string returns empty.',
      functionName: 'capitalize',
      params: 'str',
      tests: [
        { args: ['hello'], expected: 'Hello' },
        { args: [''], expected: '' },
      ],
    },
    {
      category: 'Strings',
      title: 'Word count',
      prompt: 'Count words separated by spaces (trim whitespace).',
      functionName: 'wordCount',
      params: 'str',
      tests: [
        { args: ['one two three'], expected: 3 },
        { args: ['  hi  '], expected: 1 },
      ],
    },
    {
      category: 'Strings',
      title: 'Char count',
      prompt: 'Return the length of str.',
      functionName: 'charCount',
      params: 'str',
      tests: [{ args: ['abcd'], expected: 4 }],
    },
    {
      category: 'Strings',
      title: 'Trim spaces',
      prompt: 'Remove leading and trailing whitespace.',
      functionName: 'trimSpaces',
      params: 'str',
      tests: [{ args: ['  hi  '], expected: 'hi' }],
    },
    {
      category: 'Strings',
      title: 'Repeat string',
      prompt: 'Return str repeated n times.',
      functionName: 'repeatString',
      params: 'str, n',
      tests: [
        { args: ['ab', 3], expected: 'ababab' },
        { args: ['x', 0], expected: '' },
      ],
    },
    {
      category: 'Strings',
      title: 'Is palindrome',
      prompt: 'Return true if str reads the same forwards and backwards (case-sensitive).',
      functionName: 'isPalindrome',
      params: 'str',
      tests: [
        { args: ['racecar'], expected: true },
        { args: ['hello'], expected: false },
      ],
    },
    {
      category: 'Strings',
      title: 'Remove spaces',
      prompt: 'Return str with all spaces removed.',
      functionName: 'removeSpaces',
      params: 'str',
      tests: [{ args: ['a b c'], expected: 'abc' }],
    },
    {
      category: 'Strings',
      title: 'Count vowels',
      prompt: 'Count a,e,i,o,u (case-insensitive) in str.',
      functionName: 'countVowels',
      params: 'str',
      tests: [
        { args: ['Hello'], expected: 2 },
        { args: ['xyz'], expected: 0 },
      ],
    },
    {
      category: 'Strings',
      title: 'Starts with prefix',
      prompt: 'Return true if str starts with prefix.',
      functionName: 'startsWithPrefix',
      params: 'str, prefix',
      tests: [
        { args: ['hello', 'he'], expected: true },
        { args: ['hello', 'lo'], expected: false },
      ],
    },
    {
      category: 'Strings',
      title: 'Ends with suffix',
      prompt: 'Return true if str ends with suffix.',
      functionName: 'endsWithSuffix',
      params: 'str, suffix',
      tests: [
        { args: ['hello', 'lo'], expected: true },
        { args: ['hello', 'he'], expected: false },
      ],
    },
    {
      category: 'Strings',
      title: 'Replace all',
      prompt: 'Replace every occurrence of search with replacement in str.',
      functionName: 'replaceAll',
      params: 'str, search, replacement',
      tests: [{ args: ['a-b-a', 'a', 'x'], expected: 'x-b-x' }],
    },
    {
      category: 'Strings',
      title: 'Truncate',
      prompt: 'If str length exceeds max, return str.slice(0, max) + "...". Otherwise return str.',
      functionName: 'truncate',
      params: 'str, max',
      tests: [
        { args: ['hello world', 5], expected: 'hello...' },
        { args: ['hi', 10], expected: 'hi' },
      ],
    },
  ]

  for (const item of basics) {
    out.push(q(item.category, item.title, item.prompt, item.functionName, item.params, item.tests))
  }

  for (let i = 0; i < 85; i++) {
    const word = `test${i}`
    out.push(
      q('Strings', `Camel case ${i + 1}`, 'Convert kebab-case (words separated by -) to camelCase. First word lowercase.', 'kebabToCamel', 'str', [
        { args: [`foo-bar-${i}`], expected: `fooBar${i}` },
      ]),
      q('Strings', `Kebab case ${i + 1}`, 'Convert camelCase to kebab-case (lowercase with -).', 'camelToKebab', 'str', [
        { args: [word], expected: word.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') },
      ]),
    )
  }

  return out.slice(0, 100)
}

// ── Objects (80) ──────────────────────────────────────────────

function objectQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  out.push(
    q('Objects', 'Object keys', 'Return array of own enumerable keys of obj.', 'getKeys', 'obj', [
      { args: [{ a: 1, b: 2 }], expected: ['a', 'b'] },
    ]),
    q('Objects', 'Object values', 'Return array of values of obj.', 'getValues', 'obj', [
      { args: [{ a: 1, b: 2 }], expected: [1, 2] },
    ]),
    q('Objects', 'Object entries', 'Return array of [key, value] pairs.', 'getEntries', 'obj', [
      { args: [{ x: 10 }], expected: [['x', 10]] },
    ]),
    q('Objects', 'From entries', 'Build object from array of [key, value] pairs.', 'fromEntries', 'entries', [
      { args: [[['a', 1], ['b', 2]]], expected: { a: 1, b: 2 } },
    ]),
    q('Objects', 'Pick keys', 'Return new object with only keys listed in keys array.', 'pick', 'obj, keys', [
      { args: [{ a: 1, b: 2, c: 3 }, ['a', 'c']], expected: { a: 1, c: 3 } },
    ]),
    q('Objects', 'Omit keys', 'Return new object without keys in omitKeys.', 'omit', 'obj, omitKeys', [
      { args: [{ a: 1, b: 2 }, ['b']], expected: { a: 1 } },
    ]),
    q('Objects', 'Merge objects', 'Shallow merge a then b (b overrides a).', 'merge', 'a, b', [
      { args: [{ x: 1 }, { y: 2 }], expected: { x: 1, y: 2 } },
      { args: [{ x: 1 }, { x: 2 }], expected: { x: 2 } },
    ]),
    q('Objects', 'Is empty object', 'Return true if obj has no own keys.', 'isEmptyObject', 'obj', [
      { args: [{}], expected: true },
      { args: [{ a: 1 }], expected: false },
    ]),
    q('Objects', 'Invert object', 'Swap keys and values (values become keys as strings).', 'invert', 'obj', [
      { args: [{ a: '1', b: '2' }], expected: { '1': 'a', '2': 'b' } },
    ]),
    q('Objects', 'Double object values', 'Return new object with each numeric value doubled.', 'doubleObjectValues', 'obj', [
      { args: [{ a: 1, b: 2, c: 'x' }], expected: { a: 2, b: 4, c: 'x' } },
    ]),
  )

  for (let i = 0; i < 70; i++) {
    out.push(
      q('Objects', `Get nested ${i + 1}`, 'Safely read path (dot-separated string) from obj. Return undefined if missing.', 'getPath', 'obj, path', [
        { args: [{ user: { name: `n${i}` } }, 'user.name'], expected: `n${i}` },
        { args: [{ a: 1 }, 'b.c'], expected: undefined },
      ]),
    )
  }

  return out.slice(0, 80)
}

// ── Math & numbers (70) ───────────────────────────────────────

function mathQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  for (let n = 2; n <= 20; n++) {
    out.push(
      q('Math', `Factorial ${n}`, 'Return n! (factorial). 0! is 1.', 'factorial', 'n', [
        { args: [n], expected: factorial(n) },
        { args: [0], expected: 1 },
      ]),
    )
  }

  for (let n = 1; n <= 15; n++) {
    out.push(
      q('Math', `Fibonacci ${n}`, 'Return the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1).', 'fibonacci', 'n', [
        { args: [n], expected: fib(n) },
      ]),
      q('Math', `Is prime ${n}`, 'Return true if n is a prime number (n >= 2).', 'isPrime', 'n', [
        { args: [n + 2], expected: isPrime(n + 2) },
      ]),
    )
  }

  for (let i = 0; i < 20; i++) {
    out.push(
      q('Math', `Clamp ${i}`, 'Return num clamped between min and max inclusive.', 'clamp', 'num, min, max', [
        { args: [i, 5, 10], expected: Math.min(10, Math.max(5, i)) },
      ]),
      q('Math', `GCD ${i}`, 'Return greatest common divisor of a and b.', 'gcd', 'a, b', [
        { args: [i + 12, i + 8], expected: gcd(i + 12, i + 8) },
      ]),
    )
  }

  return out.slice(0, 70)
}

function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

function fib(n: number): number {
  if (n <= 1) return n
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false
  return true
}

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a
}

// ── Recursion (50) ────────────────────────────────────────────

function recursionQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  for (let i = 1; i <= 25; i++) {
    out.push(
      q('Recursion', `Sum 1 to n (${i})`, 'Return sum of integers from 1 to n.', 'sumToN', 'n', [
        { args: [i], expected: (i * (i + 1)) / 2 },
      ]),
      q('Recursion', `Power ${i}`, 'Return base raised to exp (exp >= 0).', 'power', 'base, exp', [
        { args: [2, i % 5], expected: Math.pow(2, i % 5) },
      ]),
    )
  }

  return out.slice(0, 50)
}

// ── Async (40) ────────────────────────────────────────────────

function asyncQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  for (let i = 0; i < 40; i++) {
    out.push(
      q('Async', `Promise double ${i + 1}`, 'Return a Promise that resolves to num * 2.', 'promiseDouble', 'num', [
        { args: [i + 1], expected: (i + 1) * 2 },
      ]),
    )
  }

  return out
}

// ── Algorithms (60) ───────────────────────────────────────────

function algorithmQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  for (let i = 0; i < 30; i++) {
    const sorted = [i, i + 1, i + 3, i + 7].sort((a, b) => a - b)
    const target = sorted[2]
    out.push(
      q('Algorithms', `Linear search ${i + 1}`, 'Return index of target in arr, or -1 if not found.', 'linearSearch', 'arr, target', [
        { args: [sorted, target], expected: sorted.indexOf(target) },
        { args: [sorted, 999], expected: -1 },
      ]),
      q('Algorithms', `Two sum ${i + 1}`, 'Return indices [i,j] where arr[i]+arr[j]=target (first pair).', 'twoSum', 'arr, target', [
        { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { args: [[3, 2, 4], 6], expected: [1, 2] },
      ]),
    )
  }

  return out.slice(0, 60)
}

// ── Nested data (50) ──────────────────────────────────────────

function nestedQuestions(): CodingPracticeQuestion[] {
  const out: CodingPracticeQuestion[] = []

  for (let i = 0; i < 50; i++) {
    out.push(
      q('Nested Data', `Deep get ${i + 1}`, 'Return value at path array of keys in nested object.', 'deepGet', 'obj, path', [
        { args: [{ a: { b: { c: i } } }, ['a', 'b', 'c']], expected: i },
        { args: [{ x: 1 }, ['y']], expected: undefined },
      ]),
    )
  }

  return out
}

function realWorldQuestions(): CodingPracticeQuestion[] {
  return buildRealWorldQuestions(0).map((question) => ({
    ...question,
    id: nextId++,
  }))
}

export function buildCodingPracticeQuestions(): CodingPracticeQuestion[] {
  nextId = 1
  const all = [
    ...arrayQuestions(),
    ...stringQuestions(),
    ...objectQuestions(),
    ...mathQuestions(),
    ...recursionQuestions(),
    ...asyncQuestions(),
    ...algorithmQuestions(),
    ...nestedQuestions(),
    ...realWorldQuestions(),
  ]

  if (all.length < 500) {
    const extra: CodingPracticeQuestion[] = []
    while (all.length + extra.length < 500) {
      const i = all.length + extra.length
      extra.push(
        q('Mixed', `Add ${i}`, 'Return a + b.', 'add', 'a, b', [
          { args: [i, i + 1], expected: i + i + 1 },
        ]),
      )
    }
    all.push(...extra)
  }

  const questions = all

  if (questions.length < 500) {
    throw new Error(`Expected at least 500 coding practice questions, got ${questions.length}`)
  }

  return questions
}
