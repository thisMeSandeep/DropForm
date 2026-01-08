import Hero from "@/components/landing-page/Hero"
import Navbar from "@/components/landing-page/Navbar"

const Home = () => {
  return (
    <div className="main-container">
      {/* Navbar */}
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home