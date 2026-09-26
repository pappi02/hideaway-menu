# Executive Hideaway Resort & Spa — Digital Menu

An interactive menu built as a book. It opens on a cover, turns page by page,
and never scrolls: every page is a fixed-size leaf and the content is
paginated to fit it, the way a printed menu is.

```bash
npm install
npm run dev     # http://localhost:5000
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 5000 |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serves the production build on port 5000 |
| `npm run check` | Runs the paginator over both editions and fails if any page overflows |
| `npm run fonts` | Re-downloads the self-hosted typefaces into `app/fonts/` |
| `npm run images` | Resizes `public/images/menu/` down to what the book actually draws |

Run `npm run check` after any content change. It prints the resulting book —
page count, which sections land where, and how full each page is.

## How the book works

Three ideas hold the whole thing up.

**1. The page is a fixed canvas.** Every page is an exact number of design
pixels (`app/lib/metrics.ts`) and is scaled to the viewport with a single CSS
transform. There are two editions of the same book, because one canvas cannot
serve both cases: a laptop shows a 720 × 1000 spread, a phone gets a 480 × 980
page that fills its screen. Scaling the wide page down to phone width would
leave the type at about 10px — fine in a screenshot, useless across a dim
table — so the phone edition is reset rather than photographically reduced,
exactly as a pocket edition is. `npm run check` prints both.

**2. Because the canvas is fixed, content can be paginated ahead of time.**
`app/lib/measure.ts` holds a height model that mirrors the CSS, and
`app/lib/paginate.ts` uses it to flow each chapter into columns that fit.
Nothing is ever clipped, truncated or hidden behind a scrollbar. It also keeps
the usual print conventions:

- a section too long for one page continues on the next with its heading
  reprinted and marked *continued*;
- a heading is never stranded at the foot of a column, nor left there with a
  single item under it;
- columns and pages within a chapter are balanced by bisection, so a chapter
  needing 1.2 pages reads as two even pages rather than one crammed page
  followed by a nearly empty one;
- a page with a lot of slack has its type block optically centred instead of
  hanging from the running head.

**3. A leaf carries two pages.** `data/book.ts` pairs pages into physical
leaves: leaf *k* has page *2k* on its front and page *2k+1* on its back.
Turning it rotates −180° about the spine, which swings the front page to the
left of the gutter and brings the back page up facing the reader. On screens
under 1024px the book shows one page at a time instead of a spread, and the
reading position is preserved across that switch.

## Editing the menu

Everything a manager needs to change lives in two files.

**`app/data/menu.ts`** — the menu itself, authored as chapters. Change a price,
add a dish, reword a description. Nothing here refers to page numbers; the
paginator works those out. Adding six dishes to a chapter simply gives that
chapter another page, and the contents page renumbers itself.

```ts
{
  id: 'grill',
  eyebrow: 'Chapter Four',
  title: 'From the Grill',
  standfirst: 'Prime cuts over open flame',
  image: '/images/menu/grill.jpg',   // omit for a chapter with no divider page
  columns: 2,                        // 1 or 2 text columns on the list pages
  sections: [ ... ],
}
```

Dishes take optional `tags`: `signature`, `vegetarian`, `vegan`, `spicy`,
`gluten-free`, `contains-nuts`. A `signature` dish gets a brass lozenge in the
margin. Set `unavailable: true` to strike an item through without deleting it.

**`app/data/venue.ts`** — address, phone, email, opening hours, monogram. These
appear on the contents page, the contact page and the back cover.

After editing, run `npm run check`.

## Images

Chapter divider images live in `public/images/menu/` and are referenced from
`menu.ts`. Photography is deliberately confined to dividers and covers; the
listing pages carry only a faint wash of their chapter image, so the type is
never competing with a photograph.

All images pass through one warm, desaturated grade (`.chapter-image` in
`app/styles/book.css`) so that stock from different sources reads as one set.

`IMAGE_CREDITS.md` records the licence for every image currently shipped.
**These are placeholders.** Replacing them with the hotel's own photography is
the single biggest upgrade available to this menu — drop a file into
`public/images/menu/` under the same name and nothing else needs to change.

## Layout constants

If you change a type size or a margin in `app/styles/book.css`, change the
matching constant in `app/lib/measure.ts`. Lines in the stylesheet that the
model depends on are marked `/* (model) */`. In development,
`useOverflowGuard` compares the model against the real DOM and warns in the
console if they have drifted; `npm run check` catches it in CI.

## Accessibility

- Full keyboard navigation: arrows, space, PageUp/PageDown, Home, End.
- Pinch-zoom is **not** disabled (the previous version disabled it, failing
  WCAG 1.4.4).
- Pages not currently on screen are `inert` and hidden from assistive tech.
- The contents drawer traps focus while open and restores it on close.
- The open page is announced through a polite live region.
- `prefers-reduced-motion` replaces the page turn with an instant change.

## Deployment

Static export, no backend, no database, no runtime API calls. Fonts are
self-hosted, so the menu works on bad hotel wifi and stays working offline once
loaded.

```bash
npm run build     # writes out/
```

Deploy `out/` to any static host and point the table QR codes at it.

## Notes

- Prices are proposed demo content and require management approval.
- Prices display as plain numbers; the currency is stated on the contents page
  and in the allergen note, as is normal for a menu at this level.
