'use client';

import { BookPage as BookPageType } from '../types/menu';
import { CoverPage } from './page-templates/CoverPage';
import { EditorialPage } from './page-templates/EditorialPage';
import { MenuDensePage } from './page-templates/MenuDensePage';
import { TwoColumnPage } from './page-templates/TwoColumnPage';
import { HeroDishPage } from './page-templates/HeroDishPage';
import { ExperiencePage } from './page-templates/ExperiencePage';
import { ContactPage } from './page-templates/ContactPage';

interface BookPageProps {
  page: BookPageType;
  isTurned: boolean;
  isVisible: boolean;
  isFlipping: boolean;
  zIndex: number;
}

export function BookPageComponent({
  page,
  isTurned,
  isVisible,
  isFlipping,
  zIndex
}: BookPageProps) {
  const renderContent = () => {
    switch (page.type) {
      case 'cover': return <CoverPage page={page} />;
      case 'editorial': return <EditorialPage page={page} />;
      case 'menu-dense': return <MenuDensePage page={page} />;
      case 'two-column': return <TwoColumnPage page={page} />;
      case 'hero-dish': return <HeroDishPage page={page} />;
      case 'experience': return <ExperiencePage page={page} />;
      case 'contact': return <ContactPage page={page} />;
      default: return <MenuDensePage page={page} />;
    }
  };

  return (
    <div
      className={`book-page-sheet absolute top-0 right-0 bottom-0 left-0 h-full
                  ${isFlipping ? 'pointer-events-none' : ''}`}
      style={{
        zIndex,
        transform: `rotateY(${isTurned ? -180 : 0}deg)`,
      }}
      aria-hidden={!isVisible}
      inert={!isVisible || undefined}
    >
      <div className="w-full h-full page-paper page-edge rounded-sm overflow-hidden shadow-page">
        {renderContent()}
      </div>
    </div>
  );
}
