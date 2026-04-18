import { HeroRotator, CurrentlyBuilding, QuickNav, FeaturedProjects, TerminalShowcase } from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <HeroRotator />
      <FeaturedProjects />
      <TerminalShowcase />
      <CurrentlyBuilding />
      <QuickNav />
    </>
  );
}
