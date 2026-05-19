/**
 * Reusable Card Component
 * Wrapper for content with consistent styling
 */
function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  padding = 'md',
  className = '',
  headerClassName = '',
  bodyClassName = ''
}) {
  const paddingClasses = {
    none: 'card-padding-none',
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg'
  }

  const classes = [
    'card',
    paddingClasses[padding] || 'card-padding-md',
    className
  ].filter(Boolean).join(' ')

  const showHeader = title || subtitle || headerAction

  return (
    <div className={classes}>
      {showHeader && (
        <div className={`card-header ${headerClassName}`}>
          <div className="card-header-content">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
