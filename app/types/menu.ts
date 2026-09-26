/** A dietary or preparation marker shown as a small glyph beside a dish. */
export type DishTag = 'vegetarian' | 'vegan' | 'spicy' | 'signature' | 'gluten-free' | 'contains-nuts';

export interface Dish {
  id: string;
  name: string;
  /** One line of menu copy. Kept short — the paginator budgets by line count. */
  description?: string;
  /** Price in KSh. Omitted for items priced on request or by weight. */
  price?: number;
  /** Shown in place of a price, e.g. "Market price" or "60 min". */
  priceNote?: string;
  tags?: DishTag[];
  /** Temporarily off the menu; still listed, struck through. */
  unavailable?: boolean;
}

export interface Section {
  id: string;
  title: string;
  /** Optional line of context under the section rule. */
  note?: string;
  dishes: Dish[];
}

/**
 * A chapter is the authored unit of the menu. The paginator turns each
 * chapter into however many physical pages its content needs.
 */
export interface Chapter {
  id: string;
  /** Appears as the running head on every page of the chapter. */
  title: string;
  /** Small-caps eyebrow above the title. */
  eyebrow: string;
  /** Sits under the chapter title on the divider page. */
  standfirst?: string;
  /** Full-bleed divider image introducing the chapter. */
  image?: string;
  /** Focal point for the divider image, as a CSS object-position. */
  imagePosition?: string;
  /** Pull quote or house note printed on the divider page. */
  note?: string;
  /** Number of text columns on this chapter's list pages. */
  columns?: 1 | 2;
  /** Light stock instead of the default dark stock. */
  stock?: 'onyx' | 'bone';
  sections: Section[];
  /** Footnote printed at the foot of the chapter's final page. */
  footnote?: string;
}

/* -------------------------------------------------------------------------
   Paginated output — produced by lib/paginate.ts, consumed by the renderer
   ------------------------------------------------------------------------- */

/** A section as it appears on one physical page, possibly a fragment. */
export interface PageSection {
  id: string;
  title: string;
  note?: string;
  dishes: Dish[];
  /** True when this section began on an earlier page. */
  continued: boolean;
  /** True when this section carries on to the next page. */
  carriesOn: boolean;
}

export type PageKind =
  | 'cover'
  | 'contents'
  | 'chapter'
  | 'list'
  | 'statement'
  | 'contact'
  | 'plate'
  | 'back-cover';

interface BasePage {
  id: string;
  kind: PageKind;
  stock: 'onyx' | 'bone';
  /** Index within the book, assigned by the paginator. */
  index: number;
  /** Printed folio number; null on covers and dividers. */
  folio: number | null;
}

export interface CoverPage extends BasePage {
  kind: 'cover';
  image?: string;
}

export interface ContentsPage extends BasePage {
  kind: 'contents';
  entries: ContentsEntry[];
}

export interface ChapterPage extends BasePage {
  kind: 'chapter';
  chapterId: string;
  title: string;
  eyebrow: string;
  standfirst?: string;
  note?: string;
  image?: string;
  imagePosition?: string;
}

export interface ListPage extends BasePage {
  kind: 'list';
  chapterId: string;
  title: string;
  eyebrow: string;
  columns: 1 | 2;
  /** Content of the left/only column. */
  columnA: PageSection[];
  /** Content of the right column; empty on one-column pages. */
  columnB: PageSection[];
  /** True when the chapter started on an earlier page. */
  continued: boolean;
  /**
   * Pixels to push the type block down, so a short page reads as a centred
   * block rather than as content that ran out. Zero on a full page.
   */
  bodyOffset: number;
  footnote?: string;
  /** Faint chapter image behind the type, for texture. */
  image?: string;
  imagePosition?: string;
}

export interface StatementPage extends BasePage {
  kind: 'statement';
  title: string;
  eyebrow: string;
  body: string;
  image?: string;
  imagePosition?: string;
  /** Prints the key to the dietary marks beneath the text. */
  legend?: boolean;
}

export interface ContactPage extends BasePage {
  kind: 'contact';
}

export interface BackCoverPage extends BasePage {
  kind: 'back-cover';
}

/** A full-bleed photographic plate. Doubles as the parity leaf: a book needs an
 * even page count, and a plate is a better way to spend one than a blank. */
export interface PlatePage extends BasePage {
  kind: 'plate';
  image: string;
  imagePosition?: string;
  caption?: string;
}

export type BookPage =
  | CoverPage
  | ContentsPage
  | ChapterPage
  | ListPage
  | StatementPage
  | ContactPage
  | PlatePage
  | BackCoverPage;

export interface ContentsEntry {
  label: string;
  /** Resolved by the paginator — never hand-written. */
  pageIndex: number;
  folio: number | null;
}

/** One physical leaf: a recto and the verso printed on its back. */
export interface Sheet {
  front: BookPage;
  back: BookPage | null;
}
