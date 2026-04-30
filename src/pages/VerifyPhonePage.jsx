import { useNavigate } from 'react-router-dom'

function VerifyPhonePage() {
  const navigate = useNavigate()

  return (
    <main className="verify-phone-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <span className="signup-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 34 34" focusable="false">
              <path d="M6 5.5h20.5L18 14h8.5v4H14.6L9.2 23.2H6V5.5z" fill="currentColor" />
              <path d="M11.2 10h10.1l-4.4 3.9h-5.7V10z" fill="#fff" />
              <path d="M6 27.8L15.4 18h4.7L10.8 27.8H6z" fill="currentColor" />
            </svg>
          </span>
          <span className="signup-brand-text">FacePe</span>
        </header>

        <ol className="signup-steps" aria-label="Signup progress">
          <li className="signup-step signup-step-complete">
            <span className="step-bubble">01</span>
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M4.3 5.1a2 2 0 0 1 2-2h7.4a2 2 0 0 1 2 2v9.8a2 2 0 0 1-2 2H6.3a2 2 0 0 1-2-2V5.1Zm2 .1v9.6h7.2V5.2H6.3Zm1.1 2a.8.8 0 0 1 .8-.8h3.6a.8.8 0 0 1 0 1.6H8.2a.8.8 0 0 1-.8-.8Zm0 2.8a.8.8 0 0 1 .8-.8h3.6a.8.8 0 0 1 0 1.6H8.2a.8.8 0 0 1-.8-.8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="step-label">Create account</span>
          </li>
          <li className="signup-step signup-step-complete">
            <span className="step-bubble">02</span>
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M4 5.4a2.2 2.2 0 0 1 2.2-2.2h7.6A2.2 2.2 0 0 1 16 5.4v9.2a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 14.6V5.4Zm1.8.2v.3L10 8.7l4.2-2.8v-.3H5.8Zm8.4 2.4L10.5 10a1 1 0 0 1-1 0L5.8 8v6.6h8.4V8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="step-label">Verify email</span>
          </li>
          <li className="signup-step signup-step-active">
            <span className="step-bubble">03</span>
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M7.4 4.1a2.2 2.2 0 0 1 2.2-2.2h.8a2.2 2.2 0 0 1 2.2 2.2v1.4h.8a2 2 0 0 1 2 2v1.8a9.7 9.7 0 0 1-9.7 9.7H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 1.6-2l2.2-.4a1 1 0 0 1 1 .4l1 1.3a6.9 6.9 0 0 0 2.8-2.8l-1.2-.9a1 1 0 0 1-.4-1l.4-2.2a2 2 0 0 1 2-1.6h1v-.8H9.2V4.1a.4.4 0 0 1 .4-.4h.8a.4.4 0 0 1 .4.4v1.4H7.4V4.1Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="step-label">Verify phone</span>
          </li>
          <li className="signup-step">
            <span className="step-bubble">04</span>
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M3.3 5.2a2 2 0 0 1 2-2h9.4a2 2 0 0 1 2 2v9.6a2 2 0 0 1-2 2H5.3a2 2 0 0 1-2-2V5.2Zm2 .1v.9h9.4v-.9H5.3Zm9.4 2.6H5.3v6.9h9.4V7.9Zm-7.6 1.3a.8.8 0 0 1 .8-.8h4.2a.8.8 0 1 1 0 1.6H7.9a.8.8 0 0 1-.8-.8Zm0 2.4a.8.8 0 0 1 .8-.8h2.3a.8.8 0 1 1 0 1.6H7.9a.8.8 0 0 1-.8-.8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="step-label">Connect gateway</span>
          </li>
        </ol>

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
