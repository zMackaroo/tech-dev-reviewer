import type { InterviewQuestion } from '../../types'

export const tablesListsQuestions: InterviewQuestion[] = [
  {
    id: 75,
    category: 'Tables & Lists',
    question: 'What is the purpose of thead and tbody in HTML tables?',
    answer: 'thead and tbody divide a table into header and body sections, improving semantics, accessibility, and styling hooks. thead contains header rows with column labels, while tbody holds the data rows. Browsers can repeat thead rows when printing long tables and screen readers use the structure for navigation.',
    code: `<table>
  <caption>Monthly Revenue</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$42,000</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$38,500</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 76,
    category: 'Tables & Lists',
    question: 'What does the scope attribute on th elements do?',
    answer: 'The scope attribute on th tells assistive technologies whether a header cell applies to its column (scope="col"), row (scope="row"), column group, or row group. This association helps screen readers read "Revenue, $42,000" instead of disconnected cell values. For simple tables, scope is the preferred way to link headers to data cells.',
    code: `<table>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Units sold</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Keyboard</th>
      <td>1,200</td>
      <td>$95,000</td>
    </tr>
    <tr>
      <th scope="row">Mouse</th>
      <td>3,400</td>
      <td>$68,000</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 77,
    category: 'Tables & Lists',
    question: 'Why should tables include a caption element?',
    answer: 'The caption element provides a visible, programmatic title for the table announced by screen readers before navigating cells. It appears above the table by default and describes what the table contains — not just repeating a nearby heading. Captions improve comprehension for all users scanning data-heavy pages.',
    code: `<table>
  <caption>
    Employee headcount by department, March 2024
  </caption>
  <thead>
    <tr>
      <th scope="col">Department</th>
      <th scope="col">Headcount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Engineering</td>
      <td>48</td>
    </tr>
    <tr>
      <td>Sales</td>
      <td>22</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 78,
    category: 'Tables & Lists',
    question: 'When should you use ul versus ol lists?',
    answer: 'Use ul for unordered lists where item sequence does not matter, such as feature bullet points or navigation items. Use ol when order is meaningful — step-by-step instructions, rankings, or legal clauses where changing order changes meaning. Both use li children and can be nested for hierarchical outlines.',
    code: `<!-- Unordered: order does not matter -->
<ul>
  <li>Free shipping</li>
  <li>30-day returns</li>
  <li>2-year warranty</li>
</ul>

<!-- Ordered: sequence matters -->
<ol>
  <li>Create an account</li>
  <li>Verify your email</li>
  <li>Complete your profile</li>
</ol>`,
  },
  {
    id: 79,
    category: 'Tables & Lists',
    question: 'What is a description list (dl) and when use dt and dd?',
    answer: 'The dl element is a description list pairing terms (dt) with descriptions (dd), ideal for glossaries, metadata key-value displays, and FAQ-style content. Multiple dd elements can follow one dt, and one dd can relate to several dt terms. Unlike ul/ol, dl has no implied bullet or numbering — semantics are term-definition pairs.',
    code: `<dl>
  <dt>Author</dt>
  <dd>Jane Doe</dd>

  <dt>Published</dt>
  <dd><time datetime="2024-03-15">March 15, 2024</time></dd>

  <dt>Tags</dt>
  <dd>HTML</dd>
  <dd>Accessibility</dd>
</dl>`,
  },
  {
    id: 80,
    category: 'Tables & Lists',
    question: 'How do nested lists work in HTML?',
    answer: 'Lists nest by placing a ul or ol inside an li element, creating hierarchical outlines for menus, table of contents, or multi-level navigation. The inner list must be a child of li, not a direct child of ul or ol alongside li elements. CSS styles each nesting level with indentation or different markers.',
    code: `<nav aria-label="Site">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/products">Products</a>
      <ul>
        <li><a href="/products/keyboards">Keyboards</a></li>
        <li><a href="/products/mice">Mice</a></li>
      </ul>
    </li>
    <li><a href="/support">Support</a></li>
  </ul>
</nav>`,
  },
  {
    id: 81,
    category: 'Tables & Lists',
    question: 'What accessibility practices apply specifically to HTML tables?',
    answer: 'Data tables need th headers, scope or headers/id associations, and caption for context; layout tables should be avoided entirely in favor of CSS grid or flexbox. Do not use tables purely for visual alignment of non-tabular content. Keep tables simple or split complex matrices when possible.',
    code: `<!-- Accessible data table -->
<table>
  <caption>Pricing plan comparison</caption>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Free</th>
      <th scope="col">Pro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Storage</th>
      <td>5 GB</td>
      <td>100 GB</td>
    </tr>
    <tr>
      <th scope="row">Support</th>
      <td>Community</td>
      <td>Priority</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 82,
    category: 'Tables & Lists',
    question: 'What is the tfoot element used for?',
    answer: 'The tfoot element defines a footer section for a table, typically holding summary rows like totals, averages, or footnotes. It can appear after tbody in markup but browsers render it at the bottom of the table. Like thead, tfoot can repeat on printed pages spanning multiple sheets.',
    code: `<table>
  <caption>Invoice #1042</caption>
  <thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License — Pro</td>
      <td>1</td>
      <td>$99.00</td>
    </tr>
    <tr>
      <td>Support add-on</td>
      <td>1</td>
      <td>$29.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Total</th>
      <td>$128.00</td>
    </tr>
  </tfoot>
</table>`,
  },
  {
    id: 83,
    category: 'Tables & Lists',
    question: 'How do colspan and rowspan affect table structure?',
    answer: 'colspan merges a cell across multiple columns and rowspan merges across rows, creating complex table layouts for calendars, schedules, or grouped headers. Accessibility requires that merged cells still make sense to screen readers — headers/id associations become important in complex cases. Overusing merges for layout creates confusing navigation for assistive tech.',
    code: `<table>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col" colspan="2">Monday</th>
    </tr>
    <tr>
      <th scope="col"></th>
      <th scope="col">Room A</th>
      <th scope="col">Room B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" rowspan="2">9:00 AM</th>
      <td>Standup</td>
      <td>—</td>
    </tr>
    <tr>
      <td>Planning</td>
      <td>Interview</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 84,
    category: 'Tables & Lists',
    question: 'What list-related attributes improve accessibility?',
    answer: 'Lists themselves carry implicit list semantics, but surrounding context matters: nav should wrap navigation lists, and aria-label distinguishes multiple lists on one page. For ordered lists, the start and reversed attributes control numbering without CSS hacks. Li elements should contain meaningful content, not empty placeholders.',
    code: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li aria-current="page">HTML Tables</li>
  </ol>
</nav>

<!-- Count down a ranked list -->
<ol reversed start="3">
  <li>Third place — Team C</li>
  <li>Second place — Team B</li>
  <li>First place — Team A</li>
</ol>`,
  },
]
