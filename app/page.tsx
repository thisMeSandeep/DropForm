import DashboardShowcase from "@/components/landing-page/DashboardShowcase"
import FeaturesSection from "@/components/landing-page/FeaturesSection"
import FormDisplay from "@/components/landing-page/FormDisplay"
import Hero from "@/components/landing-page/Hero"
import Navbar from "@/components/landing-page/Navbar"
import PricingSection from "@/components/landing-page/PricingSection"
import VideoDemo from "@/components/landing-page/VideoDemo"

const Home = () => {
  return (
    <div className="main-container">
      {/* Navbar */}
      <Navbar />
      <Hero />
      <FormDisplay />
      <VideoDemo />
      <DashboardShowcase />
      <FeaturesSection />
      <PricingSection />
    </div>
  )
}

export default Home