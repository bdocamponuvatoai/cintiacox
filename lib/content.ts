// Every fact on the site comes from this file. Sources are listed in docs/sources.md.
// Do not add claims (awards, sales volume, years, ratings) that are not in the sources.

export const advisor = {
  name: 'Cintia Cox',
  role: 'Real Estate Advisor',
  brokerage: 'Compass',
  phone: '561.465.6446',
  tel: '+15614656446',
  email: 'cintia.cox@compass.com',
  profile: 'https://www.compass.com/agents/cintia-cox/',
  languages: ['English', 'Español', 'Português'],
};

export const testimonial = {
  quote:
    'Cintia took full charge, dotted every I and crossed every T, and the entire transaction was painless with zero issues.',
  attribution: 'Client testimonial published on Compass',
  source: advisor.profile,
};

export type Area = {
  slug: string;
  name: string;
  tag: string;
  image: string;
  intro: string;
  details: string;
  highlights: string[];
  source: string;
  credit: string;
};

export const areas: Area[] = [
  {
    slug: 'boca-raton',
    name: 'Boca Raton',
    tag: 'Mizner Park, downtown and the Atlantic beaches',
    image: 'boca-raton',
    intro: 'Beaches, dining, shopping and the arts, close together.',
    details:
      'Discover a coastal city where beaches, dining, shopping, and the arts are part of the everyday landscape. Start with the rhythm you want, then explore the homes and neighborhoods that bring it closer.',
    highlights: ['Mizner Park & downtown', 'Atlantic beaches', 'A range of condominium and single-family settings'],
    source: 'https://www.thepalmbeaches.com/explore-cities/boca-raton',
    credit: 'Photo: Discover The Palm Beaches',
  },
  {
    slug: 'delray-beach',
    name: 'Delray Beach',
    tag: 'Atlantic Avenue, Pineapple Grove and the beach',
    image: 'delray-beach',
    intro: 'Restaurants, galleries and the beach, around Atlantic Avenue.',
    details:
      'Delray Beach brings restaurants, galleries, and coastal outdoor spaces into the conversation. Explore the downtown area, Pineapple Grove, and the broader city with your daily routines in mind.',
    highlights: ['Atlantic Avenue', 'Pineapple Grove Arts District', 'Delray Municipal Beach'],
    source: 'https://www.thepalmbeaches.com/explore-cities/delray-beach',
    credit: 'Photo: Discover The Palm Beaches',
  },
  {
    slug: 'highland-beach',
    name: 'Highland Beach',
    tag: 'Oceanfront and coastal condominium settings',
    image: 'highland-beach',
    intro: 'A coastal town for oceanfront and condominium searches.',
    details:
      'For a search focused on oceanfront or coastal condominium living, Highland Beach is a place to explore. Compare each building, its setting, and its ownership details with your priorities.',
    highlights: ['Coastal condominium settings', 'Oceanfront possibilities', 'Building-by-building guidance'],
    source: 'https://highlandbeach.us/',
    credit: 'Photo: past-property record, Compass',
  },
  {
    slug: 'palm-beach',
    name: 'Palm Beach',
    tag: 'Worth Avenue, historic architecture, ocean and lagoon',
    image: 'palm-beach',
    intro: 'Between the Atlantic Ocean and Lake Worth Lagoon.',
    details:
      'Palm Beach sits between the Atlantic Ocean and Lake Worth Lagoon. Its architecture, cultural destinations, and coastal setting create a distinct starting point for a property search.',
    highlights: ['Worth Avenue', 'Historic architecture & cultural destinations', 'Atlantic and lagoon settings'],
    source: 'https://www.thepalmbeaches.com/explore-cities/palm-beach',
    credit: 'Photo: Discover The Palm Beaches',
  },
];

export type Residence = {
  slug: string;
  address: string;
  city: string;
  image: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Condominium';
  source: string;
  description: string;
};

export const residences: Residence[] = [
  {
    slug: 'fort-lauderdale-waterfront',
    address: '2700 NE 18th Street',
    city: 'Fort Lauderdale',
    image: 'fort-lauderdale-home',
    price: 4400000,
    beds: 5,
    baths: 6,
    sqft: 4380,
    type: 'House',
    source:
      'https://www.compass.com/homedetails/2700-NE-18th-St-Fort-Lauderdale-FL-33305/1988093577052704049_lid/',
    description:
      'A Fort Lauderdale residence included among Cintia’s past transactions on Compass. Explore the property record as a starting point for a conversation about your own search.',
  },
  {
    slug: 'marbella-boca-raton',
    address: '250 S Ocean Boulevard, LPHG',
    city: 'Boca Raton',
    image: 'marbella',
    price: 1700000,
    beds: 2,
    baths: 2,
    sqft: 1526,
    type: 'Condominium',
    source:
      'https://www.compass.com/homedetails/250-S-Ocean-Blvd-Unit-LPHG-Boca-Raton-FL-33432/962400053117966433_lid/',
    description:
      'A past Boca Raton condominium transaction featured on Cintia’s Compass profile. Tell Cintia which elements of coastal condominium living matter to you.',
  },
  {
    slug: 'carlton-penthouse',
    address: '901 E Camino Real, PH1D',
    city: 'Boca Raton',
    image: 'carlton',
    price: 1600000,
    beds: 3,
    baths: 3,
    sqft: 2430,
    type: 'Condominium',
    source:
      'https://www.compass.com/homedetails/901-E-Camino-Real-Unit-PH1D-Boca-Raton-FL-33432/781777364305630937_lid/',
    description:
      'A past transaction at The Carlton, with a condominium setting overlooking Boca Raton’s waterways. The linked property record contains historical information, not a current offer.',
  },
  {
    slug: 'watermark-parkland',
    address: '12020 Watermark Way',
    city: 'Parkland',
    image: 'watermark',
    price: 1180000,
    beds: 5,
    baths: 5,
    sqft: 3971,
    type: 'House',
    source: advisor.profile,
    description:
      'A Parkland home featured in Cintia’s past transactions. A reference for exploring the space, layout, and setting that could suit your next chapter.',
  },
  {
    slug: 'highland-beach-coastal',
    address: '3450 S Ocean Boulevard, 801',
    city: 'Highland Beach',
    image: 'highland-beach',
    price: 940000,
    beds: 2,
    baths: 2,
    sqft: 1830,
    type: 'Condominium',
    source: advisor.profile,
    description:
      'A Highland Beach condominium included in Cintia’s transaction history. Use it to begin a discussion about building preferences and coastal living.',
  },
  {
    slug: 'delray-alabaster',
    address: '14647 Alabaster Avenue',
    city: 'Delray Beach',
    image: 'delray-home',
    price: 875000,
    beds: 4,
    baths: 3,
    sqft: 2305,
    type: 'House',
    source: advisor.profile,
    description:
      'A Delray Beach residence from Cintia’s published transaction history. Share what you like, and ask about current possibilities that fit your needs.',
  },
];

/** Native pixel sizes of the real photos in public/assets. Never render wider than these. */
export const photos: Record<string, { width: number; height: number }> = {
  'fort-lauderdale-home': { width: 1600, height: 1065 },
  marbella: { width: 1279, height: 853 },
  carlton: { width: 1800, height: 1200 },
  watermark: { width: 1086, height: 724 },
  'highland-beach': { width: 1800, height: 1193 },
  'delray-home': { width: 1619, height: 1312 },
  'boca-raton': { width: 1600, height: 810 },
  'delray-beach': { width: 1600, height: 810 },
  'palm-beach': { width: 1200, height: 900 },
  'cintia-cox': { width: 810, height: 810 },
};

export const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

/** "1,526 sq ft" with a non-breaking space between number and unit. */
export const area = (sqft: number) => `${sqft.toLocaleString('en-US')} sq ft`;

export const faqs: [string, string][] = [
  [
    'Can we start before I arrive in Florida?',
    'Yes. Start with a conversation about your timing, preferred areas, and what you want from a home. Ask Cintia about a search and viewing approach that works with your location and schedule.',
  ],
  [
    'Which languages does Cintia speak?',
    'Cintia’s Compass profile lists English, Spanish, and Portuguese. Choose your preferred language when you get in touch.',
  ],
  [
    'Are the properties here available to buy?',
    'The homes shown in the portfolio are past transactions published on Cintia’s Compass profile. They are not current listings. Ask for a current search or visit her Compass profile for the latest property information.',
  ],
  [
    'Can Cintia help me sell as well as buy?',
    'Her Compass profile lists both buyer and listing representation. Share your property, your goals, and your preferred timing to start a seller conversation.',
  ],
  [
    'Where should I start if I’m moving internationally?',
    'Begin with your location, timeline, and property priorities. Discuss the real estate search with Cintia, and ask qualified legal, tax, and financing professionals about questions specific to your circumstances.',
  ],
];

export type Guide = {
  slug: string;
  category: string;
  title: string;
  description: string;
  read: string;
  image?: { src: string; width: number; height: number; alt: string; credit: string };
};

export const guides: Guide[] = [
  {
    slug: 'a-considered-move',
    category: 'Relocation',
    title: 'A considered move starts with good questions.',
    description: 'A practical starting point for your Florida conversation.',
    read: '4 min read',
  },
  {
    slug: 'finding-your-place',
    category: 'Local perspective',
    title: 'Find the place that fits your everyday.',
    description: 'Look beyond an address. Think about how you want to live.',
    read: '3 min read',
    image: {
      src: 'boca-raton',
      width: 1600,
      height: 810,
      alt: 'Mizner Park in downtown Boca Raton at night',
      credit: 'Photo: Discover The Palm Beaches',
    },
  },
  {
    slug: 'selling-with-intention',
    category: 'For sellers',
    title: 'A clear plan for your next chapter.',
    description: 'The conversations to have before bringing your home to market.',
    read: '3 min read',
  },
];
