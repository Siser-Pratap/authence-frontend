import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { DashboardPreview } from "@/components/dashboard-preview"
import { StatsSection } from "@/components/stats-section"
import { ThreeDSection } from "@/components/three-d-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DashboardPreview />
      <FeaturesSection />
      <ThreeDSection />
      <StatsSection />
    </main>
  )
}
