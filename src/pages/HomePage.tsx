import { HeroSection } from "../components/HeroSection"
import { FeaturesSection } from "../components/FeaturesSection"
import { DashboardPreview } from "../components/DashboardPreview"
import { StatsSection } from "../components/StatsSection"
import { ThreeDSection } from "../components/ThreeDSection"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DashboardPreview />
      <FeaturesSection />
      {/* <ThreeDSection /> */}
      <StatsSection />
    </main>
  )
}
