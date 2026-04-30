import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, Input } from '../components/common'

function ResetPasswordPage() {
  const navigate = useNavigate()

  return (
    <main className="reset-password-page">
      <section className="reset-password-shell">
        <header className="reset-password-brand" aria-label="FacePe">
          <img className="reset-password-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="reset-password-card" aria-label="Reset password form">
          <div className="reset-password-intro">
            <h1 className="reset-password-title">Enter Merchant ID</h1>
            <p className="reset-password-subtitle">Enter your credentials to access your account</p>
          </div>

          <form className="reset-password-form" onSubmit={(event) => {
            event.preventDefault()
            navigate('/forgot-password/verify-code')
          }}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="admin@gmail.com"
              autoComplete="email"
            />

            <Button type="submit" variant="primary" fullWidth className="reset-password-submit">
              Submit
            </Button>
          </form>
        </section>

        <p className="reset-password-footer">
          Don't have an account{' '}
          <button type="button" className="create-account-link" onClick={() => navigate('/signup')}>
            Create new account
          </button>
        </p>
      </section>
    </main>
  )
}

export default ResetPasswordPage
