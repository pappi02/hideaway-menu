import type { Chapter, Dish } from '../types/menu';
import { assetPath } from '../lib/basePath';

/**
 * The menu, authored as chapters.
 *
 * Nothing here knows about page numbers. `data/book.ts` runs this through the
 * paginator, which decides how many physical pages each chapter needs and
 * resolves the contents listing. Add a dish and the book repaginates itself.
 *
 * Prices are in KSh and are proposed demo figures pending management approval.
 */

const d = (
  id: string,
  name: string,
  price: number | undefined,
  description?: string,
  extra?: Partial<Dish>,
): Dish => ({ id, name, price, description, ...extra });

export const chapters: Chapter[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'breakfast',
    eyebrow: 'Chapter One',
    title: 'The First Hour',
    standfirst: 'Breakfast, served from seven until eleven',
    image: assetPath('/images/menu/breakfast.jpg'),
    note: 'Eggs are free-range. Coffee is single-origin Kenyan, roasted in Nairobi and ground to order.',
    columns: 1,
    sections: [
      {
        id: 'breakfast-plates',
        title: 'The Plates',
        dishes: [
          d('bf-1', 'The Hideaway', 1200, 'Eggs any style, bacon, sausage, baked beans, grilled tomato, toast, juice and coffee', { tags: ['signature'] }),
          d('bf-2', 'Full English', 1100, 'Two eggs, bacon, sausage, field mushrooms, baked beans, grilled tomato, toast'),
          d('bf-3', 'Kenyan Breakfast', 950, 'Two eggs, beef samosa, ndengu, chapati, tea or coffee'),
          d('bf-4', 'The Lighter Start', 850, 'Greek yoghurt, toasted granola, seasonal fruit, wildflower honey', { tags: ['vegetarian'] }),
          d('bf-5', 'Buttermilk Pancakes', 750, 'Three, stacked, with maple syrup and salted butter', { tags: ['vegetarian'] }),
          d('bf-6', 'Brioche French Toast', 800, 'Thick-cut brioche, cinnamon, honey, orange zest', { tags: ['vegetarian'] }),
        ],
      },
      {
        id: 'breakfast-eggs',
        title: 'Eggs',
        note: 'Cooked to order. Add bacon, avocado or grilled tomato to any plate.',
        dishes: [
          d('egg-1', 'Fried', 400, 'Two eggs, any style, on sourdough', { tags: ['vegetarian'] }),
          d('egg-2', 'Scrambled', 450, 'Slow-folded with butter, on sourdough', { tags: ['vegetarian'] }),
          d('egg-3', 'Benedict', 950, 'Poached eggs, hand-whisked hollandaise, ham, English muffin'),
          d('egg-4', 'Omelette — Plain', 500, 'Three eggs, chives', { tags: ['vegetarian'] }),
          d('egg-5', 'Omelette — Cheese & Ham', 700, 'Three eggs, aged cheddar, smoked ham'),
          d('egg-6', 'Omelette — Garden', 650, 'Three eggs, peppers, onion, tomato', { tags: ['vegetarian'] }),
        ],
      },
      {
        id: 'breakfast-bakery',
        title: 'From the Bakery',
        note: 'Baked each morning on the premises.',
        dishes: [
          d('bak-1', 'Butter Croissant', 350, 'Laminated overnight, baked at dawn', { tags: ['vegetarian'] }),
          d('bak-2', 'Muffin', 300, 'Blueberry or dark chocolate', { tags: ['vegetarian'] }),
          d('bak-3', 'Toast & Preserves', 250, 'White or brown, cultured butter, house preserves', { tags: ['vegetarian'] }),
        ],
      },
    ],
    footnote: 'Served daily 07:00 — 11:00. Room service available throughout.',
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'to-begin',
    eyebrow: 'Chapter Two',
    title: 'To Begin',
    standfirst: 'Small plates and green things',
    image: assetPath('/images/menu/starters.jpg'),
    note: 'Best taken at the bar, with something cold, while the table is being set.',
    columns: 2,
    sections: [
      {
        id: 'starters',
        title: 'Small Plates',
        dishes: [
          d('st-1', 'Soup of the Day', 550, "The chef's daily pot, warm bread"),
          d('st-2', 'Beef Samosas', 650, 'Spiced minced beef, tamarind', { tags: ['signature', 'spicy'] }),
          d('st-3', 'Chicken Wings', 750, 'Buffalo, BBQ or peri-peri', { tags: ['spicy'] }),
          d('st-4', 'Calamari', 950, 'Lightly battered, lemon aioli'),
          d('st-5', 'Bruschetta', 600, 'Grilled sourdough, tomato, basil', { tags: ['vegetarian'] }),
          d('st-6', 'The Sampler', 1400, 'Samosa, wings, calamari, sauces. For two', { tags: ['signature'] }),
        ],
      },
      {
        id: 'salads',
        title: 'Salads',
        dishes: [
          d('sl-1', 'Garden', 650, 'Mixed leaves, cucumber, tomato, house vinaigrette', { tags: ['vegan'] }),
          d('sl-2', 'Greek', 800, 'Feta, olives, cucumber, oregano, olive oil', { tags: ['vegetarian'] }),
          d('sl-3', 'Chicken & Avocado', 1100, 'Grilled chicken, avocado, lime dressing', { tags: ['signature'] }),
          d('sl-4', 'Caesar', 950, 'Romaine, parmesan, croutons. Add chicken +400'),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'kenyan',
    eyebrow: 'Chapter Three',
    title: 'Kenyan Classics',
    standfirst: 'Recipes that did not need improving',
    image: assetPath('/images/menu/kenyan-classics.jpg'),
    note: 'Cooked the long way, in heavy pots, the way they are cooked at home.',
    columns: 1,
    sections: [
      {
        id: 'kenyan-mains',
        title: 'From the Pot',
        dishes: [
          d('kn-1', 'Beef Wet Fry', 1100, 'Slow-cooked in a rich tomato and onion gravy', { tags: ['signature'] }),
          d('kn-2', 'Chicken Wet Fry', 1050, 'Free-range chicken, aromatic tomato stew'),
          d('kn-3', 'Kuku wa Kupaka', 1200, 'Grilled chicken finished in coconut cream, Swahili spice', { tags: ['signature'] }),
          d('kn-4', 'Beef Pilau', 950, 'Fragrant spiced rice, tender beef, kachumbari'),
          d('kn-5', 'Chicken Biryani', 1100, 'Basmati layered with chicken and whole spice, raita'),
          d('kn-6', 'Mukimo & Beef Stew', 1050, 'Mashed greens, potato and maize with a deep beef stew'),
          d('kn-7', 'Tilapia & Ugali', 1150, 'Whole fried tilapia, ugali, sukuma wiki, kachumbari'),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'grill',
    eyebrow: 'Chapter Four',
    title: 'From the Grill',
    standfirst: 'Prime cuts over open flame',
    image: assetPath('/images/menu/grill.jpg'),
    note: 'All cuts are aged, seasoned simply and cooked over charcoal. Ask for it rare; the kitchen will thank you.',
    // Two columns keeps the cuts and the braises on one spread. At one column
    // the chapter runs to a second page that is barely a quarter full.
    columns: 2,
    sections: [
      {
        id: 'grill-cuts',
        title: 'The Cuts',
        note: 'Served with one accompaniment of your choosing.',
        dishes: [
          d('gr-1', 'Beef Fillet', 2200, '250g, grilled to order, green peppercorn sauce', { tags: ['signature'] }),
          d('gr-2', 'Sirloin', 1800, '300g, herb butter, charred vegetables'),
          d('gr-3', 'Rib-Eye', 2000, '350g, well marbled, red wine jus'),
          d('gr-4', 'Lamb Chops', 2100, 'Four chops, mint jus, roast potatoes'),
          d('gr-5', 'Chicken Breast', 1200, 'Marinated overnight, lemon and herb'),
        ],
      },
      {
        id: 'grill-poultry',
        title: 'Poultry & Braise',
        dishes: [
          d('cm-1', 'Chicken Schnitzel', 1200, 'Crisp crumb, lemon'),
          d('cm-2', 'Chicken Tikka Masala', 1300, 'Tandoori chicken, creamed tomato, naan', { tags: ['signature', 'spicy'] }),
          d('cm-3', 'Beef Stroganoff', 1400, 'Beef strips, mushroom cream, tagliatelle'),
          d('cm-4', 'Slow-Cooked Beef', 1200, 'Root vegetables, butter mash'),
          d('cm-5', 'Half Chicken', 1150, 'Peri-peri or lemon herb, fries or rice', { tags: ['spicy'] }),
        ],
      },
    ],
    footnote: 'Steaks are cooked to your preference. Please allow twenty minutes for well-done cuts.',
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'sea',
    eyebrow: 'Chapter Five',
    title: 'Sea & Coast',
    standfirst: 'Brought up from Mombasa',
    image: assetPath('/images/menu/seafood.jpg'),
    note: 'Fish arrives twice weekly from the coast. When it is gone, it is gone.',
    columns: 1,
    sections: [
      {
        id: 'seafood',
        title: 'From the Water',
        dishes: [
          d('sf-1', 'Whole Tilapia', 1400, 'Grilled or fried, Swahili spice, coconut rice', { tags: ['signature'] }),
          d('sf-2', 'Tilapia Fillet', 1200, 'Pan-seared, lemon butter, seasonal greens'),
          d('sf-3', 'Fish & Chips', 1100, 'Beer-battered, hand-cut chips, tartare'),
          d('sf-4', 'Prawns in Garlic Butter', 1800, 'Jumbo prawns, white wine, crusty bread', { tags: ['signature'] }),
          d('sf-5', 'Coconut Fish Curry', 1300, 'Basmati, mango chutney', { tags: ['spicy'] }),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'counter',
    eyebrow: 'Chapter Six',
    title: 'The Counter',
    standfirst: 'Pasta, pizza and things in buns',
    image: assetPath('/images/menu/counter.jpg'),
    note: 'Dough is proved for forty-eight hours. Patties are ground in-house each morning.',
    columns: 2,
    sections: [
      {
        id: 'pasta',
        title: 'Pasta',
        dishes: [
          d('ps-1', 'Bolognese', 1100, 'Beef ragu, parmesan, basil'),
          d('ps-2', 'Chicken Alfredo', 1200, 'Parmesan cream, fettuccine', { tags: ['signature'] }),
          d('ps-3', 'Prawn Aglio e Olio', 1400, 'Garlic, chilli, linguine', { tags: ['spicy'] }),
          d('ps-4', 'Garden Penne', 950, 'Seasonal vegetables, tomato', { tags: ['vegetarian'] }),
        ],
      },
      {
        id: 'pizza',
        title: 'Pizza',
        dishes: [
          d('pz-1', 'Margherita', 900, 'Tomato, mozzarella, basil', { tags: ['vegetarian'] }),
          d('pz-2', 'Chicken Tikka', 1200, 'Tandoori chicken, red onion, coriander', { tags: ['spicy'] }),
          d('pz-3', 'Beef & Mushroom', 1300, 'Ground beef, mushroom, oregano'),
          d('pz-4', 'Garden', 1000, 'Peppers, mushroom, olive, onion', { tags: ['vegetarian'] }),
        ],
      },
      {
        id: 'burgers',
        title: 'Burgers',
        dishes: [
          d('bg-1', 'The Hideaway Burger', 1300, '200g patty, cheddar, onion jam, fries', { tags: ['signature'] }),
          d('bg-2', 'Buttermilk Chicken', 1150, 'Slaw, pickles, brioche, fries'),
        ],
      },
      {
        id: 'sandwiches',
        title: 'Sandwiches',
        dishes: [
          d('sw-1', 'The Club', 1100, 'Chicken, bacon, egg, fries'),
          d('sw-2', 'Chicken Wrap', 950, 'Marinated chicken, garlic sauce'),
          d('sw-3', 'Halloumi Wrap', 900, 'Roast vegetables, hummus', { tags: ['vegetarian'] }),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'sides',
    eyebrow: 'Chapter Seven',
    title: 'Accompaniments',
    standfirst: 'Everything else on the table',
    columns: 2,
    stock: 'bone',
    sections: [
      {
        id: 'sides-staples',
        title: 'Staples',
        dishes: [
          d('sd-1', 'Ugali', 250, undefined, { tags: ['vegetarian'] }),
          d('sd-2', 'Chapati', 200, undefined, { tags: ['vegetarian'] }),
          d('sd-3', 'Steamed Rice', 300, undefined, { tags: ['vegan'] }),
          d('sd-4', 'Pilau Rice', 400, undefined, { tags: ['vegetarian'] }),
          d('sd-7', 'Butter Mash', 400, undefined, { tags: ['vegetarian'] }),
        ],
      },
      {
        id: 'sides-fried',
        title: 'From the Fryer',
        dishes: [
          d('sd-5', 'Hand-Cut Fries', 350, undefined, { tags: ['vegan'] }),
          d('sd-6', 'Masala Fries', 450, undefined, { tags: ['vegetarian', 'spicy'] }),
          d('sd-8', 'Sweet Potato Fries', 450, undefined, { tags: ['vegan'] }),
        ],
      },
      {
        id: 'sides-green',
        title: 'Green',
        dishes: [
          d('sd-9', 'Seasonal Vegetables', 400, undefined, { tags: ['vegan'] }),
          d('sd-10', 'Sukuma Wiki', 350, undefined, { tags: ['vegan'] }),
          d('sd-11', 'Kachumbari', 300, undefined, { tags: ['vegan'] }),
          d('sd-12', 'Avocado', 400, undefined, { tags: ['vegan'] }),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'desserts',
    eyebrow: 'Chapter Eight',
    title: 'To Finish',
    standfirst: 'For those with the room',
    image: assetPath('/images/menu/desserts.jpg'),
    note: 'Pastry is made in-house daily. The fondant takes fourteen minutes; order it with your main.',
    columns: 1,
    sections: [
      {
        id: 'desserts',
        title: 'Desserts',
        dishes: [
          d('ds-1', 'Chocolate Fondant', 950, 'Molten centre, vanilla ice cream. Allow fourteen minutes', { tags: ['signature', 'vegetarian'] }),
          d('ds-2', 'Cheesecake', 850, 'New York style, berry compote', { tags: ['vegetarian'] }),
          d('ds-3', 'Malva Pudding', 800, 'Warm custard', { tags: ['vegetarian'] }),
          d('ds-4', 'Fruit Platter', 700, 'Seasonal, chilled', { tags: ['vegan'] }),
          d('ds-5', 'Ice Cream', 600, 'Three scoops — vanilla, chocolate, strawberry', { tags: ['vegetarian'] }),
          d('ds-6', 'The Dessert Board', 1800, 'A selection, for two', { tags: ['signature', 'vegetarian'] }),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'bar',
    eyebrow: 'Chapter Nine',
    title: 'The Bar',
    standfirst: 'Coffee, tea and cold things',
    image: assetPath('/images/menu/bar.jpg'),
    note: 'Beans are Kenyan AA, roasted weekly. Juice is pressed to order, never from concentrate.',
    columns: 2,
    sections: [
      {
        id: 'coffee',
        title: 'Coffee',
        dishes: [
          d('cf-1', 'Espresso', 250, 'Double shot'),
          d('cf-2', 'Americano', 300),
          d('cf-3', 'Cappuccino', 350),
          d('cf-4', 'Latte', 350),
          d('cf-5', 'Mocha', 400),
        ],
      },
      {
        id: 'tea',
        title: 'Tea',
        dishes: [
          d('cf-6', 'Kenyan Black', 250, 'Single estate'),
          d('cf-7', 'Masala Chai', 300, 'Spiced, with milk'),
          d('cf-8', 'Green', 300, 'Jasmine or plain'),
          d('cf-9', 'Herbal Infusion', 350, 'Chamomile, peppermint or rooibos'),
        ],
      },
      {
        id: 'juices',
        title: 'Pressed Juice',
        dishes: [
          d('jc-1', 'Orange', 400),
          d('jc-2', 'Mango', 450),
          d('jc-3', 'Passion', 400),
          d('jc-4', 'Watermelon', 400),
          d('jc-5', 'Pineapple', 400),
        ],
      },
      {
        id: 'mocktails',
        title: 'Mocktails',
        dishes: [
          d('mk-1', 'Hideaway Sunrise', 650, 'Orange, grenadine, soda', { tags: ['signature'] }),
          d('mk-2', 'Tropical Breeze', 600, 'Pineapple, coconut, lime, mint'),
          d('mk-3', 'Berry Refresher', 600, 'Berry, lime, basil'),
          d('mk-4', 'Cucumber Cooler', 550, 'Cucumber, mint, tonic'),
        ],
      },
      {
        id: 'soft',
        title: 'Soft & Water',
        dishes: [
          d('sod-1', 'Coca-Cola', 250, 'Regular or Diet'),
          d('sod-2', 'Sprite', 250),
          d('sod-3', 'Fanta', 250, 'Orange or blackcurrant'),
          d('sod-4', 'Ginger Ale', 300),
          d('sod-5', 'Tonic Water', 300),
          d('sod-6', 'Soda Water', 250),
          d('sod-7', 'Still Water', 250, '500ml'),
          d('sod-8', 'Sparkling Water', 300, '500ml'),
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'spa',
    eyebrow: 'Chapter Ten',
    title: 'The Spa',
    standfirst: 'Restore. Rebalance. Renew.',
    image: assetPath('/images/menu/spa.jpg'),
    note: 'Treatments are by appointment. Arrive fifteen minutes early; the steam room is yours beforehand.',
    columns: 1,
    sections: [
      {
        id: 'massage',
        title: 'Massage',
        dishes: [
          d('sp-1', 'Swedish', 4500, 'Sixty minutes. Full body, gentle to medium pressure', { tags: ['signature'] }),
          d('sp-2', 'Deep Tissue', 5500, 'Sixty minutes. Targeted muscle relief, firm pressure'),
          d('sp-3', 'Aromatherapy', 5000, 'Sixty minutes. Essential oils blended to your preference'),
          d('sp-4', 'Hot Stone', 6000, 'Seventy-five minutes. Heated basalt, deep relaxation', { tags: ['signature'] }),
          d('sp-8', 'Side by Side', 9000, 'Sixty minutes. Two therapists, one room'),
        ],
      },
      {
        id: 'skin',
        title: 'Skin & Body',
        dishes: [
          d('sp-5', 'Express Facial', 3500, 'Forty-five minutes. Cleanse, exfoliate, hydrate'),
          d('sp-6', 'Signature Facial', 5500, 'Seventy-five minutes. Deep cleanse, mask, massage'),
          d('sp-7', 'Body Scrub', 4000, 'Forty-five minutes. Full exfoliation and renewal'),
        ],
      },
    ],
    footnote: 'Appointments 09:00 — 20:00. Twenty-four hours notice for cancellation.',
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'barber',
    eyebrow: 'Chapter Eleven',
    title: 'The Barber',
    standfirst: 'The executive standard',
    image: assetPath('/images/menu/grooming.jpg'),
    note: 'Hot towels, a straight razor and an unhurried chair. Walk in, or reserve the chair.',
    columns: 1,
    sections: [
      {
        id: 'grooming',
        title: 'The Chair',
        dishes: [
          d('br-1', 'Executive Cut', 1500, 'Precision cut, hot towel, finish and style', { tags: ['signature'] }),
          d('br-3', 'Straight Razor Shave', 1200, 'Hot towels, badger brush, cold finish', { tags: ['signature'] }),
          d('br-2', 'Beard & Detail', 800, 'Trim, shape, hot towel'),
          d('br-4', 'Cut & Beard', 2000, 'The full service'),
          d('br-5', "The Young Gentleman", 800, 'Under twelve'),
        ],
      },
    ],
  },
];
