import {
  Differentiators,
  Experience,
  Explore,
  FinalCta,
  Hero,
  ScrollFootprints,
  Story,
  Timeline,
  WallOfFootprints,
} from "@/components/mainpage";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <div className="relative">
        <ScrollFootprints />
        <Story />
        <Differentiators />
        <WallOfFootprints />
        <Timeline />
        <Experience />
      </div>
      <Explore />
      <FinalCta />
    </div>
  );
}
