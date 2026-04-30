/**
 * Reusable Button Component
 * Supports multiple variants: primary, outline, danger, ghost
 * Supports multiple sizes: sm, md, lg
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary btn-theme-primary',
    outline: 'btn-light btn-theme-outline',
    danger: 'btn-danger',
    ghost: 'btn-ghost'
  }
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || '',
    fullWidth ? 'btn-full-width' : '',
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {!loading && icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
