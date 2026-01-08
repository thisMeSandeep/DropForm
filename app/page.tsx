import Contact from "@/components/landing-page/Contact"
import DashboardShowcase from "@/components/landing-page/DashboardShowcase"
import FeaturesSection from "@/components/landing-page/FeaturesSection"
import Footer from "@/components/landing-page/Footer"
import FormDisplay from "@/components/landing-page/FormDisplay"
import Hero from "@/components/landing-page/Hero"
import Navbar from "@/components/landing-page/Navbar"
import PricingSection from "@/components/landing-page/PricingSection"
import VideoDemo from "@/components/landing-page/VideoDemo"

const Home = () => {
  return (
    <div className="main-container overflow-hidden">
      {/* Navbar */}
      <Navbar />
      <Hero />
      <FormDisplay />
      <VideoDemo />
      <DashboardShowcase />
      <FeaturesSection />
      <PricingSection />
      <Contact />
      <Footer/>
    </div>
  )
}

export default Home