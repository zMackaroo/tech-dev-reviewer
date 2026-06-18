import type { InterviewQuestion } from '../../types'

export const mediaQuestions: InterviewQuestion[] = [
  {
    id: 40,
    category: 'Media',
    question: 'Why is the alt attribute critical on img elements?',
    answer: 'The alt attribute provides a text alternative describing the image content or function for screen readers, when images fail to load, and for search engine indexing. Decorative images that add no information should use alt="" so assistive tech skips them. Meaningful alt text describes the content and purpose, not the filename. For example, alt="Golden retriever playing fetch in a park" is useful while alt="IMG_4521.jpg" is not. In a real app, CMS templates enforce alt text on upload and linters flag missing alt in PR reviews for accessibility compliance.',
    code: `<!-- Informative image -->
<img
  src="/team-photo.jpg"
  alt="Engineering team of eight people at the 2024 offsite"
  width="800"
  height="600"
/>

<!-- Decorative image — empty alt -->
<img src="/divider.svg" alt="" role="presentation" />

<!-- Functional image (icon button) -->
<button type="button">
  <img src="/icons/search.svg" alt="Search" />
</button>`,
  },
  {
    id: 41,
    category: 'Media',
    question: 'How do picture and srcset enable responsive images?',
    answer: 'The srcset attribute lists multiple image URLs with width or pixel density descriptors so browsers pick the best file for the viewport and screen density. The sizes attribute tells the browser how wide the image renders at different breakpoints, improving selection accuracy. The picture element wraps sources with media queries for art direction — different crops at different breakpoints. For example, srcset="photo-400.jpg 400w, photo-800.jpg 800w" with sizes="(min-width: 768px) 50vw, 100vw" avoids shipping desktop-sized images to phones. In a real app, image CDNs generate srcset URLs automatically from a single upload.',
    code: `<picture>
  <source media="(min-width: 768px)" srcset="/hero-wide.jpg" />
  <source media="(min-width: 480px)" srcset="/hero-tablet.jpg" />
  <img
    src="/hero-mobile.jpg"
    alt="Product launch banner"
    width="1200"
    height="600"
    loading="lazy"
  />
</picture>

<img
  src="/product.jpg"
  srcset="/product-400.jpg 400w, /product-800.jpg 800w, /product-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 400px"
  alt="Wireless earbuds in charging case"
/>`,
  },
  {
    id: 42,
    category: 'Media',
    question: 'How do you embed video with the video element?',
    answer: 'The video element embeds video content with native browser controls via the controls attribute and supports multiple source formats through nested source elements. Attributes like poster, autoplay, muted, loop, and playsinline control playback behavior — autoplay generally requires muted for mobile policies. Provide fallback text inside video for unsupported browsers. For example, two source tags cover WebM and MP4 codecs across Chrome and Safari. In a real app, self-hosted video uses video with CDN delivery while YouTube embeds might still use iframe when you need platform features.',
    code: `<video controls width="640" height="360" poster="/thumb.jpg" preload="metadata">
  <source src="/demo.webm" type="video/webm" />
  <source src="/demo.mp4" type="video/mp4" />
  <p>
    Your browser does not support HTML5 video.
    <a href="/demo.mp4">Download the video</a>.
  </p>
</video>`,
  },
  {
    id: 43,
    category: 'Media',
    question: 'How does the audio element differ from video?',
    answer: 'The audio element embeds sound content without a visual frame, using the same source pattern and controls attribute as video. It supports preload, autoplay, loop, and muted attributes, though autoplay policies apply similarly. Audio is appropriate for podcasts, sound effects, or voice previews where no video track exists. For example, a language learning app embeds pronunciation samples with audio controls. In a real app, audio players often get custom UI built in JavaScript while keeping an accessible native control fallback.',
    code: `<figure>
  <figcaption>Episode 12 — Interview with the CTO</figcaption>
  <audio controls preload="none">
    <source src="/podcast-ep12.mp3" type="audio/mpeg" />
    <source src="/podcast-ep12.ogg" type="audio/ogg" />
    <a href="/podcast-ep12.mp3">Download MP3</a>
  </audio>
</figure>`,
  },
  {
    id: 44,
    category: 'Media',
    question: 'What are the security and accessibility concerns with iframe?',
    answer: 'The iframe element embeds another HTML page inline — maps, videos, payment widgets, or third-party apps. Use the title attribute to describe the embedded content for screen readers, and sandbox or allow attributes to restrict capabilities when embedding untrusted content. Lazy loading with loading="lazy" defers offscreen iframe loads. For example, title="Google Maps location of our office" helps users understand the embedded map purpose. In a real app, payment iframes from Stripe isolate sensitive card input while parent pages communicate via postMessage.',
    code: `<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Product demo video on YouTube"
  width="560"
  height="315"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
  allowfullscreen
></iframe>`,
  },
  {
    id: 45,
    category: 'Media',
    question: 'When should you use inline SVG instead of img?',
    answer: 'Inline SVG embeds vector markup directly in HTML, allowing CSS styling, animation, and DOM access to individual paths. Use img with an SVG src when the graphic is static and styling control is unnecessary. Inline SVG supports aria-hidden for decorative icons or title/desc elements for accessible diagrams. For example, an icon that changes color on hover is easier with inline SVG targeted by CSS fill. In a real app, design systems ship inline SVG icons in React components while marketing illustrations may load as optimized img files.',
    code: `<!-- Inline SVG — styleable and accessible -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">
  <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5z" />
</svg>

<!-- SVG as image — simpler but not styleable via CSS -->
<img src="/logo.svg" alt="Acme Corp logo" width="120" height="40" />`,
  },
  {
    id: 46,
    category: 'Media',
    question: 'What does loading="lazy" do on images and iframes?',
    answer: 'The loading="lazy" attribute tells the browser to defer loading the resource until it is near the viewport, reducing initial page weight and improving LCP for above-the-fold content. Native lazy loading requires no JavaScript and works on img and iframe in modern browsers. Do not lazy-load hero images or LCP candidates because delaying them hurts performance scores. For example, product grid images below the fold use loading="lazy" while the banner omits it. In a real app, combining lazy loading with explicit width and height prevents layout shift as images load.',
    code: `<!-- Above the fold — eager load (default) -->
<img src="/hero.jpg" alt="Summer sale" width="1200" height="400" />

<!-- Below the fold — lazy load -->
<img
  src="/product-1.jpg"
  alt="Running shoes"
  width="300"
  height="300"
  loading="lazy"
  decoding="async"
/>`,
  },
  {
    id: 47,
    category: 'Media',
    question: 'Why should img elements include width and height attributes?',
    answer: 'Explicit width and height attributes let the browser reserve space before the image downloads, preventing cumulative layout shift (CLS). CSS can still scale the image responsively with max-width: 100% and height: auto while intrinsic dimensions define the aspect ratio. Modern browsers compute aspect ratio from HTML attributes even when CSS overrides display size. For example, width="800" height="600" reserves a 4:3 box so text below does not jump when the image appears. In a real app, build pipelines extract dimensions at build time or image CDNs append them automatically.',
    code: `<style>
  img {
    max-width: 100%;
    height: auto;
  }
</style>

<img
  src="/article-photo.jpg"
  alt="Team collaborating at a whiteboard"
  width="800"
  height="600"
  loading="lazy"
/>`,
  },
  {
    id: 48,
    category: 'Media',
    question: 'How does figure relate to media content?',
    answer: 'Figure is a semantic wrapper for media or other self-contained content that is referenced from the document flow, paired with an optional figcaption. It applies to images, videos, code blocks, charts, and blockquotes — not just photos. Using figure groups the media with its caption for assistive technologies as a single unit. For example, a tutorial wraps a video demo and explanatory caption in figure. In a real app, blog and documentation templates use figure consistently so captions stay associated when content is syndicated or parsed.',
    code: `<figure>
  <video controls width="640" poster="/tutorial-poster.jpg">
    <source src="/tutorial.mp4" type="video/mp4" />
  </video>
  <figcaption>
    Step 3: Configure environment variables in the dashboard.
  </figcaption>
</figure>`,
  },
  {
    id: 49,
    category: 'Media',
    question: 'What is the track element used for in video and audio?',
    answer: 'The track element adds timed text tracks to media elements — subtitles, captions, descriptions, chapters, or metadata — loaded from WebVTT (.vtt) files. The kind attribute specifies the track type, srclang sets the language, and label provides a user-visible name in the track menu. Captions include dialogue and sound effects for deaf users; subtitles assume the viewer hears audio. For example, kind="captions" srclang="en" src="/demo.en.vtt" adds English captions to a product video. In a real app, multiple track elements offer language selection for global audiences and meet accessibility legal requirements.',
    code: `<video controls width="640">
  <source src="/webinar.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/webinar-en.vtt"
    srclang="en"
    label="English"
    default
  />
  <track
    kind="subtitles"
    src="/webinar-es.vtt"
    srclang="es"
    label="Español"
  />
</video>`,
  },
]
