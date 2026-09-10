import { BookPage, MenuItem, TOCItem } from '../types/menu';

const createItem = (
  id: string,
  name: string,
  price: number,
  description?: string,
  options?: Partial<MenuItem>
): MenuItem => ({
  id,
  name,
  price,
  description,
  category: '',
  available: true,
  ...options,
});

export const menuPages: BookPage[] = [
  // Page 1: Cover
  {
    id: 'cover',
    type: 'cover',
    title: 'Executive Hideaway',
    subtitle: 'Resort & Spa',
    section: 'Dining Menu',
    overlay: 'dark',
    backgroundImage: '/images/menu/cover.jpg',
  },

  // Page 2: Breakfast
  {
    id: 'breakfast-1',
    type: 'menu-dense',
    title: 'Breakfast',
    subtitle: 'Served daily 7:00 — 11:00',
    section: 'breakfast',
    content: {
      id: 'breakfast',
      title: 'Breakfast',
      items: [
        createItem('bf-1', 'Hideaway Breakfast', 1200, 'Eggs any style, bacon, sausage, baked beans, grilled tomato, toast, fresh juice, tea or coffee'),
        createItem('bf-2', 'Full English Breakfast', 1100, 'Two eggs, bacon, sausage, mushrooms, baked beans, grilled tomato, toast'),
        createItem('bf-3', 'Kenyan Breakfast', 950, 'Two eggs, beef samosa, ndengu, chapati, tea or coffee'),
        createItem('bf-4', 'Healthy Start', 850, 'Greek yogurt, granola, seasonal fresh fruit, honey drizzle'),
        createItem('bf-5', 'Pancakes', 750, 'Three fluffy pancakes with maple syrup and butter', { featured: true }),
        createItem('bf-6', 'French Toast', 800, 'Brioche French toast with cinnamon and honey'),
      ],
    },
  },

  // Page 3: Breakfast — Eggs & Bakery
  {
    id: 'breakfast-2',
    type: 'menu-dense',
    title: 'Eggs & Bakery',
    subtitle: '',
    section: 'breakfast',
    content: {
      id: 'eggs-bakery',
      title: 'Eggs & Bakery',
      items: [
        createItem('egg-1', 'Fried Eggs', 400, 'Two eggs, any style'),
        createItem('egg-2', 'Scrambled Eggs', 450, 'Creamy scrambled eggs on toast'),
        createItem('egg-3', 'Eggs Benedict', 950, 'Poached eggs, hollandaise, ham on English muffin'),
        createItem('egg-4', 'Omelette — Plain', 500, 'Three-egg omelette'),
        createItem('egg-5', 'Omelette — Cheese & Ham', 700, 'Three-egg omelette with cheddar and ham'),
        createItem('egg-6', 'Omelette — Vegetable', 650, 'Three-egg omelette with peppers, onions, tomatoes'),
        createItem('bak-1', 'Croissant', 350, 'Butter croissant, freshly baked'),
        createItem('bak-2', 'Muffin', 300, 'Blueberry or chocolate chip'),
        createItem('bak-3', 'Toast', 250, 'White or brown, with butter and preserves'),
      ],
    },
  },

  // Page 4: Starters
  {
    id: 'starters',
    type: 'menu-dense',
    title: 'Starters',
    subtitle: 'Begin your experience',
    section: 'starters',
    content: {
      id: 'starters',
      title: 'Starters',
      items: [
        createItem('st-1', 'Soup of the Day', 550, "Chef's daily creation, served with warm bread"),
        createItem('st-2', 'Beef Samosas', 650, 'Crispy pastry filled with spiced minced beef, tamarind chutney', { featured: true }),
        createItem('st-3', 'Chicken Wings', 750, 'Crispy wings, choice of buffalo, BBQ, or peri-peri'),
        createItem('st-4', 'Calamari', 950, 'Lightly battered squid rings, lemon aioli'),
        createItem('st-5', 'Bruschetta', 600, 'Grilled sourdough, tomato, basil, garlic, olive oil'),
        createItem('st-6', 'Hideaway Sampler', 1400, 'Samosa, wings, calamari, dipping sauces — serves two'),
      ],
    },
  },

  // Page 5: Salads
  {
    id: 'salads',
    type: 'two-column',
    title: 'Salads',
    subtitle: 'Fresh & light',
    section: 'salads',
    content: {
      id: 'salads',
      title: 'Salads',
      items: [
        createItem('sl-1', 'Garden Salad', 650, 'Mixed greens, cucumber, cherry tomato, red onion, house vinaigrette'),
        createItem('sl-2', 'Greek Salad', 800, 'Feta, olives, cucumber, tomato, red onion, oregano, olive oil'),
        createItem('sl-3', 'Chicken & Avocado Salad', 1100, 'Grilled chicken, avocado, mixed greens, lime dressing', { featured: true }),
        createItem('sl-4', 'Caesar Salad', 950, 'Romaine, parmesan, croutons, Caesar dressing. Add grilled chicken +400'),
      ],
    },
  },

  // Page 6: Kenyan Classics — Editorial
  {
    id: 'kenyan',
    type: 'editorial',
    title: 'Kenyan Classics',
    subtitle: 'Authentic flavours, timeless recipes',
    section: 'kenyan',
    backgroundImage: '/images/menu/kenyan-classics.jpg',
    overlay: 'dark',
    content: {
      id: 'kenyan-classics',
      title: 'Kenyan Classics',
      items: [
        createItem('kn-1', 'Beef Wet Fry', 1100, 'Tender beef slow-cooked in rich tomato and onion gravy', { featured: true }),
        createItem('kn-2', 'Chicken Wet Fry', 1050, 'Free-range chicken in aromatic tomato stew'),
        createItem('kn-3', 'Kuku wa Kupaka', 1200, 'Coconut-cream grilled chicken, Swahili spices'),
        createItem('kn-4', 'Beef Pilau', 950, 'Fragrant rice with spiced beef, served with kachumbari'),
        createItem('kn-5', 'Chicken Biryani', 1100, 'Aromatic basmati rice, tender chicken, raita'),
        createItem('kn-6', 'Mukimo & Beef Stew', 1050, 'Traditional mashed greens and potatoes with rich beef stew'),
        createItem('kn-7', 'Tilapia & Ugali', 1150, 'Whole fried tilapia, ugali, sukuma wiki, kachumbari'),
      ],
    },
  },

  // Page 7: From the Grill — Editorial
  {
    id: 'grill',
    type: 'editorial',
    title: 'From the Grill',
    subtitle: 'Prime cuts, open flame',
    section: 'grill',
    backgroundImage: '/images/menu/grill.jpg',
    overlay: 'dark',
    content: {
      id: 'grill',
      title: 'From the Grill',
      items: [
        createItem('gr-1', 'Beef Fillet', 2200, '250g premium fillet, grilled to order, pepper sauce', { featured: true }),
        createItem('gr-2', 'Sirloin', 1800, '300g sirloin steak, herb butter, grilled vegetables'),
        createItem('gr-3', 'Rib-Eye', 2000, '350g rib-eye, marbled, flame-grilled, red wine jus'),
        createItem('gr-4', 'Grilled Chicken Breast', 1200, 'Marinated chicken breast, lemon herb dressing'),
        createItem('gr-5', 'Lamb Chops', 2100, 'Four prime lamb chops, mint jus, roasted potatoes'),
      ],
    },
  },

  // Page 8: Chicken & Meat
  {
    id: 'chicken-meat',
    type: 'two-column',
    title: 'Chicken & Meat',
    subtitle: 'Hearty favourites',
    section: 'chicken-meat',
    content: {
      id: 'chicken-meat',
      title: 'Chicken & Meat',
      items: [
        createItem('cm-1', 'Chicken Schnitzel', 1200, 'Crispy breaded chicken breast, lemon wedge'),
        createItem('cm-2', 'Chicken Tikka Masala', 1300, 'Tandoori chicken in creamy tomato sauce, naan', { featured: true }),
        createItem('cm-3', 'Beef Stroganoff', 1400, 'Tender beef strips, mushroom cream sauce, tagliatelle'),
        createItem('cm-4', 'Slow-Cooked Beef Stew', 1200, 'Rich beef stew, root vegetables, mashed potatoes'),
        createItem('cm-5', 'Grilled Half Chicken', 1150, 'Peri-peri or lemon herb, served with fries or rice'),
      ],
    },
  },

  // Page 9: Fish & Seafood — Editorial
  {
    id: 'seafood',
    type: 'editorial',
    title: 'Fish & Seafood',
    subtitle: 'From the coast to your plate',
    section: 'seafood',
    backgroundImage: '/images/menu/seafood.jpg',
    overlay: 'dark',
    content: {
      id: 'seafood',
      title: 'Fish & Seafood',
      items: [
        createItem('sf-1', 'Whole Tilapia', 1400, 'Grilled or fried, Swahili spices, coconut rice', { featured: true }),
        createItem('sf-2', 'Tilapia Fillet', 1200, 'Pan-seared fillet, lemon butter sauce, seasonal vegetables'),
        createItem('sf-3', 'Fish & Chips', 1100, 'Beer-battered fish, hand-cut chips, tartare sauce'),
        createItem('sf-4', 'Prawns in Garlic Butter', 1800, 'Jumbo prawns, garlic butter, white wine, crusty bread'),
        createItem('sf-5', 'Fish Curry', 1300, 'Coconut fish curry, basmati rice, mango chutney'),
      ],
    },
  },

  // Page 10: Pasta & Pizza — Two Column
  {
    id: 'pasta-pizza',
    type: 'two-column',
    title: 'Pasta & Pizza',
    subtitle: 'Italian comfort',
    section: 'pasta-pizza',
    content: [
      {
        id: 'pasta',
        title: 'Pasta',
        items: [
          createItem('ps-1', 'Spaghetti Bolognese', 1100, 'Rich beef ragu, parmesan, fresh basil'),
          createItem('ps-2', 'Chicken Alfredo', 1200, 'Creamy parmesan sauce, grilled chicken, fettuccine', { featured: true }),
          createItem('ps-3', 'Prawn Aglio e Olio', 1400, 'Garlic, chili, olive oil, prawns, linguine'),
          createItem('ps-4', 'Vegetable Pasta', 950, 'Seasonal vegetables, tomato sauce, penne'),
        ],
      },
      {
        id: 'pizza',
        title: 'Pizza',
        items: [
          createItem('pz-1', 'Margherita', 900, 'Tomato, mozzarella, fresh basil'),
          createItem('pz-2', 'Chicken Tikka', 1200, 'Tandoori chicken, red onion, coriander, mozzarella'),
          createItem('pz-3', 'Beef & Mushroom', 1300, 'Ground beef, mushrooms, mozzarella, oregano'),
          createItem('pz-4', 'Vegetarian', 1000, 'Peppers, mushrooms, olives, onions, mozzarella'),
        ],
      },
    ],
  },

  // Page 11: Burgers & Sandwiches
  {
    id: 'burgers',
    type: 'two-column',
    title: 'Burgers & Sandwiches',
    subtitle: 'Handcrafted & stacked',
    section: 'burgers',
    content: [
      {
        id: 'burgers',
        title: 'Burgers',
        items: [
          createItem('bg-1', 'Hideaway Beef Burger', 1300, '200g beef patty, cheddar, caramelised onion, brioche bun, fries', { featured: true }),
          createItem('bg-2', 'Chicken Burger', 1150, 'Crispy chicken, coleslaw, pickles, brioche bun, fries'),
        ],
      },
      {
        id: 'sandwiches',
        title: 'Sandwiches & Wraps',
        items: [
          createItem('sw-1', 'Club Sandwich', 1100, 'Triple-decker, chicken, bacon, egg, lettuce, tomato, fries'),
          createItem('sw-2', 'Grilled Chicken Wrap', 950, 'Marinated chicken, lettuce, tomato, garlic sauce'),
          createItem('sw-3', 'Vegetable & Halloumi Wrap', 900, 'Grilled halloumi, roasted vegetables, hummus'),
        ],
      },
    ],
  },

  // Page 12: Sides
  {
    id: 'sides',
    type: 'menu-dense',
    title: 'Sides',
    subtitle: 'Perfect companions',
    section: 'sides',
    content: {
      id: 'sides',
      title: 'Sides',
      items: [
        createItem('sd-1', 'Ugali', 250, 'Traditional Kenyan staple'),
        createItem('sd-2', 'Chapati', 200, 'Freshly made, flaky flatbread'),
        createItem('sd-3', 'Steamed Rice', 300, 'Fragrant basmati'),
        createItem('sd-4', 'Pilau Rice', 400, 'Spiced aromatic rice'),
        createItem('sd-5', 'Fries', 350, 'Hand-cut, golden crispy'),
        createItem('sd-6', 'Masala Fries', 450, 'Spiced with Swahili masala'),
        createItem('sd-7', 'Mashed Potatoes', 400, 'Creamy butter mash'),
        createItem('sd-8', 'Sweet Potato Fries', 450, 'Crispy, lightly salted'),
        createItem('sd-9', 'Seasonal Vegetables', 400, 'Grilled seasonal selection'),
        createItem('sd-10', 'Sukuma Wiki', 350, 'Collard greens, lightly sautéed'),
        createItem('sd-11', 'Kachumbari', 300, 'Fresh tomato-onion relish'),
        createItem('sd-12', 'Avocado', 400, 'Ripe sliced avocado'),
      ],
    },
  },

  // Page 13: Desserts — Hero Dish
  {
    id: 'desserts',
    type: 'hero-dish',
    title: 'Desserts',
    subtitle: 'A sweet finish',
    section: 'desserts',
    backgroundImage: '/images/menu/desserts.jpg',
    overlay: 'dark',
    content: {
      id: 'desserts',
      title: 'Desserts',
      items: [
        createItem('ds-1', 'Chocolate Fondant', 950, 'Warm chocolate cake, molten centre, vanilla ice cream', { featured: true }),
        createItem('ds-2', 'Cheesecake', 850, 'New York style, berry compote'),
        createItem('ds-3', 'Malva Pudding', 800, 'South African classic, warm custard'),
        createItem('ds-4', 'Fruit Platter', 700, 'Seasonal fresh fruit selection'),
        createItem('ds-5', 'Ice Cream', 600, 'Three scoops, choice of vanilla, chocolate, strawberry'),
        createItem('ds-6', 'Hideaway Dessert Board', 1800, 'Selection of desserts, serves two'),
      ],
    },
  },

  // Page 14: Coffee & Tea
  {
    id: 'coffee-tea',
    type: 'menu-dense',
    title: 'Coffee & Tea',
    subtitle: 'Kenyan brews & beyond',
    section: 'beverages',
    content: {
      id: 'coffee-tea',
      title: 'Coffee & Tea',
      items: [
        createItem('cf-1', 'Espresso', 250, 'Double shot'),
        createItem('cf-2', 'Americano', 300, 'Espresso, hot water'),
        createItem('cf-3', 'Cappuccino', 350, 'Espresso, steamed milk, foam'),
        createItem('cf-4', 'Latte', 350, 'Espresso, steamed milk'),
        createItem('cf-5', 'Mocha', 400, 'Espresso, chocolate, steamed milk'),
        createItem('cf-6', 'Kenyan Tea', 250, 'Premium Kenyan black tea'),
        createItem('cf-7', 'Masala Chai', 300, 'Spiced milk tea'),
        createItem('cf-8', 'Green Tea', 300, 'Jasmine or plain'),
        createItem('cf-9', 'Herbal Infusion', 350, 'Chamomile, peppermint, or rooibos'),
      ],
    },
  },

  // Page 15: Fresh Juices & Mocktails
  {
    id: 'juices-mocktails',
    type: 'two-column',
    title: 'Fresh Juices & Mocktails',
    subtitle: 'Pressed & crafted',
    section: 'beverages',
    content: [
      {
        id: 'juices',
        title: 'Fresh Juices',
        items: [
          createItem('jc-1', 'Orange', 400, 'Freshly squeezed'),
          createItem('jc-2', 'Mango', 450, 'Ripe mango blend'),
          createItem('jc-3', 'Passion', 400, 'Tangy passion fruit'),
          createItem('jc-4', 'Watermelon', 400, 'Refreshing, chilled'),
          createItem('jc-5', 'Pineapple', 400, 'Sweet tropical'),
        ],
      },
      {
        id: 'mocktails',
        title: 'Signature Mocktails',
        items: [
          createItem('mk-1', 'Hideaway Sunrise', 650, 'Orange, grenadine, soda, fresh fruit', { featured: true }),
          createItem('mk-2', 'Tropical Breeze', 600, 'Pineapple, coconut, lime, mint'),
          createItem('mk-3', 'Berry Refresher', 600, 'Mixed berry, lime, soda, basil'),
          createItem('mk-4', 'Cucumber Cooler', 550, 'Cucumber, mint, lime, tonic'),
        ],
      },
    ],
  },

  // Page 16: Soft Drinks & Water
  {
    id: 'soft-drinks',
    type: 'menu-dense',
    title: 'Soft Drinks & Water',
    subtitle: '',
    section: 'beverages',
    content: {
      id: 'soft-drinks',
      title: 'Soft Drinks & Water',
      items: [
        createItem('sod-1', 'Coca-Cola', 250, 'Regular or Diet'),
        createItem('sod-2', 'Sprite', 250, ''),
        createItem('sod-3', 'Fanta', 250, 'Orange or Blackcurrant'),
        createItem('sod-4', 'Ginger Ale', 300, ''),
        createItem('sod-5', 'Tonic Water', 300, ''),
        createItem('sod-6', 'Soda Water', 250, ''),
        createItem('sod-7', 'Still Water', 250, '500ml'),
        createItem('sod-8', 'Sparkling Water', 300, '500ml'),
      ],
    },
  },

  // Page 17: Spa & Wellness — Experience
  {
    id: 'spa',
    type: 'experience',
    title: 'Spa & Wellness',
    subtitle: 'Restore. Rebalance. Renew.',
    section: 'spa',
    backgroundImage: '/images/menu/spa.jpg',
    overlay: 'dark',
    content: {
      id: 'spa',
      title: 'Spa & Wellness',
      items: [
        createItem('sp-1', 'Swedish Massage', 4500, '60 min — Full body relaxation, gentle to medium pressure', { featured: true }),
        createItem('sp-2', 'Deep Tissue Massage', 5500, '60 min — Targeted muscle relief, firm pressure'),
        createItem('sp-3', 'Aromatherapy', 5000, '60 min — Essential oils, customised blend'),
        createItem('sp-4', 'Hot Stone Massage', 6000, '75 min — Heated basalt stones, deep relaxation'),
        createItem('sp-5', 'Express Facial', 3500, '45 min — Cleanse, exfoliate, hydrate'),
        createItem('sp-6', 'Signature Facial', 5500, '75 min — Deep cleansing, mask, massage'),
        createItem('sp-7', 'Body Scrub', 4000, '45 min — Exfoliation, skin renewal'),
        createItem('sp-8', 'Couples Massage', 9000, '60 min — Side-by-side Swedish massage'),
      ],
    },
  },

  // Page 18: Barber & Grooming — Experience
  {
    id: 'grooming',
    type: 'experience',
    title: 'Barber & Grooming',
    subtitle: 'The Executive Standard',
    section: 'grooming',
    backgroundImage: '/images/menu/grooming.jpg',
    overlay: 'dark',
    content: {
      id: 'grooming',
      title: 'Barber & Grooming',
      items: [
        createItem('br-1', 'Executive Cut', 1500, 'Precision haircut, hot towel, style', { featured: true }),
        createItem('br-2', 'Beard & Detail', 800, 'Beard trim, shape, hot towel finish'),
        createItem('br-3', 'Executive Shave', 1200, 'Straight razor, hot towels, moisturise'),
        createItem('br-4', 'Cut & Beard', 2000, 'Full haircut and beard grooming'),
        createItem('br-5', "Kids' Cut", 800, 'Under 12, precision cut'),
      ],
    },
  },

  // Page 19: Contact / Reservations
  {
    id: 'contact',
    type: 'contact',
    title: 'Reservations',
    subtitle: 'We look forward to welcoming you',
    section: 'contact',
  },
];

export const tableOfContents: TOCItem[] = [
  { label: 'Breakfast', pageIndex: 1 },
  { label: 'Starters', pageIndex: 3 },
  { label: 'Salads', pageIndex: 4 },
  { label: 'Kenyan Classics', pageIndex: 5 },
  { label: 'From the Grill', pageIndex: 6 },
  { label: 'Chicken & Meat', pageIndex: 7 },
  { label: 'Fish & Seafood', pageIndex: 8 },
  { label: 'Pasta & Pizza', pageIndex: 9 },
  { label: 'Burgers & Sandwiches', pageIndex: 10 },
  { label: 'Sides', pageIndex: 11 },
  { label: 'Desserts', pageIndex: 12 },
  { label: 'Coffee & Tea', pageIndex: 13 },
  { label: 'Fresh Juices & Mocktails', pageIndex: 14 },
  { label: 'Soft Drinks & Water', pageIndex: 15 },
  { label: 'Spa & Wellness', pageIndex: 16 },
  { label: 'Barber & Grooming', pageIndex: 17 },
  { label: 'Reservations', pageIndex: 18 },
];
