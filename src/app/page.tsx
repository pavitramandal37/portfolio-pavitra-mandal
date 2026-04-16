import { Hero, FeaturedProjects, QuickNav, CurrentlyBuilding } from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CurrentlyBuilding />
      <QuickNav />
      <FeaturedProjects />
    </>
  );
}
