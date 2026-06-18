import type { InterviewQuestion } from '../../types'

export const metaSeoQuestions: InterviewQuestion[] = [
  {
    id: 65,
    category: 'Meta & SEO',
    question: 'Why is the title element important for SEO and UX?',
    answer: 'The title element sets the page title shown in browser tabs, bookmarks, search engine results, and social share previews when no OG title overrides it. Search engines weight title heavily for ranking and display it as the clickable headline in SERPs. Titles should be unique per page, descriptive, and roughly 50–60 characters to avoid truncation.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>API Documentation — Acme Developer Portal</title>
  </head>
  <body>...</body>
</html>`,
  },
  {
    id: 66,
    category: 'Meta & SEO',
    question: 'What is the meta description and how does it affect search results?',
    answer: 'The meta description provides a summary of page content shown beneath the title in search results when Google chooses to use it as the snippet. It does not directly affect rankings but influences click-through rate with compelling, accurate copy around 150–160 characters. Each page should have a unique description matching its content.',
    code: `<head>
  <title>Wireless Keyboard — Acme Store</title>
  <meta
    name="description"
    content="Mechanical wireless keyboard with Bluetooth 5.0, 40-hour battery, and hot-swappable switches. Free shipping on orders over $50."
  />
</head>`,
  },
  {
    id: 67,
    category: 'Meta & SEO',
    question: 'What are Open Graph tags and why use them?',
    answer: 'Open Graph meta tags control how URLs appear when shared on social platforms like Facebook, LinkedIn, Slack, and iMessage. og:title, og:description, og:image, and og:url define the preview card title, text, thumbnail, and canonical URL. Without them, platforms guess from page content, often picking poor images or truncated text.',
    code: `<head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content="How We Scaled to 1M Users" />
  <meta property="og:description" content="Lessons from our infrastructure journey." />
  <meta property="og:url" content="https://acme.com/blog/scaling" />
  <meta property="og:image" content="https://acme.com/og/scaling.jpg" />
  <meta property="og:site_name" content="Acme Engineering Blog" />
</head>`,
  },
  {
    id: 68,
    category: 'Meta & SEO',
    question: 'What is a canonical link and when should you set it?',
    answer: 'The canonical link element tells search engines which URL is the preferred version of a page when duplicate or similar content exists at multiple URLs. It consolidates ranking signals to one URL and prevents index bloat from query parameters, print views, or HTTP/HTTPS duplicates. The href should be an absolute URL pointing to the authoritative page.',
    code: `<head>
  <link rel="canonical" href="https://acme.com/products/wireless-keyboard" />
</head>

<!-- Duplicate parameter URL still canonicalizes to clean URL -->
<!-- https://acme.com/products/wireless-keyboard?ref=email -->`,
  },
  {
    id: 69,
    category: 'Meta & SEO',
    question: 'How do robots meta tags control crawling and indexing?',
    answer: 'Robots meta tags instruct search engine crawlers whether to index a page and follow its links using values like index, noindex, follow, and nofollow. A noindex page may still be crawled but will not appear in search results; nofollow tells crawlers not to pass link equity through links on the page. The X-Robots-Tag HTTP header provides the same control for non-HTML resources.',
    code: `<head>
  <!-- Allow indexing and link following (default) -->
  <meta name="robots" content="index, follow" />

  <!-- Staging / private page -->
  <meta name="robots" content="noindex, nofollow" />

  <!-- Allow indexing but do not follow links -->
  <meta name="robots" content="index, nofollow" />
</head>`,
  },
  {
    id: 70,
    category: 'Meta & SEO',
    question: 'How do you add a favicon and app icons in HTML?',
    answer: 'Favicons appear in browser tabs, bookmarks, and mobile home screens, linked from the head with link rel="icon" for standard favicons and additional sizes for high-DPI displays. Modern sites provide ICO, PNG, and SVG favicons plus apple-touch-icon for iOS home screen shortcuts. The web app manifest links icons for installable PWAs.',
    code: `<head>
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</head>`,
  },
  {
    id: 71,
    category: 'Meta & SEO',
    question: 'What is structured data with JSON-LD and why use it?',
    answer: 'JSON-LD is a script block in the head or body that provides structured data search engines parse for rich results — star ratings, FAQs, breadcrumbs, and product prices. It describes entities using schema.org vocabulary without affecting visible page content. Google recommends JSON-LD over microdata because it is easier to maintain separately from markup.',
    code: `<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wireless Keyboard",
    "description": "Mechanical Bluetooth keyboard",
    "offers": {
      "@type": "Offer",
      "price": "79.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
</head>`,
  },
  {
    id: 72,
    category: 'Meta & SEO',
    question: 'What is hreflang and when is it needed?',
    answer: 'hreflang annotations tell search engines about language and regional variants of a page so the correct version appears in localized search results. Implement via link rel="alternate" hreflang="x" in the head, HTTP headers, or sitemap entries. Each page should reference all language variants including itself, plus x-default for the fallback locale.',
    code: `<head>
  <link rel="alternate" hreflang="en" href="https://acme.com/en/pricing" />
  <link rel="alternate" hreflang="de" href="https://acme.com/de/pricing" />
  <link rel="alternate" hreflang="ja" href="https://acme.com/ja/pricing" />
  <link rel="alternate" hreflang="x-default" href="https://acme.com/en/pricing" />
</head>`,
  },
  {
    id: 73,
    category: 'Meta & SEO',
    question: 'What are Twitter Card meta tags?',
    answer: 'Twitter Card tags (now X Card tags) customize link previews on X/Twitter using twitter:card, twitter:title, twitter:description, and twitter:image meta elements. The card type summary_large_image shows a big preview image while summary uses a smaller thumbnail. They mirror Open Graph but let you tune Twitter-specific copy when OG defaults are insufficient.',
    code: `<head>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@acme" />
  <meta name="twitter:title" content="Launching Our New API" />
  <meta name="twitter:description" content="Build faster with our REST and GraphQL APIs." />
  <meta name="twitter:image" content="https://acme.com/og/api-launch.jpg" />
</head>`,
  },
  {
    id: 74,
    category: 'Meta & SEO',
    question: 'What other meta tags improve SEO and browser behavior?',
    answer: 'Beyond description and robots, useful meta tags include theme-color for browser UI tinting, author for attribution, and referrer for controlling Referer header leakage on outbound links. The charset and viewport meta tags are essential for correct rendering rather than SEO directly. Link rel="sitemap" can hint sitemap location though submitting via Search Console is standard.',
    code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#2563eb" />
  <meta name="author" content="Acme Inc." />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
</head>`,
  },
]
