import { LandingNavbar } from "@/components/uses/landing-navbar";
import { LandingHero } from "@/components/uses/landing-hero";
import { LandingContent } from "@/components/uses/landing-content";

const LandingPage = () => {
  return (
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
