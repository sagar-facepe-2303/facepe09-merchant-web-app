import BrandLogo from './BrandLogo'

function HeroSection({ brand, headingLead, headingBrand, headingMid, headingHighlight, subText }) {
  return (
    <header className="hero-section">
      <BrandLogo brand={brand} />
      <h1 className="hero-title">
        {headingLead}
        <span className="hero-title-accent">{headingBrand}</span>
        {headingMid}
        <span className="hero-title-accent">{headingHighlight}</span>
      </h1>
      <p className="hero-subtitle">{subText}</p>
    </header>
  )
}

export default HeroSection
