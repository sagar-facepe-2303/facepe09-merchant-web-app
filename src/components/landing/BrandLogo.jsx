import facePeLogo from '../../assets/FacePe Logo SVG.svg'

function BrandLogo({ brand }) {
  return (
    <div className="brand-logo" aria-label={brand}>
      <img className="brand-image" src={facePeLogo} alt={brand} />
    </div>
  )
}

export default BrandLogo
