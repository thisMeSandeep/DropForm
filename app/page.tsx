import FormDisplay from "@/components/landing-page/FormDisplay"
import Hero from "@/components/landing-page/Hero"
import Navbar from "@/components/landing-page/Navbar"
import VideoDemo from "@/components/landing-page/VideoDemo"

const Home = () => {
  return (
    <div className="main-container">
      {/* Navbar */}
      <Navbar />
      <Hero />
      <FormDisplay />
      <VideoDemo />
    </div>
  )
}

export default Home