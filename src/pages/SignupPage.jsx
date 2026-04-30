import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, Input, StepHeader } from '../components/common'

function SignupPage() {
  const navigate = useNavigate()

  return (
    <main className="signup-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <StepHeader currentStep={1} />

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
