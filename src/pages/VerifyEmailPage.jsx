import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { StepHeader } from '../components/common'

function VerifyEmailPage() {
  const navigate = useNavigate()

  return (
    <main className="verify-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <StepHeader currentStep={2} />

        <section className="verify-card">
          <h1>Verify your Email ID</h1>
          <p className="verify-subtext">We&apos;ve sent a verification code to</p>
          <p className="verify-email">admin@walmart.com</p>

          <label className="verify-code-label" htmlFor="verify-digit-1">
            Verification Code
          </label>
          <div className="verify-code-row">
            <input id="verify-digit-1" maxLength={1} defaultValue="2" inputMode="numeric" />
            <input maxLength={1} defaultValue="2" inputMode="numeric" />
            <input maxLength={1} defaultValue="2" inputMode="numeric" />
            <input maxLength={1} defaultValue="2" inputMode="numeric" />
            <input maxLength={1} defaultValue="2" inputMode="numeric" />
            <input maxLength={1} defaultValue="2" inputMode="numeric" />
          </div>

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
            <button type="button" className="verify-link">
              Resend Code
            </button>
          </p>

          <button
            type="button"
            className="verify-submit"
            onClick={() => navigate('/signup/verify-phone')}
          >
            Verify Email
          </button>

          <button type="button" className="verify-back" onClick={() => navigate('/signup')}>
            <span aria-hidden="true">&larr;</span> Back to Account Setup
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
