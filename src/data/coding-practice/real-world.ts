import type { CodingPracticeQuestion, CodingTestCase } from './types'

function rw(
  id: number,
  title: string,
  prompt: string,
  functionName: string,
  params: string,
  tests: CodingTestCase[],
  dataStructure?: string,
): CodingPracticeQuestion {
  return {
    id,
    category: 'Real-World Apps',
    title,
    prompt,
    functionName,
    params,
    tests,
    dataStructure,
  }
}

export function buildRealWorldQuestions(startId: number): CodingPracticeQuestion[] {
  let id = startId
  const next = () => id++
  const out: CodingPracticeQuestion[] = []

  out.push(
    rw(
      next(),
      'Cart subtotal',
      'Given cart line items, return the subtotal (sum of price × quantity).',
      'cartSubtotal',
      'items',
      [
        {
          args: [[{ id: 1, price: 10, quantity: 2 }, { id: 2, price: 5, quantity: 1 }]],
          expected: 25,
        },
        { args: [[]], expected: 0 },
      ],
      'items: Array<{ id: number, price: number, quantity: number }>',
    ),
    rw(
      next(),
      'Apply percentage discount',
      'Return total after applying discount percent (0–100). Round to 2 decimal places.',
      'applyDiscount',
      'total, discountPercent',
      [
        { args: [100, 10], expected: 90 },
        { args: [49.99, 50], expected: 25 },
      ],
    ),
    rw(
      next(),
      'Free shipping eligible',
      'Return true if subtotal is greater than or equal to threshold.',
      'qualifiesForFreeShipping',
      'subtotal, threshold',
      [
        { args: [75, 50], expected: true },
        { args: [49.99, 50], expected: false },
      ],
    ),
    rw(
      next(),
      'Out-of-stock products',
      'Return products where stock === 0.',
      'getOutOfStock',
      'products',
      [
        {
          args: [[{ id: 1, stock: 0 }, { id: 2, stock: 3 }, { id: 3, stock: 0 }]],
          expected: [{ id: 1, stock: 0 }, { id: 3, stock: 0 }],
        },
      ],
    ),
    rw(
      next(),
      'Update cart quantity',
      'Return new cart array with matching id quantity updated. Other items unchanged.',
      'updateCartQuantity',
      'cart, productId, quantity',
      [
        {
          args: [[{ id: 1, qty: 1 }, { id: 2, qty: 3 }], 2, 5],
          expected: [{ id: 1, qty: 1 }, { id: 2, qty: 5 }],
        },
      ],
    ),
    rw(
      next(),
      'Remove cart item',
      'Return cart without the item matching productId.',
      'removeFromCart',
      'cart, productId',
      [
        {
          args: [[{ id: 1, qty: 2 }, { id: 2, qty: 1 }], 1],
          expected: [{ id: 2, qty: 1 }],
        },
      ],
    ),
    rw(
      next(),
      'Calculate tax',
      'Return subtotal * taxRate rounded to 2 decimals.',
      'calculateTax',
      'subtotal, taxRate',
      [
        { args: [100, 0.0825], expected: 8.25 },
        { args: [50, 0.1], expected: 5 },
      ],
    ),
    rw(
      next(),
      'Order total with tax',
      'Return subtotal + tax (subtotal * taxRate), rounded to 2 decimals.',
      'orderTotal',
      'subtotal, taxRate',
      [
        { args: [100, 0.1], expected: 110 },
        { args: [40, 0.05], expected: 42 },
      ],
    ),
    rw(
      next(),
      'Sort products by price',
      'Return new array sorted by price ascending (do not mutate input).',
      'sortByPrice',
      'products',
      [
        {
          args: [[{ id: 1, price: 30 }, { id: 2, price: 10 }]],
          expected: [{ id: 2, price: 10 }, { id: 1, price: 30 }],
        },
      ],
    ),
    rw(
      next(),
      'Filter in-stock products',
      'Return products where stock > 0.',
      'filterInStock',
      'products',
      [
        {
          args: [[{ id: 1, stock: 0 }, { id: 2, stock: 2 }]],
          expected: [{ id: 2, stock: 2 }],
        },
      ],
    ),
    rw(
      next(),
      'Validate email',
      'Return true if email contains exactly one @ with non-empty local and domain parts.',
      'isValidEmail',
      'email',
      [
        { args: ['user@example.com'], expected: true },
        { args: ['invalid'], expected: false },
        { args: ['@nodomain.com'], expected: false },
      ],
    ),
    rw(
      next(),
      'Password minimum length',
      'Return true if password length is at least minLength.',
      'meetsMinPasswordLength',
      'password, minLength',
      [
        { args: ['secret123', 8], expected: true },
        { args: ['short', 8], expected: false },
      ],
    ),
    rw(
      next(),
      'Required fields filled',
      'Return true if every key in requiredKeys has a non-empty trimmed value in formValues.',
      'requiredFieldsFilled',
      'formValues, requiredKeys',
      [
        {
          args: [{ name: ' Ada ', email: 'a@b.com' }, ['name', 'email']],
          expected: true,
        },
        {
          args: [{ name: '  ', email: 'a@b.com' }, ['name', 'email']],
          expected: false,
        },
      ],
    ),
    rw(
      next(),
      'Sanitize display name',
      'Trim whitespace and collapse multiple internal spaces to one.',
      'sanitizeDisplayName',
      'name',
      [
        { args: ['  John   Doe  '], expected: 'John Doe' },
        { args: ['Single'], expected: 'Single' },
      ],
    ),
    rw(
      next(),
      'Phone digits only',
      'Return string with all non-digit characters removed.',
      'normalizePhone',
      'phone',
      [
        { args: ['(555) 123-4567'], expected: '5551234567' },
        { args: ['+1 555'], expected: '1555' },
      ],
    ),
    rw(
      next(),
      'Form has errors',
      'Return true if errors object has at least one key.',
      'formHasErrors',
      'errors',
      [
        { args: [{ email: 'Required' }], expected: true },
        { args: [{}], expected: false },
      ],
    ),
    rw(
      next(),
      'Toggle checkbox item',
      'Return new items array toggling checked for matching id.',
      'toggleItemChecked',
      'items, id',
      [
        {
          args: [[{ id: 1, checked: false }, { id: 2, checked: true }], 1],
          expected: [{ id: 1, checked: true }, { id: 2, checked: true }],
        },
      ],
    ),
    rw(
      next(),
      'Normalize API user',
      'Map `{ first_name, last_name, email }` to `{ fullName, email }` where fullName is "first last".',
      'normalizeUser',
      'apiUser',
      [
        {
          args: [{ first_name: 'Jane', last_name: 'Doe', email: 'j@x.com' }],
          expected: { fullName: 'Jane Doe', email: 'j@x.com' },
        },
      ],
    ),
    rw(
      next(),
      'Group titles by author',
      'Return object keyed by authorId with arrays of post titles.',
      'groupTitlesByAuthor',
      'posts',
      [
        {
          args: [[{ authorId: 1, title: 'A' }, { authorId: 2, title: 'B' }, { authorId: 1, title: 'C' }]],
          expected: { 1: ['A', 'C'], 2: ['B'] },
        },
      ],
    ),
    rw(
      next(),
      'Paginate API results',
      'Return slice for page (1-indexed) given pageSize.',
      'paginate',
      'items, page, pageSize',
      [
        { args: [[1, 2, 3, 4, 5], 2, 2], expected: [3, 4] },
        { args: [[1, 2, 3], 1, 10], expected: [1, 2, 3] },
      ],
    ),
    rw(
      next(),
      'Total pages',
      'Return Math.ceil(items.length / pageSize). Return 0 when items is empty.',
      'totalPages',
      'items, pageSize',
      [
        { args: [[1, 2, 3, 4, 5], 2], expected: 3 },
        { args: [[]], expected: 0 },
      ],
    ),
    rw(
      next(),
      'Map field errors',
      'Convert `[{ field, message }]` to `{ [field]: message }`.',
      'mapFieldErrors',
      'errors',
      [
        {
          args: [[{ field: 'email', message: 'Invalid' }, { field: 'name', message: 'Required' }]],
          expected: { email: 'Invalid', name: 'Required' },
        },
      ],
    ),
    rw(
      next(),
      'Build select options',
      'Map `{ id, label }[]` to `{ value, label }[]` where value = String(id).',
      'toSelectOptions',
      'items',
      [
        {
          args: [[{ id: 1, label: 'Admin' }, { id: 2, label: 'User' }]],
          expected: [
            { value: '1', label: 'Admin' },
            { value: '2', label: 'User' },
          ],
        },
      ],
    ),
    rw(
      next(),
      'Search products by name',
      'Return products whose name includes query (case-insensitive).',
      'searchProducts',
      'products, query',
      [
        {
          args: [[{ id: 1, name: 'Blue Shirt' }, { id: 2, name: 'Red Hat' }], 'shirt'],
          expected: [{ id: 1, name: 'Blue Shirt' }],
        },
      ],
    ),
    rw(
      next(),
      'Filter by category',
      'Return products matching category.',
      'filterByCategory',
      'products, category',
      [
        {
          args: [[{ id: 1, category: 'shoes' }, { id: 2, category: 'hats' }], 'hats'],
          expected: [{ id: 2, category: 'hats' }],
        },
      ],
    ),
    rw(
      next(),
      'Filter by price range',
      'Return products where min <= price <= max.',
      'filterByPriceRange',
      'products, min, max',
      [
        {
          args: [[{ id: 1, price: 10 }, { id: 2, price: 50 }], 5, 20],
          expected: [{ id: 1, price: 10 }],
        },
      ],
    ),
    rw(
      next(),
      'User can edit resource',
      'Return true if user.role is "admin" or user.id === resourceOwnerId.',
      'canEdit',
      'user, resourceOwnerId',
      [
        { args: [{ id: 1, role: 'user' }, 1], expected: true },
        { args: [{ id: 1, role: 'user' }, 99], expected: false },
        { args: [{ id: 1, role: 'admin' }, 99], expected: true },
      ],
    ),
    rw(
      next(),
      'Has role',
      'Return true if user.roles includes role.',
      'hasRole',
      'user, role',
      [
        { args: [{ roles: ['editor', 'viewer'] }, 'editor'], expected: true },
        { args: [{ roles: ['viewer'] }, 'admin'], expected: false },
      ],
    ),
    rw(
      next(),
      'Session expired',
      'Return true if now > expiresAt (both milliseconds).',
      'isSessionExpired',
      'expiresAt, now',
      [
        { args: [1000, 1001], expected: true },
        { args: [5000, 1000], expected: false },
      ],
    ),
    rw(
      next(),
      'Safe redirect path',
      'Return redirectPath if it starts with "/", else defaultPath (prevent open redirects).',
      'safeRedirectPath',
      'redirectPath, defaultPath',
      [
        { args: ['/dashboard', '/home'], expected: '/dashboard' },
        { args: ['https://evil.com', '/home'], expected: '/home' },
      ],
    ),
    rw(
      next(),
      'Feature flag enabled',
      'Return true if flags[feature] === true.',
      'isFeatureEnabled',
      'flags, feature',
      [
        { args: [{ darkMode: true, beta: false }, 'darkMode'], expected: true },
        { args: [{ darkMode: true }, 'beta'], expected: false },
      ],
    ),
    rw(
      next(),
      'Toggle todo complete',
      'Return todos with matching id toggling completed.',
      'toggleTodo',
      'todos, id',
      [
        {
          args: [[{ id: 1, text: 'a', completed: false }], 1],
          expected: [{ id: 1, text: 'a', completed: true }],
        },
      ],
    ),
    rw(
      next(),
      'Remove todo',
      'Return todos without matching id.',
      'removeTodo',
      'todos, id',
      [
        {
          args: [[{ id: 1 }, { id: 2 }], 1],
          expected: [{ id: 2 }],
        },
      ],
    ),
    rw(
      next(),
      'Count incomplete todos',
      'Return count where completed === false.',
      'countIncomplete',
      'todos',
      [
        {
          args: [[{ id: 1, completed: false }, { id: 2, completed: true }]],
          expected: 1,
        },
      ],
    ),
    rw(
      next(),
      'Set active tab',
      'Return tabs with only matching id active: true, others false.',
      'setActiveTab',
      'tabs, id',
      [
        {
          args: [[{ id: 1, active: true }, { id: 2, active: false }], 2],
          expected: [{ id: 1, active: false }, { id: 2, active: true }],
        },
      ],
    ),
    rw(
      next(),
      'Unread notifications',
      'Return count of notifications where read === false.',
      'unreadCount',
      'notifications',
      [
        {
          args: [[{ id: 1, read: false }, { id: 2, read: true }]],
          expected: 1,
        },
      ],
    ),
    rw(
      next(),
      'Format price USD',
      'Return "$" + amount with 2 decimal places.',
      'formatUSD',
      'amount',
      [
        { args: [9.5], expected: '$9.50' },
        { args: [100], expected: '$100.00' },
      ],
    ),
    rw(
      next(),
      'Minutes ago label',
      'Return `${minutes} min ago` when minutes > 0, else "Just now".',
      'minutesAgoLabel',
      'minutes',
      [
        { args: [5], expected: '5 min ago' },
        { args: [0], expected: 'Just now' },
      ],
    ),
    rw(
      next(),
      'Parse query string',
      'Parse "a=1&b=2" into `{ a: "1", b: "2" }`. Empty string returns {}.',
      'parseQueryString',
      'queryString',
      [
        { args: ['a=1&b=2'], expected: { a: '1', b: '2' } },
        { args: [''], expected: {} },
      ],
    ),
    rw(
      next(),
      'Build query string',
      'Convert params object to "key=value&..." joined. Empty object returns "".',
      'buildQueryString',
      'params',
      [
        { args: [{ a: '1', b: '2' }], expected: 'a=1&b=2' },
        { args: [{}], expected: '' },
      ],
    ),
    rw(
      next(),
      'Active nav link',
      'Return true if currentPath === path or currentPath starts with path + "/".',
      'isNavActive',
      'currentPath, path',
      [
        { args: ['/settings/profile', '/settings'], expected: true },
        { args: ['/about', '/settings'], expected: false },
        { args: ['/settings', '/settings'], expected: true },
      ],
    ),
    rw(
      next(),
      'Path to segments',
      'Split "/a/b/c" into ["a","b","c"] (no empty segments).',
      'pathToSegments',
      'pathname',
      [
        { args: ['/a/b/c'], expected: ['a', 'b', 'c'] },
        { args: ['/'], expected: [] },
      ],
    ),
  )

  for (let i = 0; i < 25; i++) {
    const minSpend = 25 + i * 5
    out.push(
      rw(
        next(),
        `Loyalty tier ${i + 1}`,
        `Return "gold" if lifetimeSpend >= ${minSpend * 4}, "silver" if >= ${minSpend * 2}, else "bronze".`,
        'getLoyaltyTier',
        'lifetimeSpend',
        [
          { args: [minSpend * 4], expected: 'gold' },
          { args: [minSpend * 2], expected: 'silver' },
          { args: [0], expected: 'bronze' },
        ],
      ),
      rw(
        next(),
        `Wishlist check ${i + 1}`,
        'Return true if wishlistIds includes productId.',
        'isInWishlist',
        'wishlistIds, productId',
        [
          { args: [[1, 2, 3], 2], expected: true },
          { args: [[1, 2, 3], 99], expected: false },
        ],
      ),
    )
  }

  return out
}
