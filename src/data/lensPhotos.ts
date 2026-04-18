export type LensCategory = 'LANDSCAPE' | 'STREET' | 'FLORA' | 'SNOW' | 'WATER';

export interface LensPhoto {
  src: string;
  alt: string;
  title: string;
  category: LensCategory;
}

function lp(n: number, title: string, category: LensCategory): LensPhoto {
  return {
    src: `/images/landscapes/${encodeURIComponent(`Insta Post landscape ${n}.jpg`)}`,
    alt: `${title} — landscape photograph by Pavitra Mandal`,
    title,
    category,
  };
}

// Distribute all 44 photos across categories.
// Swap category assignments freely in this file — filenames stay unchanged.
export const lensPhotos: LensPhoto[] = [
  lp(55,  'Golden Plains',       'LANDSCAPE'),
  lp(56,  'City at Dusk',        'STREET'),
  lp(59,  'Urban Geometry',      'STREET'),
  lp(67,  'Wild Blooms',         'FLORA'),
  lp(74,  'Into the Horizon',    'LANDSCAPE'),
  lp(75,  'Petal Light',         'FLORA'),
  lp(84,  'Open Skies',          'LANDSCAPE'),
  lp(93,  'Street Shadows',      'STREET'),
  lp(96,  'First Snow',          'SNOW'),
  lp(129, 'Still Waters',        'WATER'),
  lp(158, 'Evening Street',      'STREET'),
  lp(159, 'Spring Bloom',        'FLORA'),
  lp(160, 'Garden Hour',         'FLORA'),
  lp(161, 'Winter Silence',      'SNOW'),
  lp(162, 'Mountain Light',      'LANDSCAPE'),
  lp(163, 'Snowfall',            'SNOW'),
  lp(168, 'Night Walk',          'STREET'),
  lp(197, 'Lake Reflection',     'WATER'),
  lp(205, 'Mirror Lake',         'WATER'),
  lp(207, 'Ridge View',          'LANDSCAPE'),
  lp(210, 'Calm River',          'WATER'),
  lp(213, 'Summit',              'LANDSCAPE'),
  lp(221, 'Cherry Blossom',      'FLORA'),
  lp(222, 'Still Pond',          'WATER'),
  lp(225, 'Valley Mist',         'LANDSCAPE'),
  lp(229, 'Deep Winter',         'SNOW'),
  lp(232, 'Creek Light',         'WATER'),
  lp(241, 'Granite Peaks',       'LANDSCAPE'),
  lp(254, 'Wildflowers',         'FLORA'),
  lp(255, 'Crosswalk',           'STREET'),
  lp(257, 'Garden Path',         'FLORA'),
  lp(258, 'Snow Field',          'SNOW'),
  lp(259, 'Blizzard',            'SNOW'),
  lp(260, 'Frost Morning',       'SNOW'),
  lp(262, 'Winter Stream',       'WATER'),
  lp(263, 'Dusk Harbour',        'WATER'),
  lp(264, 'Blue Hour Lake',      'WATER'),
  lp(265, 'Shoreline',           'WATER'),
  lp(269, 'River Bend',          'WATER'),
  lp(277, 'City Rain',           'STREET'),
  lp(280, 'Far Hills',           'LANDSCAPE'),
  lp(286, 'Autumn Ridge',        'LANDSCAPE'),
  lp(288, 'Evening Glow',        'LANDSCAPE'),
  lp(289, 'Last Light',          'LANDSCAPE'),
];

export const LENS_CATEGORIES: LensCategory[] = ['LANDSCAPE', 'STREET', 'FLORA', 'SNOW', 'WATER'];
