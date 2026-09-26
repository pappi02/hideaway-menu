'use client';

import type { BookPage } from '../types/menu';
import { BackCoverPage, PlateLeaf } from './pages/BackCoverPage';
import { ChapterPage } from './pages/ChapterPage';
import { ContactPage } from './pages/ContactPage';
import { ContentsPage } from './pages/ContentsPage';
import { CoverPage } from './pages/CoverPage';
import { ListPage } from './pages/ListPage';
import { StatementPage } from './pages/StatementPage';

interface Props {
  page: BookPage;
  onNavigate: (pageIndex: number) => void;
}

export function PageRenderer({ page, onNavigate }: Props) {
  switch (page.kind) {
    case 'cover':
      return <CoverPage page={page} />;
    case 'contents':
      return <ContentsPage page={page} onNavigate={onNavigate} />;
    case 'chapter':
      return <ChapterPage page={page} />;
    case 'list':
      return <ListPage page={page} />;
    case 'statement':
      return <StatementPage page={page} />;
    case 'contact':
      return <ContactPage page={page} />;
    case 'plate':
      return <PlateLeaf page={page} />;
    case 'back-cover':
      return <BackCoverPage page={page} />;
  }
}
