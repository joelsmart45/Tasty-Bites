import heroLarderImg from '../assets/images/hero_gourmet_larder_1794586660921.jpg';
import pantryOliveOilImg from '../assets/images/pantry_olive_oil_1794586660750.jpg';
import pastaRaguImg from '../assets/images/provisions_pasta_ragu_1794586661799.jpg';
import saffronHoneyImg from '../assets/images/pantry_saffron_honey_1794586662455.jpg';
import cateringBanquetImg from '../assets/images/catering_banquet_table_1794586661882.jpg';

export type ProductCategory = 'Chef Provisions' | 'Artisanal Pantry';
export type DietaryTag = 'Vegetarian' | 'Gluten-Free' | 'Organic' | 'Dairy-Free';

export interface IngredientDetail {
  name: string;
  origin: string;
}

export interface LarderProduct {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  servingSpec: string;
  prepTime: string;
  originLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  aspectClass: 'aspect-[4/3]' | 'aspect-[16/9]';
  dietary: DietaryTag[];
  availabilityNote: string;
  heatingNotes: string;
  ingredients: IngredientDetail[];
  featuredInGrid: boolean;
}

export interface CateringTier {
  id: string;
  name: string;
  subtitle: string;
  guestRange: string;
  pricePerGuest: number;
  isSignature?: boolean;
  serviceNotes: string;
  courses: string[];
}

export interface DeliverySlot {
  id: string;
  dayShort: string;
  dateLabel: string;
  monthLabel: string;
  windowLabel: string;
  available: boolean;
}

export interface ProvenanceRow {
  ingredient: string;
  producer: string;
  region: string;
  harvestSpec: string;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
}

export const HERO_IMAGE = {
  src: heroLarderImg,
  alt: 'Sunlit Maison Larder table featuring terracotta-braised beef ragu, sliced country sourdough, ceramic olive oil cruet, and preserved pantry jars.',
};

export const CATERING_HERO_IMAGE = {
  src: cateringBanquetImg,
  alt: 'Private dining long oak table dressed with oatmeal linen runner, roasted heirloom root vegetables, herb-crusted sea bass, fig tart, and beeswax candles.',
};

export const LARDER_PRODUCTS: LarderProduct[] = [
  {
    id: 'chanterelle-pappardelle',
    title: 'Wild Chanterelle & Parmigiano Pappardelle',
    category: 'Chef Provisions',
    price: 28,
    servingSpec: 'Serves 2 · 540g',
    prepTime: 'Ready in 8 min',
    originLabel: 'Emilia-Style Egg Ribbon',
    description:
      'Bronze-die egg pappardelle folded with foraged golden chanterelles, roasted shallot jus, cultured Normandy butter, and 36-month Parmigiano-Reggiano.',
    image: pastaRaguImg,
    imageAlt: 'Handmade pappardelle pasta tossed with golden chanterelle mushrooms and shaved aged parmigiano in a matte stoneware bowl.',
    aspectClass: 'aspect-[4/3]',
    dietary: ['Vegetarian'],
    availabilityNote: 'Chilled Weekly Batch',
    heatingNotes:
      'Simmer sauce gently in a wide skillet with 3 tbsp water for 4 minutes. Boil fresh ribbons 3 minutes, then toss together off the flame with reserved cooking water.',
    ingredients: [
      { name: 'Pasture-Raised Egg Pappardelle', origin: 'Stone-Milled Semolina · Sonoma' },
      { name: 'Golden Chanterelle Mushrooms', origin: 'Foraged Woodland · Oregon Coast' },
      { name: '36-Month Parmigiano-Reggiano', origin: 'Single Dairy · Modena, Italy' },
      { name: 'Cultured Sea-Salt Butter', origin: 'Grass-Fed Creamery · Marin' },
    ],
    featuredInGrid: true,
  },
  {
    id: 'valle-de-oro-olive-oil',
    title: 'Valle de Oro Single-Estate Olive Oil',
    category: 'Artisanal Pantry',
    price: 38,
    servingSpec: '750ml · Amber Glass',
    prepTime: 'Cold-Pressed',
    originLabel: 'Andalucía Early Harvest',
    description:
      'Unfiltered first-press Picual olive oil bottled within four hours of October harvest. Peppery finish with bright notes of green tomato leaf and crushed almond.',
    image: pantryOliveOilImg,
    imageAlt: 'Amber apothecary bottle of cold-pressed single-estate extra virgin olive oil beside olive branches and flaky sea salt on linen.',
    aspectClass: 'aspect-[4/3]',
    dietary: ['Organic', 'Gluten-Free', 'Dairy-Free'],
    availabilityNote: '2026 Harvest Bottling',
    heatingNotes:
      'Reserve for finishing roasted vegetables, warm sourdough dipping, grilled sea bass, and dressed seasonal bitter greens.',
    ingredients: [
      { name: 'Early-Harvest Picual Olives', origin: 'Dry-Farmed Grove · Andalucía' },
      { name: 'Cold Mechanical Extraction', origin: '21°C Mill Press · 0.14% Acidity' },
      { name: 'Unfiltered Polyphenol Reserve', origin: 'Nitrogen-Sealed Amber Apothecary Glass' },
    ],
    featuredInGrid: true,
  },
  {
    id: 'saffron-wildflower-honey',
    title: 'Wildflower & Saffron Infused Raw Honey',
    category: 'Artisanal Pantry',
    price: 24,
    servingSpec: '340g · Small Batch',
    prepTime: 'Cold-Infused',
    originLabel: 'La Mancha Threads',
    description:
      'Raw high-meadow wildflower honey steeped slowly for six weeks with whole crimson saffron stigmas. Floral warmth suited to aged cheeses and morning porridge.',
    image: saffronHoneyImg,
    imageAlt: 'Clear glass jar of golden wildflower and saffron infused raw honey with brass lid and wooden dipper next to dried saffron threads.',
    aspectClass: 'aspect-[4/3]',
    dietary: ['Gluten-Free', 'Dairy-Free', 'Vegetarian'],
    availabilityNote: 'Limited Apiary Lot',
    heatingNotes:
      'Spoon directly over warm ricotta, toasted sourdough, roasted figs, or whisk with sherry vinegar for an autumn vinaigrette.',
    ingredients: [
      { name: 'Unheated Meadow Wildflower Honey', origin: 'High-Altitude Hives · Sierra Foothills' },
      { name: 'Grade-A Coupe Saffron Stigmas', origin: 'Hand-Harvested · Castilla-La Mancha' },
    ],
    featuredInGrid: true,
  },
  {
    id: 'braised-short-rib-supper',
    title: 'Terracotta Braised Short Rib & Sourdough Supper',
    category: 'Chef Provisions',
    price: 46,
    servingSpec: 'Serves 2–3 · 1.1kg',
    prepTime: 'Ready in 15 min',
    originLabel: 'House Supper Provision',
    description:
      'Prime bone-in beef short ribs braised eighteen hours in dry Nebbiolo, rosemary, and charred root mirepoix, paired with a whole hearth-baked country sourdough boule.',
    image: heroLarderImg,
    imageAlt: 'Terracotta casserole of slow-braised short rib ragu topped with fresh rosemary alongside sliced country sourdough on linen.',
    aspectClass: 'aspect-[16/9]',
    dietary: ['Dairy-Free'],
    availabilityNote: 'Friday & Weekend Table',
    heatingNotes:
      'Warm covered in a 175°C (350°F) oven for 15 minutes until bubbling at the edges; refresh the sourdough loaf directly on the rack for 5 minutes.',
    ingredients: [
      { name: 'Pasture-Raised Beef Short Rib', origin: 'Heritage Herd · Mendocino' },
      { name: 'Langhe Nebbiolo Reduction', origin: 'Whole-Cluster Ferment · Piedmont' },
      { name: '36-Hour Levain Country Boule', origin: 'Stone-Hearth Bakery · In-House' },
      { name: 'Garden Rosemary & Flaky Salt', origin: 'Biodynamic Plot · Sonoma' },
    ],
    featuredInGrid: false,
  },
];

export const CATERING_TIERS: CateringTier[] = [
  {
    id: 'larder-table',
    name: 'The Larder Table',
    subtitle: 'Family-Style Harvest Supper',
    guestRange: '12 – 24 Guests',
    pricePerGuest: 85,
    serviceNotes: 'Delivered warm in glazed stoneware platters with linen menu cards and serving utensils.',
    courses: [
      'Warm country sourdough, whipped cultured butter & marinated olives',
      'Charred heirloom carrots with saffron-honey glaze & toasted hazelnuts',
      '18-hour Nebbiolo-braised short rib or herb-roasted pasture chicken',
      'Seasonal stone-fruit galette with crème fraîche',
    ],
  },
  {
    id: 'cellar-tasting',
    name: 'The Cellar Tasting',
    subtitle: 'Four-Course Plated Dining',
    guestRange: '16 – 40 Guests',
    pricePerGuest: 135,
    isSignature: true,
    serviceNotes: 'On-site culinary brigade of two chefs and lead server, complete with porcelain serviceware.',
    courses: [
      'Passed aperitif bites: whipped ricotta tartlets & cured trout roe',
      'Handmade wild chanterelle pappardelle with 36-month Parmigiano',
      'Herb-crusted wild sea bass with salsa verde & charred fennel',
      'Roasted fig & almond frangipane tart with espresso sabayon',
    ],
  },
  {
    id: 'estate-banquet',
    name: 'The Estate Banquet',
    subtitle: 'Full-Service Chef & Sommelier',
    guestRange: '30 – 90 Guests',
    pricePerGuest: 195,
    serviceNotes: 'Dedicated culinary director, sommelier wine pairings, beeswax table styling, and full teardown.',
    courses: [
      'Grand larder grazing table with estate cheeses & artisanal preserves',
      'Three seasonal family-style or plated courses tailored to venue',
      'Low-intervention European wine pairings selected per course',
      'Custom printed cotton-rag menus and late-evening digestif service',
    ],
  },
];

export const DELIVERY_SLOTS: DeliverySlot[] = [
  { id: 'thu-14', dayShort: 'Thu', dateLabel: '14', monthLabel: 'Nov', windowLabel: '11:00 – 14:00', available: true },
  { id: 'fri-15', dayShort: 'Fri', dateLabel: '15', monthLabel: 'Nov', windowLabel: '14:00 – 17:00', available: true },
  { id: 'sat-16', dayShort: 'Sat', dateLabel: '16', monthLabel: 'Nov', windowLabel: '10:00 – 13:00', available: true },
  { id: 'sun-17', dayShort: 'Sun', dateLabel: '17', monthLabel: 'Nov', windowLabel: '11:00 – 14:00', available: true },
  { id: 'wed-20', dayShort: 'Wed', dateLabel: '20', monthLabel: 'Nov', windowLabel: '14:00 – 17:00', available: true },
  { id: 'thu-21', dayShort: 'Thu', dateLabel: '21', monthLabel: 'Nov', windowLabel: '11:00 – 14:00', available: false },
];

export const PROVENANCE_LEDGER: ProvenanceRow[] = [
  {
    ingredient: 'Stone-Milled Khorasan & Semolina',
    producer: 'Full Belly Grain Mill',
    region: 'Capay Valley',
    harvestSpec: 'Milled within 14 days of pasta extrusion',
  },
  {
    ingredient: 'Early-Harvest Picual Olives',
    producer: 'Finca Valle de Oro',
    region: 'Jaén, Andalucía',
    harvestSpec: 'Cold-pressed at 21°C · 0.14% free oleic acidity',
  },
  {
    ingredient: 'Foraged Golden Chanterelles',
    producer: 'Cascade Mycology Guild',
    region: 'Coastal Oregon',
    harvestSpec: 'Hand-brushed & chilled 24 hours from forest floor',
  },
  {
    ingredient: 'Grade-A Coupe Saffron',
    producer: 'Cooperativa La Mancha',
    region: 'Castilla-La Mancha',
    harvestSpec: 'Sun-dried crimson stigmas · zero yellow styles',
  },
  {
    ingredient: 'Pasture-Raised Heritage Beef',
    producer: 'Alder Creek Ranch',
    region: 'Mendocino County',
    harvestSpec: '100% grass-fed, dry-aged 21 days before braising',
  },
];

export const TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 't1',
    quote:
      'We needed an intimate 28-person autumn dinner that felt like our own home rather than a catered ballroom. Maison Larder brought stoneware platters, beeswax tapers, and a chanterelle pasta course our guests still mention four months later.',
    author: 'claire-beaumont',
    role: 'Claire Beaumont · Creative Director, Atelier Nord',
    context: 'Cellar Tasting Menu · 28 Guests · November Harvest Dinner',
  },
  {
    id: 't2',
    quote:
      'Ordering the Friday short rib supper and pantry olive oil has replaced two nights of restaurant takeout every week. Everything arrives cold-packed in glass and terracotta—zero plastic clutter and fifteen minutes to the table.',
    author: 'henrik-solberg',
    role: 'Henrik Solberg · Principal Architect, Solberg & Partners',
    context: 'Weekly Provisions Member · 18 Consecutive Deliveries',
  },
];

export interface CateringFaq {
  question: string;
  answer: string;
}

export const CATERING_FAQS: CateringFaq[] = [
  {
    question: 'How far in advance should we reserve a private dining date?',
    answer:
      'For The Larder Table (12–24 guests), we recommend reserving at least 10 days ahead. For The Cellar Tasting or Estate Banquet, 3 to 6 weeks allows our culinary director to coordinate seasonal estate harvests and staffing.',
  },
  {
    question: 'Can menus accommodate mixed dietary preferences at one table?',
    answer:
      'Yes. Every menu can be tailored with vegetarian, gluten-free, dairy-free, or nut-free courses plated alongside the primary service without compromising flavor or presentation.',
  },
  {
    question: 'How does the stoneware & linen return process work?',
    answer:
      'For drop-off stoneware platters, our courier retrieves rinsed vessels and linen napkins the following morning between 09:00 and 12:00—no washing or boxing required.',
  },
  {
    question: 'Do you provide sommelier wine pairings and glassware?',
    answer:
      'Our Estate Banquet includes a dedicated sommelier and low-intervention European pairings. Glassware, porcelain plates, and beeswax tapers can also be added to any Cellar Tasting booking.',
  },
];

export interface DeliveryZoneInfo {
  zone: string;
  schedule: string;
  cutoff: string;
}

export const DELIVERY_ZONES: DeliveryZoneInfo[] = [
  {
    zone: 'Central City & Left Bank Districts',
    schedule: 'Thursday – Sunday · Morning & Afternoon Windows',
    cutoff: 'Order by 18:00 the evening prior',
  },
  {
    zone: 'North Hills & Vineyard Corridor',
    schedule: 'Friday & Saturday · Insulated Van Dispatch',
    cutoff: 'Order by Wednesday 20:00',
  },
  {
    zone: '42 Rue des Martyrs Larder Counter Pickup',
    schedule: 'Tuesday – Sunday · 10:00 – 19:00',
    cutoff: 'Same-day pickup available before 14:00',
  },
];

