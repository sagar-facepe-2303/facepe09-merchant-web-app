import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, Input } from '../components/common'

function SignupPage() {
  const navigate = useNavigate()

  return (
    <main className="signup-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <ol className="signup-steps" aria-label="Signup progress">
          <li className="signup-step signup-step-active">
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
          <li className="signup-step">
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
          <li className="signup-step">
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

        <section className="signup-head">
          <h1>Set up your merchant account</h1>
          <p>Enter your business details to get started.</p>
        </section>

        <section className="signup-card">
          <form
            className="signup-form"
            onSubmit={(event) => {
              event.preventDefault()
              navigate('/signup/verify-email')
            }}
          >
            <div className="signup-grid">
              <Input
                id="business-name"
                name="businessName"
                type="text"
                label="Business name"
                placeholder="Walmart Inc"
                required
                helper="Full name not needed"
              />

              <Input
                id="admin-name"
                name="adminName"
                type="text"
                label="Admin name"
                placeholder="John Doe"
                required
              />

              <Input
                id="business-tax-id"
                name="businessTaxId"
                type="text"
                label="Business Tax ID"
                placeholder="4817XXX77"
                required
                helper="Enter your business tax ID"
              />

              <Input
                id="business-url"
                name="businessUrl"
                type="url"
                label="Business Website URL"
                placeholder="www.walmart.com"
                required
              />
            </div>

            <Input
              id="business-email"
              name="businessEmail"
              type="email"
              label="Email"
              placeholder="admin@walmart.com"
              required
            />

            <Input
              id="business-password"
              name="businessPassword"
              type="password"
              label="Password"
              placeholder="********"
              required
            />

            <Button type="submit" variant="primary" fullWidth>
              Continue
            </Button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default SignupPage
