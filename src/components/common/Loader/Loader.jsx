/**
 * Reusable Loader Component
 * Shows a loading spinner with optional text
 */
function Loader({
  size = 'md',
  text = 'Loading...',
  showText = true,
  fullPage = false,
  className = ''
}) {
  const sizeClasses = {
    sm: 'loader-sm',
    md: 'loader-md',
    lg: 'loader-lg'
  }

  const classes = [
    'loader',
    sizeClasses[size] || 'loader-md',
    fullPage ? 'loader-full-page' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      {showText && <span className="loader-text">{text}</span>}
    </div>
  )
}

export default Loader
