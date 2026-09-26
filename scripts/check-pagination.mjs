/**
 * Fails if any page's modelled content is taller than the page it sits on.
 *
 * The menu has no overflow scrollers by design, so content that does not fit
 * would be silently clipped rather than merely awkward. This runs the real
 * paginator over the real menu data for both editions and asserts every column
 * fits, then prints the resulting books — so a content change's effect on page
 * count shows up in a diff rather than at a table.
 *
 * Run with `npm run check`.
 */
import { singleBook, spreadBook } from '../app/data/book.ts';
import { columnHeight } from '../app/lib/paginate.ts';
import { contentHeight } from '../app/lib/metrics.ts';

let failures = 0;

function report(book) {
  const budget = contentHeight(book.metrics);
  console.log(
    `\n  ${book.metrics.id} edition — ${book.pages.length} pages, ` +
      `${book.metrics.pageW}x${book.metrics.pageH}, ${budget}px of column\n`,
  );

  for (const page of book.pages) {
    const folio = page.folio !== null ? String(page.folio).padStart(3, ' ') : '  ·';

    if (page.kind !== 'list') {
      console.log(`  ${folio}  ${page.kind}`);
      continue;
    }

    const a = columnHeight(page.columnA, book.metrics, page.columns);
    const b = columnHeight(page.columnB, book.metrics, page.columns);
    const worst = Math.max(a, b);
    const over = worst > budget;
    if (over) failures += 1;

    const balance =
      page.columns === 2 ? `  ${Math.round((a / budget) * 100)}/${Math.round((b / budget) * 100)}` : '';

    const titles = [...page.columnA, ...page.columnB]
      .map((s) => s.title + (s.continued ? ' (cont.)' : ''))
      .join(', ');

    console.log(
      `  ${folio}  ${page.title.padEnd(18)} ${String(Math.round((worst / budget) * 100)).padStart(3)}%${balance.padEnd(9)}` +
        `${over ? ' OVERFLOW ' : ' '} ${titles}`,
    );
  }
}

report(spreadBook);
report(singleBook);

if (failures > 0) {
  console.error(`\n  ${failures} column(s) overflow. Adjust lib/measure.ts or shorten the copy.\n`);
  process.exit(1);
}

console.log('\n  Every page fits in both editions.\n');
