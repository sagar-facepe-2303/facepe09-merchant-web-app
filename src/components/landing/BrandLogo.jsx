function BrandLogo({ brand }) {
  return (
    <div className="brand-logo" aria-label={brand}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 34 34" focusable="false">
          <path d="M6 5.5h20.5L18 14h8.5v4H14.6L9.2 23.2H6V5.5z" fill="currentColor" />
          <path d="M11.2 10h10.1l-4.4 3.9h-5.7V10z" fill="#fff" />
          <path d="M6 27.8L15.4 18h4.7L10.8 27.8H6z" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-text">{brand}</span>
    </div>
  )
}

export default BrandLogo
