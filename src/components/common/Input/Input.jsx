/**
 * Reusable Input Component
 * Supports label, error message, helper text, and various input types
 */
function Input({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  helper,
  autoComplete,
  className = '',
  inputClassName = '',
  labelClassName = '',
  ...props
}) {
  const wrapperClasses = ['input-wrapper', className].filter(Boolean).join(' ')

  const inputClasses = [
    'input-field',
    error ? 'input-error' : '',
    inputClassName
  ].filter(Boolean).join(' ')

  const labelClasses = ['input-label', labelClassName].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        {...props}
      />
      {helper && !error && <small className="input-helper">{helper}</small>}
      {error && <small className="input-error-message">{error}</small>}
    </div>
  )
}

export default Input
