export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  featured?: boolean;
  available?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export type PageType =
  | 'cover'
  | 'editorial'
  | 'menu-dense'
  | 'two-column'
  | 'hero-dish'
  | 'experience'
  | 'contact';

export interface BookPage {
  id: string;
  type: PageType;
  title: string;
  subtitle?: string;
  section?: string;
  backgroundImage?: string;
  overlay?: 'dark' | 'light' | 'cream' | 'none';
  content?: MenuCategory | MenuCategory[];
}

export interface BookConfig {
  pages: BookPage[];
  totalPages: number;
}

export interface TOCItem {
  label: string;
  pageIndex: number;
}
