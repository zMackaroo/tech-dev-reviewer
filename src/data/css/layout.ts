import type { InterviewQuestion } from '../../types'

export const layoutQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Layout',
    question: 'What is Flexbox and what problems does it solve?',
    answer: 'Flexbox (display: flex) is a one-dimensional layout model for arranging items in a row or column with flexible sizing and alignment along the main and cross axes. It solves common problems like vertical centering, equal-height columns, distributing leftover space, and reordering items without changing HTML. The flex container controls direction via flex-direction, while direct children become flex items that can grow, shrink, and align automatically.',
    code: `.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
}

.header__title {
  flex: 1;
  min-width: 0; /* allows text truncation */
}`,
  },
  {
    id: 17,
    category: 'Layout',
    question: 'How do justify-content and align-items work in Flexbox?',
    answer: 'justify-content distributes flex items along the main axis — the direction set by flex-direction (horizontal for row, vertical for column). Values like flex-start, center, space-between, and space-around control horizontal spacing in a row layout. align-items aligns items along the cross axis — perpendicular to the main axis — with values like stretch (default), center, flex-start, and baseline. Together they solve centering: justify-content: center and align-items: center place a single child in the exact middle of the container.',
    code: `/* Row layout: justify = horizontal, align = vertical */
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/* Center a child both ways */
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Column layout: justify = vertical, align = horizontal */
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}`,
  },
  {
    id: 18,
    category: 'Layout',
    question: 'What is the gap property in Flexbox?',
    answer: 'The gap property (previously grid-gap) sets consistent spacing between flex or grid items without using margins on each child. gap is shorthand for row-gap and column-gap, accepting one or two values for uniform or asymmetric spacing. Unlike margin, gap does not collapse and does not add space before the first item or after the last item — only between items. It works on both Flexbox and Grid, making it the modern replacement for margin-based spacing hacks.',
    code: `.button-group {
  display: flex;
  gap: 12px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px; /* row-gap column-gap */
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}`,
  },
  {
    id: 19,
    category: 'Layout',
    question: 'What are flex-grow, flex-shrink, and flex-basis?',
    answer: 'These three properties control how flex items size relative to the container and siblings. flex-grow determines how much leftover space an item absorbs — flex-grow: 1 makes an item expand to fill available room. flex-shrink controls how items contract when the container is too small — 0 prevents shrinking, 1 allows it. flex-basis sets the initial size before growing or shrinking, like width in a row layout. The shorthand flex: 1 means flex: 1 1 0% (grow, shrink, zero basis), which is common for equal-width columns.',
    code: `.layout {
  display: flex;
  gap: 1rem;
}

.sidebar {
  flex: 0 0 240px; /* don't grow, don't shrink, 240px basis */
}

.main {
  flex: 1 1 auto; /* grow to fill remaining space */
}

.search-input {
  flex: 1; /* shorthand: 1 1 0% */
  min-width: 0;
}`,
  },
  {
    id: 20,
    category: 'Layout',
    question: 'What is CSS Grid and how do template columns and rows work?',
    answer: 'CSS Grid (display: grid) is a two-dimensional layout system that defines explicit rows and columns on a container, then places children into cells. grid-template-columns and grid-template-rows accept track sizes like px, %, fr, auto, and repeat() to build the grid structure. Children flow into cells row by row by default, or you can place them explicitly with grid-column and grid-row. Grid excels at page layouts, card galleries, and dashboards where you need control over both axes simultaneously.',
    code: `.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}`,
  },
  {
    id: 21,
    category: 'Layout',
    question: 'What is the fr unit in CSS Grid?',
    answer: 'The fr (fraction) unit represents one share of the leftover free space in a grid container after fixed and intrinsic tracks are accounted for. If you have grid-template-columns: 1fr 2fr, the first column gets one third and the second gets two thirds of the available space. fr differs from % because percentages can cause overflow when gaps and fixed tracks are present, while fr distributes only the remaining room. It is the preferred unit for flexible grid tracks.',
    code: `.dashboard {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 1.5rem;
}

/* 1fr 2fr → column 2 is twice as wide as column 1 */
.split {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

/* fr handles gaps correctly; % often does not */
.hero-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}`,
  },
  {
    id: 22,
    category: 'Layout',
    question: 'What are grid template areas?',
    answer: 'grid-template-areas lets you name regions of a grid using ASCII-art strings, where each string is a row and each word is a cell name. Child elements assign themselves to a named area with grid-area: header, creating readable layout code without counting column lines. Duplicate names in a row make a cell span multiple columns; a dot (.) marks an empty cell. This approach makes responsive layout reflows easy — swap the area strings in a media query to rearrange the page.',
    code: `.app-shell {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`,
  },
  {
    id: 23,
    category: 'Layout',
    question: 'What is the difference between relative, absolute, fixed, and sticky positioning?',
    answer: 'position removes an element from normal flow depending on the value you choose. relative keeps the element in flow but offsets it with top/right/bottom/left relative to its original position, and it becomes the containing block for absolute children. absolute removes the element from flow and positions it relative to the nearest positioned ancestor (not static). fixed removes it from flow and anchors it to the viewport, so it stays put during scroll — ideal for modals and fixed navbars. sticky is a hybrid: in-flow until a scroll threshold, then it behaves like fixed within its parent container.',
    code: `.card {
  position: relative;
}

.card__badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.table thead th {
  position: sticky;
  top: 0;
  background: white;
}`,
  },
  {
    id: 24,
    category: 'Layout',
    question: 'How does z-index and stacking context work?',
    answer: 'z-index controls the paint order of positioned elements (position other than static) along the z-axis, but only within the same stacking context. A new stacking context is created by properties like position with z-index, opacity less than 1, transform, filter, isolation: isolate, and will-change. Elements inside a context cannot layer above elements outside it regardless of z-index value — a child with z-index: 9999 still sits below a sibling context\'s z-index: 1.',
    code: `.dropdown {
  position: relative;
  z-index: 50;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  isolation: isolate; /* new stacking context */
}

.modal {
  position: relative;
  z-index: 1; /* within overlay context, not global */
}

.toast {
  position: fixed;
  z-index: 200;
}`,
  },
  {
    id: 25,
    category: 'Layout',
    question: 'What does the overflow property control?',
    answer: 'overflow determines what happens when content exceeds an element\'s box in the horizontal or vertical direction. visible (default) lets content spill outside the box; hidden clips it; scroll always shows scrollbars; auto shows scrollbars only when needed. overflow-x and overflow-y control each axis independently. Overflow affects margin collapse and creates a block formatting context when set to something other than visible.',
    code: `.card {
  border-radius: 12px;
  overflow: hidden; /* clips children to rounded corners */
}

.chat-messages {
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.table-wrapper {
  overflow-x: auto; /* horizontal scroll on small screens */
  -webkit-overflow-scrolling: touch;
}`,
  },
  {
    id: 26,
    category: 'Layout',
    question: 'What is aspect-ratio and when do you use it?',
    answer: 'The aspect-ratio property sets a preferred width-to-height ratio for a box, such as 16 / 9 or 1, so the element maintains that proportion as its width changes. It replaces older padding-top percentage hacks used for responsive embeds and image containers. The property works on any element and pairs well with width: 100% and object-fit: cover on child images or videos.',
    code: `.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.product-image {
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
  },
  {
    id: 27,
    category: 'Layout',
    question: 'What are minmax() and place-items in CSS Grid?',
    answer: 'minmax(min, max) defines a grid track size with a floor and ceiling — minmax(200px, 1fr) means the track is at least 200px but can grow to one fraction of leftover space. It is essential for responsive grids that never shrink below a readable width. place-items is shorthand for align-items and justify-items, controlling how grid items align within their cells on both axes. place-items: center centers content in every cell, while justify-items: stretch (default) fills the cell width.',
    code: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 1rem;
  place-items: stretch;
}

.icon-cell {
  display: grid;
  place-items: center; /* center icon in cell */
  aspect-ratio: 1;
}`,
  },
]
