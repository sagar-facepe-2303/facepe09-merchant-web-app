import BrandLogo from './BrandLogo'

function HeroSection({ brand, headingPrefix, headingHighlight, subText }) {
  return (
    <header className="hero-section">
      <BrandLogo brand={brand} />
      <h1 className="hero-title">
        {headingPrefix} <span>{headingHighlight}</span>
      </h1>
      <p className="hero-subtitle">{subText}</p>
    </header>
  )
}

export default HeroSection
