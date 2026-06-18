import type { InterviewQuestion } from '../../types'

export const tablesListsQuestions: InterviewQuestion[] = [
  {
    id: 75,
    category: 'Tables & Lists',
    question: 'What is the purpose of thead and tbody in HTML tables?',
    answer: 'thead and tbody divide a table into header and body sections, improving semantics, accessibility, and styling hooks. thead contains header rows with column labels, while tbody holds the data rows. Browsers can repeat thead rows when printing long tables and screen readers use the structure for navigation. For example, a financial report puts Month and Revenue in thead and quarterly figures in tbody. In a real app, CSS targets tbody tr:nth-child(even) for zebra striping without affecting header rows.',
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
    answer: 'The scope attribute on th tells assistive technologies whether a header cell applies to its column (scope="col"), row (scope="row"), column group, or row group. This association helps screen readers read "Revenue, $42,000" instead of disconnected cell values. For simple tables, scope is the preferred way to link headers to data cells. For example, a row header th scope="row" labels the data cells in that row. In a real app, data dashboards export HTML tables with proper scope so accessibility audits pass without complex headers/id wiring.',
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
    answer: 'The caption element provides a visible, programmatic title for the table announced by screen readers before navigating cells. It appears above the table by default and describes what the table contains — not just repeating a nearby heading. Captions improve comprehension for all users scanning data-heavy pages. For example, caption "2024 Q1 Sales by Region" is clearer than an untitled grid of numbers. In a real app, report generators include caption text from report metadata so exported HTML tables are self-describing.',
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
    answer: 'Use ul for unordered lists where item sequence does not matter, such as feature bullet points or navigation items. Use ol when order is meaningful — step-by-step instructions, rankings, or legal clauses where changing order changes meaning. Both use li children and can be nested for hierarchical outlines. For example, a recipe uses ol for numbered steps and ul for optional garnish ideas. In a real app, documentation sites use ol for tutorials and ul for unrelated feature lists, helping screen readers announce "list of 5 items" with correct ordering context.',
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
    answer: 'The dl element is a description list pairing terms (dt) with descriptions (dd), ideal for glossaries, metadata key-value displays, and FAQ-style content. Multiple dd elements can follow one dt, and one dd can relate to several dt terms. Unlike ul/ol, dl has no implied bullet or numbering — semantics are term-definition pairs. For example, a product spec sheet uses dt for "Battery life" and dd for "40 hours". In a real app, profile pages show user metadata with dl instead of misusing tables or div grids for key-value pairs.',
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
    answer: 'Lists nest by placing a ul or ol inside an li element, creating hierarchical outlines for menus, table of contents, or multi-level navigation. The inner list must be a child of li, not a direct child of ul or ol alongside li elements. CSS styles each nesting level with indentation or different markers. For example, a site nav nests ul inside the "Products" li for subcategories. In a real app, nested lists power documentation sidebars and dropdown menus before JavaScript enhances them with keyboard behavior.',
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
    answer: 'Data tables need th headers, scope or headers/id associations, and caption for context; layout tables should be avoided entirely in favor of CSS grid or flexbox. Do not use tables purely for visual alignment of non-tabular content. Keep tables simple or split complex matrices when possible. For example, a pricing comparison with plan names as column headers and features as row headers uses th scope appropriately. In a real app, accessibility linters flag tables missing th or caption and teams refactor layout tables to semantic div structures with ARIA only when necessary.',
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
    answer: 'The tfoot element defines a footer section for a table, typically holding summary rows like totals, averages, or footnotes. It can appear after tbody in markup but browsers render it at the bottom of the table. Like thead, tfoot can repeat on printed pages spanning multiple sheets. For example, a sales table puts Grand Total in a tfoot row spanning columns. In a real app, financial dashboards use tfoot for aggregate calculations while thead labels columns and tbody holds line items.',
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
    answer: 'colspan merges a cell across multiple columns and rowspan merges across rows, creating complex table layouts for calendars, schedules, or grouped headers. Accessibility requires that merged cells still make sense to screen readers — headers/id associations become important in complex cases. Overusing merges for layout creates confusing navigation for assistive tech. For example, a timetable uses rowspan="2" on a time slot label spanning two event rows. In a real app, simple colspan for a "No data" message is fine, but heavily merged tables should include headers attributes on td elements.',
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
    answer: 'Lists themselves carry implicit list semantics, but surrounding context matters: nav should wrap navigation lists, and aria-label distinguishes multiple lists on one page. For ordered lists, the start and reversed attributes control numbering without CSS hacks. Li elements should contain meaningful content, not empty placeholders. For example, aria-label="Table of contents" on nav helps when multiple ol elements appear on a long documentation page. In a real app, breadcrumb lists use nav aria-label="Breadcrumb" with ol and aria-current="page" on the last item.',
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
