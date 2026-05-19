import { useNavigate } from 'react-router-dom'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button } from '../components/common'

function PasswordUpdatedPage() {
  const navigate = useNavigate()

  return (
    <main className="password-updated-page">
      <section className="password-updated-shell">
        <header className="password-updated-brand" aria-label="FacePe">
          <img className="password-updated-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="password-updated-card" aria-label="Success message">
          <div className="success-icon-wrapper">
            <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#D1FAE5" />
              <path d="M16 24L22 30L32 18" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="password-updated-title">Password Updated!</h1>

          <p className="password-updated-subtitle">
            Your password has been updated successfully.<br />
            You can now use your new password to log in.
          </p>

          <Button
            type="button"
            variant="primary"
            fullWidth
            className="back-to-login-btn"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </section>
      </section>
    </main>
  )
}

export default PasswordUpdatedPage
