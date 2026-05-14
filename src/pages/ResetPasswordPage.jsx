import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, Input } from '../components/common'
import { forgotPasswordThunk, clearAuthError } from '../features/auth/authSlice'
import { ROUTES } from '../routes/paths'
import { validateForm, required, email as emailRule } from '../utils/validators'
import { toast } from '../utils/toast'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((s) => s.auth)

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => { dispatch(clearAuthError()) }, [dispatch])
  useEffect(() => { if (error) toast.error(error) }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, errors: localErrors } = validateForm(
      { email },
      { email: [required('Email is required'), emailRule()] }
    )
    setErrors(localErrors)
    if (!ok) return

    const result = await dispatch(forgotPasswordThunk({ email }))
    if (forgotPasswordThunk.fulfilled.match(result)) {
      toast.success('OTP sent. Check your email.')
      navigate(ROUTES.FORGOT_PASSWORD_VERIFY_CODE)
    }
  }

  return (
    <main className="reset-password-page">
      <section className="reset-password-shell">
        <header className="reset-password-brand" aria-label="FacePe">
          <img className="reset-password-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="reset-password-card" aria-label="Reset password form">
          <div className="reset-password-intro">
            <h1 className="reset-password-title">Enter Merchant ID</h1>
            <p className="reset-password-subtitle">Enter your credentials to access your account</p>
          </div>

          <form className="reset-password-form" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="admin@gmail.com"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({}) }}
              error={errors.email}
              disabled={loading}
            />

            <Button type="submit" variant="primary" fullWidth className="reset-password-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Submit'}
            </Button>
          </form>
        </section>

        <p className="reset-password-footer">
          Don&apos;t have an account{' '}
          <button type="button" className="create-account-link" onClick={() => navigate(ROUTES.SIGNUP)}>
            Create new account
          </button>
        </p>
      </section>
    </main>
  )
}

export default ResetPasswordPage
