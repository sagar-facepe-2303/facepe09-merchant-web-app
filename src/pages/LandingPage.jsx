import { useSelector } from 'react-redux'
import CtaButtons from '../components/landing/CtaButtons'
import FeatureGrid from '../components/landing/FeatureGrid'
import HeroSection from '../components/landing/HeroSection'
import { selectLanding } from '../features/landing/landingSlice'

function LandingPage() {
  const landing = useSelector(selectLanding)

  return (
    <main className="landing-page">
      <div className="landing-hero-stack">
        <HeroSection
          brand={landing.brand}
          headingLead={landing.headingLead}
          headingBrand={landing.headingBrand}
          headingMid={landing.headingMid}
          headingHighlight={landing.headingHighlight}
          subText={landing.subText}
        />
        <CtaButtons loginText={landing.ctas.login} signupText={landing.ctas.signup} />
      </div>
      <FeatureGrid items={landing.features} />
    </main>
  )
}

export default LandingPage
