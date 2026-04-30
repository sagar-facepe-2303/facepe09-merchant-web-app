import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { StepHeader } from '../components/common'

function VerifyPhonePage() {
  const navigate = useNavigate()

  return (
    <main className="verify-phone-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <StepHeader currentStep={3} />

        <section className="verify-phone-card">
          <h1>Verify your Phone Number</h1>
          <p className="verify-phone-subtext">We&apos;ve sent an OTP to</p>
          <p className="verify-phone-number">+1 (XX) XX-7890</p>

          <label className="verify-phone-label" htmlFor="phone-number">
            Phone Number
          </label>
          <input id="phone-number" className="verify-phone-input" defaultValue="+1 (XX) XX-7890" />

          <label className="verify-phone-label" htmlFor="otp-input">
            Enter OTP
          </label>
          <input id="otp-input" className="verify-phone-input" defaultValue="+1 (XX) XX-7890" />

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
            <button type="button" className="verify-phone-link">
              Resend OTP
            </button>
          </p>

          <button
            type="button"
            className="verify-phone-submit"
            onClick={() => navigate('/signup/connect-gateway')}
          >
            Verify Phone Number
          </button>

          <button
            type="button"
            className="verify-phone-back"
            onClick={() => navigate('/signup/verify-email')}
          >
            <span aria-hidden="true">&larr;</span> Back to Email Verification
          </button>
        </section>

        <p className="verify-phone-support">
          Need to change your phone number ?{' '}
          <button type="button" className="verify-phone-link">
            Update Phone Number
          </button>
        </p>
      </section>
    </main>
  )
}

export default VerifyPhonePage
