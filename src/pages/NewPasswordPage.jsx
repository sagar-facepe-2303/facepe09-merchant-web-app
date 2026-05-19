import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button } from '../components/common'
import { resetPasswordThunk, clearAuthError } from '../features/auth/authSlice'
import { ROUTES } from '../routes/paths'
import { validateForm, required, strongPassword, matches } from '../utils/validators'
import { toast } from '../utils/toast'

function NewPasswordPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, forgotPassword } = useSelector((s) => s.auth)

  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState({ newPassword: false, confirmPassword: false })
  const [errors, setErrors] = useState({})

  useEffect(() => { dispatch(clearAuthError()) }, [dispatch])
  useEffect(() => { if (error) toast.error(error) }, [error])

  // Bounce back to step 1 if flow not started
  useEffect(() => {
    if (!forgotPassword.email || !forgotPassword.otp) {
      navigate(ROUTES.FORGOT_PASSWORD, { replace: true })
    }
  }, [forgotPassword, navigate])

  const onChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, errors: localErrors } = validateForm(form, {
      newPassword: [required('Password is required'), strongPassword()],
      confirmPassword: [required('Please confirm the password'), matches('newPassword', 'Passwords do not match')],
    })
    setErrors(localErrors)
    if (!ok) return

    const result = await dispatch(
      resetPasswordThunk({
        email: forgotPassword.email,
        otp: forgotPassword.otp,
        new_password: form.newPassword,
      })
    )
    if (resetPasswordThunk.fulfilled.match(result)) {
      toast.success('Password updated successfully.')
      navigate(ROUTES.LOGIN, { replace: true })
    }
  }

  return (
    <main className="new-password-page">
      <section className="new-password-shell">
        <header className="new-password-brand" aria-label="FacePe">
          <img className="new-password-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="new-password-card" aria-label="New password form">
          <div className="new-password-intro">
            <h1 className="new-password-title">New Password</h1>
            <p className="new-password-subtitle">
              Your new password must be completely different from previously used passwords
            </p>
          </div>

          <form className="new-password-form" onSubmit={handleSubmit} noValidate>
            <label className="new-password-label" htmlFor="new-password">
              Enter your new password
            </label>
            <div className="new-password-input-wrapper">
              <input
                id="new-password"
                type={show.newPassword ? 'text' : 'password'}
                className="new-password-input"
                placeholder="********"
                value={form.newPassword}
                onChange={onChange('newPassword')}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                aria-label="Toggle password visibility"
                onClick={() => setShow((s) => ({ ...s, newPassword: !s.newPassword }))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.5C5.416 3.5 3.096 5.036 2 7.333C3.096 9.63 5.416 11.167 8 11.167C10.584 11.167 12.904 9.63 14 7.333C12.904 5.036 10.584 3.5 8 3.5Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 9.5C9.10457 9.5 10 8.60457 10 7.5C10 6.39543 9.10457 5.5 8 5.5C6.89543 5.5 6 6.39543 6 7.5C6 8.60457 6.89543 9.5 8 9.5Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            {errors.newPassword && <small className="input-error-message">{errors.newPassword}</small>}

            <label className="new-password-label" htmlFor="confirm-password">
              Re - Enter your new password
            </label>
            <div className="new-password-input-wrapper">
              <input
                id="confirm-password"
                type={show.confirmPassword ? 'text' : 'password'}
                className="new-password-input"
                placeholder="********"
                value={form.confirmPassword}
                onChange={onChange('confirmPassword')}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                aria-label="Toggle password visibility"
                onClick={() => setShow((s) => ({ ...s, confirmPassword: !s.confirmPassword }))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.5C5.416 3.5 3.096 5.036 2 7.333C3.096 9.63 5.416 11.167 8 11.167C10.584 11.167 12.904 9.63 14 7.333C12.904 5.036 10.584 3.5 8 3.5Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 9.5C9.10457 9.5 10 8.60457 10 7.5C10 6.39543 9.10457 5.5 8 5.5C6.89543 5.5 6 6.39543 6 7.5C6 8.60457 6.89543 9.5 8 9.5Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && <small className="input-error-message">{errors.confirmPassword}</small>}

            <div className="password-hint-box">
              <p className="password-hint-text">
                Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters
              </p>
            </div>

            <Button type="submit" variant="primary" fullWidth className="new-password-submit" disabled={loading}>
              {loading ? 'Saving…' : 'Save Password'}
            </Button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default NewPasswordPage
