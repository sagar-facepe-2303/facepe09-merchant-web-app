import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { StepHeader, OTP } from '../components/common'
import {
  verifyRegistrationEmailThunk,
  clearAuthError,
} from '../features/auth/authSlice'
import { authService } from '../api/services/authService'
import { ROUTES } from '../routes/paths'
import { RESEND_OTP_COOLDOWN_SECONDS } from '../utils/constants'
import { parseApiError } from '../utils/errorParser'
import { toast } from '../utils/toast'

function VerifyEmailPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, registration } = useSelector((s) => s.auth)

  const [otp, setOtp] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)

  useEffect(() => { dispatch(clearAuthError()) }, [dispatch])
  useEffect(() => { if (error) toast.error(error) }, [error])
  useEffect(() => {
    if (!registration?.vsid) navigate(ROUTES.SIGNUP, { replace: true })
  }, [registration, navigate])

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const t = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code.')
      return
    }
    const result = await dispatch(
      verifyRegistrationEmailThunk({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
        code: otp,
      })
    )
    if (verifyRegistrationEmailThunk.fulfilled.match(result)) {
      toast.success('Email verified.')
      navigate(ROUTES.SIGNUP_CONNECT_GATEWAY)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || resending) return
    setResending(true)
    try {
      await authService.resendRegistrationEmail({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
      })
      toast.success('A new code has been sent.')
      setCooldown(RESEND_OTP_COOLDOWN_SECONDS)
    } catch (err) {
      toast.error(parseApiError(err).message)
    } finally {
      setResending(false)
    }
  }

  return (
    <main className="verify-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <StepHeader currentStep={3} />

        <section className="verify-card">
          <h1>Verify your Email ID</h1>
          <p className="verify-subtext">We&apos;ve sent a verification code to</p>
          <p className="verify-email">{registration?.email || ''}</p>

          <label className="verify-code-label">Verification Code</label>
          <OTP
            length={6}
            value={otp}
            onChange={setOtp}
            onComplete={(v) => setOtp(v)}
            disabled={loading}
            autoFocus
          />

          <div className="verify-note">
            <span className="verify-note-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M4.4 5.2A2.2 2.2 0 0 1 6.6 3h6.8a2.2 2.2 0 0 1 2.2 2.2v9.6a2.2 2.2 0 0 1-2.2 2.2H6.6a2.2 2.2 0 0 1-2.2-2.2V5.2Zm1.8.1V6l3.8 2.5L13.8 6v-.7H6.2Zm7.6 2.8-3.3 2.2a1 1 0 0 1-1.1 0L6.2 8.1v7.1h7.6V8.1Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <p>The verification code may take up to 2 minutes to arrive.</p>
              <p>Please check your spam folder if you don&apos;t see it.</p>
            </div>
          </div>

          <p className="verify-resend">
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              className="verify-link"
              onClick={handleResend}
              disabled={cooldown > 0 || resending || loading}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? 'Sending…' : 'Resend Code'}
            </button>
          </p>

          <button
            type="button"
            className="verify-submit"
            onClick={handleSubmit}
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying…' : 'Verify Email'}
          </button>

          <button type="button" className="verify-back" onClick={() => navigate(ROUTES.SIGNUP_VERIFY_PHONE)}>
            <span aria-hidden="true">&larr;</span> Back to Phone Verification
          </button>
        </section>

        <p className="verify-support">
          Having trouble?{' '}
          <button type="button" className="verify-link">
            Contact Support
          </button>
        </p>
      </section>
    </main>
  )
}

export default VerifyEmailPage
