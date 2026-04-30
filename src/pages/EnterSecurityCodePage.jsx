import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button } from '../components/common'

function EnterSecurityCodePage() {
  const navigate = useNavigate()

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
              Enter the security code sent to your email and registered email
            </p>
          </div>

          <form className="security-code-form" onSubmit={(event) => {
            event.preventDefault()
            navigate('/forgot-password/new-password')
          }}>
            <label className="security-code-label" htmlFor="code-1">
              Security Code
            </label>

            <div className="security-code-row">
              <input id="code-1" className="security-code-input" maxLength={1} defaultValue="2" inputMode="numeric" />
              <input className="security-code-input" maxLength={1} defaultValue="2" inputMode="numeric" />
              <input className="security-code-input" maxLength={1} defaultValue="2" inputMode="numeric" />
              <input className="security-code-input" maxLength={1} defaultValue="2" inputMode="numeric" />
              <input className="security-code-input" maxLength={1} defaultValue="2" inputMode="numeric" />
              <input className="security-code-input" maxLength={1} defaultValue="2" inputMode="numeric" />
            </div>

            <p className="security-code-hint">Enter the 6-digit security code</p>

            <button type="button" className="request-otp-link">
              Request OTP?
            </button>

            <Button type="submit" variant="primary" fullWidth className="security-code-submit">
              Continue
            </Button>
          </form>

          <button type="button" className="back-link" onClick={() => navigate('/forgot-password')}>
            <span aria-hidden="true">&larr;</span> Back
          </button>
        </section>
      </section>
    </main>
  )
}

export default EnterSecurityCodePage
