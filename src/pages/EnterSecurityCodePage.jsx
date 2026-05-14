import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, OTP } from '../components/common'
import {
  verifyForgotPasswordOtpThunk,
  forgotPasswordThunk,
  clearAuthError,
} from '../features/auth/authSlice'
import { ROUTES } from '../routes/paths'
import { RESEND_OTP_COOLDOWN_SECONDS } from '../utils/constants'
import { toast } from '../utils/toast'

function EnterSecurityCodePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, forgotPassword } = useSelector((s) => s.auth)

  const [otp, setOtp] = useState('')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => { dispatch(clearAuthError()) }, [dispatch])
  useEffect(() => { if (error) toast.error(error) }, [error])

  // Redirect back to step 1 if no email in flow
  useEffect(() => {
    if (!forgotPassword.email) navigate(ROUTES.FORGOT_PASSWORD, { replace: true })
  }, [forgotPassword.email, navigate])

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return undefined
    const t = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code.')
      return
    }
    const result = await dispatch(
      verifyForgotPasswordOtpThunk({ email: forgotPassword.email, otp })
    )
    if (verifyForgotPasswordOtpThunk.fulfilled.match(result)) {
      navigate(ROUTES.FORGOT_PASSWORD_NEW_PASSWORD)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0) return
    const result = await dispatch(forgotPasswordThunk({ email: forgotPassword.email }))
    if (forgotPasswordThunk.fulfilled.match(result)) {
      toast.success('A new code has been sent.')
      setCooldown(RESEND_OTP_COOLDOWN_SECONDS)
    }
  }

  return (
    <main className="security-code-page">
      <section className="security-code-shell">
        <header className="security-code-brand" aria-label="FacePe">
          <img className="security-code-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="security-code-card" aria-label="Security code form">
          <div className="security-code-intro">
            <h1 className="security-code-title">Enter Security Code</h1>
            <p className="security-code-subtitle">
              Enter the security code sent to {forgotPassword.email || 'your email'}
            </p>
          </div>

          <form className="security-code-form" onSubmit={handleSubmit} noValidate>
            <label className="security-code-label">Security Code</label>

            <OTP
              length={6}
              value={otp}
              onChange={setOtp}
              disabled={loading}
              autoFocus
            />

            <p className="security-code-hint">Enter the 6-digit security code</p>

            <button
              type="button"
              className="request-otp-link"
              onClick={handleResend}
              disabled={cooldown > 0 || loading}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
            </button>

            <Button type="submit" variant="primary" fullWidth className="security-code-submit" disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying…' : 'Continue'}
            </Button>
          </form>

          <button type="button" className="back-link" onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}>
            <span aria-hidden="true">&larr;</span> Back
          </button>
        </section>
      </section>
    </main>
  )
}

export default EnterSecurityCodePage
