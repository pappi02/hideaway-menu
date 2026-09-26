import type { Dish, Section } from '../types/menu';

/**
 * Height model for the paginator.
 *
 * These constants mirror the spacing and type sizes in app/styles/book.css and
 * rendered by components/menu/*. They are deliberately a *model* rather than a
 * DOM measurement: the page canvas is a fixed pixel size, so the model is
 * exact on every device, it runs during module evaluation (no layout pass, no
 * flash of wrongly-paginated content) and it works under static export.
 *
 * If you change a type size or margin in the stylesheet, change it here too.
 * `npm run check` fails when the two drift far enough to overflow a page, and
 * `useOverflowGuard` warns in the browser console during development.
 */

/** Vertical padding above + below a dish row. */
const ROW_PAD_Y = 18;

/** Line box of a dish name at 19px. */
const NAME_LINE_H = 23;

/** Line box of a description at 12.5px. */
const NOTE_LINE_H = 19;

/** Gap between the name line and the description. */
const NOTE_GAP = 4;

/** Mean advance width of a character, by role. Taken from the shipped fonts at
 *  their rendered sizes and rounded up, so the model never under-counts. */
const NAME_CHAR_W = 8.4; // Cormorant Garamond 600 @ 19px
const NOTE_CHAR_W = 5.95; // Inter 300 @ 12.5px

/** Space the price reserves at the end of a dish row. */
const PRICE_W = 78;

/** Minimum visible run of the dotted leader between name and price. */
const LEADER_MIN = 26;

/** Each tag glyph sits inline after the name. */
const TAG_W = 17;

/** Section heading: title line + rule + margins. */
const SECTION_HEAD_H = 45;

/** Extra height when a section heading carries a note. */
const SECTION_NOTE_H = 21;

/** Vertical gap between two sections in the same column. */
export const SECTION_GAP = 26;

/** The "continued" mark under a carried-over section heading. */
const CONTINUED_H = 15;

function lines(text: string, charWidth: number, available: number): number {
  if (available <= 0) return 1;
  return Math.max(1, Math.ceil((text.length * charWidth) / available));
}

export function dishHeight(dish: Dish, columnW: number): number {
  // The signature mark sits in the margin, not inline, so it costs no width.
  const inlineTags = dish.tags?.filter((tag) => tag !== 'signature').length ?? 0;
  const hasPrice = dish.price !== undefined || dish.priceNote !== undefined;
  const nameAvailable =
    columnW - (hasPrice ? PRICE_W + LEADER_MIN : 0) - inlineTags * TAG_W;
  const nameH = lines(dish.name, NAME_CHAR_W, nameAvailable) * NAME_LINE_H;

  const noteH = dish.description
    ? NOTE_GAP + lines(dish.description, NOTE_CHAR_W, columnW) * NOTE_LINE_H
    : 0;

  return ROW_PAD_Y + nameH + noteH;
}

/**
 * A continued fragment reprints the title with a "continued" mark but drops
 * the section note, which only belongs at the section's true start. The model
 * mirrors that exactly — see components/menu/SectionBlock.tsx.
 */
export function sectionHeadingHeight(section: Pick<Section, 'note'>, continued: boolean): number {
  if (continued) return SECTION_HEAD_H + CONTINUED_H;
  return SECTION_HEAD_H + (section.note ? SECTION_NOTE_H : 0);
}
