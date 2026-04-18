export interface HeroPhoto {
  src: string;
  alt: string;
  title: string;
}

function landscapePath(n: string | number): string {
  return `/images/landscapes/${encodeURIComponent(`Insta Post landscape ${n}.jpg`)}`;
}

export const heroPhotos: HeroPhoto[] = [
  { src: landscapePath(55),  alt: 'Landscape photograph 1', title: 'Into the Horizon' },
  { src: landscapePath(96),  alt: 'Landscape photograph 2', title: 'Golden Hour' },
  { src: landscapePath(129), alt: 'Landscape photograph 3', title: 'Still Waters' },
  { src: landscapePath(197), alt: 'Landscape photograph 4', title: 'Mountain Light' },
  { src: landscapePath(241), alt: 'Landscape photograph 5', title: 'First Snow' },
  { src: landscapePath(288), alt: 'Landscape photograph 6', title: 'Evening Glow' },
];
