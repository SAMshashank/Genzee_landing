import Hero from './components/Hero'
import Partners from './components/Partners'
import Features from './components/Features'
import AppShowcase from './components/AppShowcase'
import NFTMarketplace from './components/NFTMarketplace'
import Tokenomics from './components/Tokenomics'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Team from './components/Team'
import MarketingContact from './components/MarketingContact'
import Footer from './components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <Partners />
      <Features />
      <AppShowcase />
      <NFTMarketplace />
      <Tokenomics />
      <Roadmap />
      <Community />
      <Team />
      <MarketingContact />
      <Footer />
    </div>
  )
}

