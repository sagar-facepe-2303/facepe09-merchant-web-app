import { useSelector } from 'react-redux'
import CtaButtons from '../components/landing/CtaButtons'
import FeatureGrid from '../components/landing/FeatureGrid'
import HeroSection from '../components/landing/HeroSection'
import { selectLanding } from '../features/landing/landingSlice'

function LandingPage() {
  const landing = useSelector(selectLanding)

  return (
    <main className="landing-page">
      <HeroSection
        brand={landing.brand}
        headingPrefix={landing.headingPrefix}
        headingHighlight={landing.headingHighlight}
        subText={landing.subText}
      />
      <CtaButtons loginText={landing.ctas.login} signupText={landing.ctas.signup} />
      <FeatureGrid items={landing.features} />
    </main>
  )
}

export default LandingPage
