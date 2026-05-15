import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { StepHeader, OTP } from '../components/common'
import {
  verifyRegistrationEmailThunk,
  clearAuthError,
} from '../features/auth/authSlice'
import { fetchProfileThunk } from '../features/profile/profileSlice'
import { authService } from '../api/services/authService'
import { tokenService } from '../utils/tokenService'
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
  const [completing, setCompleting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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

  const handleSubmit = async (codeArg) => {
    const code = typeof codeArg === 'string' ? codeArg : otp
    if (code.length !== 6) {
      toast.error('Please enter the 6-digit code.')
      return
    }
    if (loading || completing) return
    const result = await dispatch(
      verifyRegistrationEmailThunk({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
        code,
      })
    )
    if (!verifyRegistrationEmailThunk.fulfilled.match(result)) return

    // Behind the scenes: complete the registration to receive tokens
    setCompleting(true)
    try {
      const completion = await authService.completeRegistration({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
      })
      if (completion?.access_token) {
        tokenService.setRememberMe(true)
        tokenService.setTokens(completion)
        await dispatch(fetchProfileThunk())
        setShowSuccess(true)
      } else {
        // No tokens returned — fall back to gateway connection step
        toast.success('Email verified.')
        navigate(ROUTES.SIGNUP_CONNECT_GATEWAY)
      }
    } catch (err) {
      toast.error(parseApiError(err).message)
    } finally {
      setCompleting(false)
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
            onComplete={(v) => { setOtp(v); handleSubmit(v) }}
            disabled={loading || completing || showSuccess}
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
            disabled={loading || completing || otp.length !== 6}
          >
            {completing ? 'Finalizing…' : loading ? 'Verifying…' : 'Verify Email'}
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

      {showSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reg-success-title"
          style={{
            position: 'fixed', inset: 0, background: 'rgba(16, 8, 36, 0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: 16,
          }}
        >
          <div
            style={{
              background: '#fff', borderRadius: 16, padding: '32px 28px',
              maxWidth: 420, width: '100%', textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#E6F4EA', color: '#1E8E3E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="reg-success-title" style={{ margin: 0, fontSize: 22, color: '#100824' }}>
              Registration Completed
            </h2>
            <p style={{ marginTop: 8, color: '#5B6273', fontSize: 14 }}>
              Your merchant account is ready.
            </p>
            <button
              type="button"
              onClick={() => window.location.replace(ROUTES.DASHBOARD_TRANSACTIONS)}
              style={{
                marginTop: 24,
                background: '#100824',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                width: '100%',
              }}
            >
              Go to Dashboard
            </button>
            <button
              type="button"
              onClick={() => window.location.replace(ROUTES.SIGNUP_CONNECT_GATEWAY)}
              style={{
                marginTop: 12,
                background: 'transparent',
                color: '#5B6273',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default VerifyEmailPage
