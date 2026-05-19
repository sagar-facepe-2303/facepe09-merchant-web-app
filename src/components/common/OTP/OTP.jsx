/**
 * Reusable OTP input.
 * - Auto-focus next box on type
 * - Backspace: clear current; if empty, focus & clear previous
 * - Paste: distributes digits across remaining boxes
 * - Calls onChange(value) and onComplete(value) when full
 */
import { useEffect, useRef } from 'react'
import './OTP.css'

function OTP({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = null,
  autoFocus = true,
  inputMode = 'numeric',
}) {
  const inputsRef = useRef([])

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) inputsRef.current[0].focus()
  }, [autoFocus])

  const digits = Array.from({ length }, (_, i) => value[i] || '')

  const setDigit = (idx, char) => {
    const arr = digits.slice()
    arr[idx] = char
    const next = arr.join('').slice(0, length)
    onChange?.(next)
    if (next.length === length) onComplete?.(next)
  }

  const handleChange = (idx, raw) => {
    const sanitized = inputMode === 'numeric' ? raw.replace(/\D/g, '') : raw
    if (!sanitized) {
      setDigit(idx, '')
      return
    }
    // Distribute multi-character paste across boxes
    const chars = sanitized.split('')
    const arr = digits.slice()
    let cursor = idx
    for (const ch of chars) {
      if (cursor >= length) break
      arr[cursor++] = ch
    }
    const next = arr.join('').slice(0, length)
    onChange?.(next)
    if (next.length === length) onComplete?.(next)
    const focusTo = Math.min(cursor, length - 1)
    setTimeout(() => inputsRef.current[focusTo]?.focus(), 0)
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace') {
      if (digits[idx]) {
        setDigit(idx, '')
      } else if (idx > 0) {
        setDigit(idx - 1, '')
        inputsRef.current[idx - 1]?.focus()
      }
      e.preventDefault()
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }
  }

  const handlePaste = (idx, e) => {
    const text = e.clipboardData?.getData('text') || ''
    if (!text) return
    e.preventDefault()
    handleChange(idx, text)
  }

  return (
    <div className={`otp-row ${error ? 'otp-row-error' : ''}`}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          className="otp-input"
          value={d}
          maxLength={1}
          inputMode={inputMode}
          autoComplete="one-time-code"
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}

export default OTP
