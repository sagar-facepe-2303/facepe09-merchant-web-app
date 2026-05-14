import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { StepHeader, OTP } from '../components/common'
import {
  verifyRegistrationPhoneThunk,
  clearAuthError,
} from '../features/auth/authSlice'
import { authService } from '../api/services/authService'
import { ROUTES } from '../routes/paths'
import { RESEND_OTP_COOLDOWN_SECONDS } from '../utils/constants'
import { parseApiError } from '../utils/errorParser'
import { toast } from '../utils/toast'

function VerifyPhonePage() {
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
      toast.error('Please enter the 6-digit OTP.')
      return
    }
    const result = await dispatch(
      verifyRegistrationPhoneThunk({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
        code: otp,
      })
    )
    if (verifyRegistrationPhoneThunk.fulfilled.match(result)) {
      // Trigger email OTP send after phone verification
      try {
        await authService.sendRegistrationOtp({
          vsid: registration.vsid,
          session_secret: registration.session_secret,
          channel: 'email',
        })
        toast.success('Phone verified. Email OTP sent.')
      } catch (err) {
        toast.error('Phone verified, but failed to send email OTP. Please try resending.')
      }
      navigate(ROUTES.SIGNUP_VERIFY_EMAIL)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || resending) return
    setResending(true)
    try {
      await authService.resendRegistrationPhone({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
      })
      toast.success('A new OTP has been sent.')
      setCooldown(RESEND_OTP_COOLDOWN_SECONDS)
    } catch (err) {
      toast.error(parseApiError(err).message)
    } finally {
      setResending(false)
    }
  }

  return (
    <main className="verify-phone-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <StepHeader currentStep={2} />

        <section className="verify-phone-card">
          <h1>Verify your Phone Number</h1>
          <p className="verify-phone-subtext">We&apos;ve sent an OTP to</p>
          <p className="verify-phone-number">{registration?.mobile_number || ''}</p>

          <label className="verify-phone-label">Enter OTP</label>
          <OTP
            length={6}
            value={otp}
            onChange={setOtp}
            onComplete={(v) => setOtp(v)}
            disabled={loading}
            autoFocus
          />

          <p className="verify-phone-hint">Enter the 6-digit OTP sent via SMS</p>

          <div className="verify-phone-note">
            <span className="verify-phone-note-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M4.4 5.2A2.2 2.2 0 0 1 6.6 3h6.8a2.2 2.2 0 0 1 2.2 2.2v9.6a2.2 2.2 0 0 1-2.2 2.2H6.6a2.2 2.2 0 0 1-2.2-2.2V5.2Zm1.8.1V6l3.8 2.5L13.8 6v-.7H6.2Zm7.6 2.8-3.3 2.2a1 1 0 0 1-1.1 0L6.2 8.1v7.1h7.6V8.1Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <p>The OTP is valid for 10 minutes. If you don&apos;t receive it within</p>
              <p>2 minutes, you can request a new one.</p>
            </div>
          </div>

          <p className="verify-phone-resend">
            Didn&apos;t receive OTP?{' '}
            <button
              type="button"
              className="verify-phone-link"
              onClick={handleResend}
              disabled={cooldown > 0 || resending || loading}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? 'Sending…' : 'Resend OTP'}
            </button>
          </p>

          <button
            type="button"
            className="verify-phone-submit"
            onClick={handleSubmit}
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying…' : 'Verify Phone Number'}
          </button>

          <button
            type="button"
            className="verify-phone-back"
            onClick={() => navigate(ROUTES.SIGNUP)}
          >
            <span aria-hidden="true">&larr;</span> Back to Account Setup
          </button>
        </section>

        <p className="verify-phone-support">
          Need to change your phone number ?{' '}
          <button type="button" className="verify-phone-link" onClick={() => navigate(ROUTES.SIGNUP)}>
            Update Phone Number
          </button>
        </p>
      </section>
    </main>
  )
}

export default VerifyPhonePage
