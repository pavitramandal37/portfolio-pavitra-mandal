function lp(n: number | string): string {
  return `/images/landscapes/${encodeURIComponent(`Insta Post landscape ${n}.jpg`)}`;
}

export const pageImages = {
  // Inner-page heroes
  projects:   lp(162),
  experience: lp(207),
  hobby:      lp(225),
  contact:    lp(263),
  // Home-page sections
  terminal:   lp(74),
  // QuickNav panel images
  navProjects:   lp(93),
  navExperience: lp(168),
  navContact:    lp(265),
};

export default pageImages;
