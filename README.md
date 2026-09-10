# Executive Hideaway Resort & Spa — Digital E-Menu

A premium interactive digital menu book for Executive Hideaway Resort & Spa, Nairobi.

## Quick Start

```bash
cd hideaway-menu
npm install
npm run dev
```

Open `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Static files output to `dist/` directory.

## Project Structure

```
app/
  components/          # Reusable UI components
    page-templates/   # Page layout templates
  data/
    menuData.ts       # All menu content — edit here
  hooks/              # Custom React hooks
  types/              # TypeScript interfaces
public/
  images/menu/        # Place menu images here
```

## Editing Content

### Change prices
Edit `app/data/menuData.ts` — find the dish and update the `price` value.

### Add a new page
1. Add a new entry to `menuPages` array in `app/data/menuData.ts`
2. Choose a `type`: `cover`, `editorial`, `menu-dense`, `two-column`, `hero-dish`, `experience`, `contact`
3. Update `tableOfContents` if needed

### Replace images
Place new images in `public/images/menu/` and update `backgroundImage` paths in `menuData.ts`.

## Page Types

| Type | Use For |
|------|---------|
| `cover` | Opening page |
| `editorial` | Full-bleed image + menu (Kenyan, Grill, Seafood) |
| `menu-dense` | Typography-focused lists (Breakfast, Sides, Coffee) |
| `two-column` | Split layouts (Pasta/Pizza, Burgers/Sandwiches) |
| `hero-dish` | Large image top, content bottom (Desserts) |
| `experience` | Atmospheric full-bleed (Spa, Grooming) |
| `contact` | Contact/reservation page |

## QR Deployment

The app is designed for static export. Deploy the `dist/` folder to any static host:

```
/menu           → general menu
/menu/table/12  → future table-specific routing (architecture ready)
```

## Accessibility

- Keyboard navigation (arrow keys)
- `prefers-reduced-motion` support
- Semantic HTML structure
- ARIA labels on controls
- Sufficient color contrast

## Notes

- All prices are **proposed demo content** requiring management approval
- No backend, database, or external APIs required
- Fully functional offline after initial load
