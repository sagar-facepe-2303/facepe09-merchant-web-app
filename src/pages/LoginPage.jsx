import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, Input } from '../components/common'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-shell">
        <header className="login-brand" aria-label="FacePe">
          <img className="login-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="login-card" aria-label="Sign in form">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Enter your credentials to access your account</p>

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="admin@gmail.com"
              autoComplete="email"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="********"
              autoComplete="current-password"
            />

            <div className="login-options">
              <label className="remember-row" htmlFor="remember-me">
                <input id="remember-me" type="checkbox" />
                <span>Remember me</span>
              </label>
              <Button type="button" variant="ghost" className="forgot-link">
                Forgot password?
              </Button>
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Sign In
            </Button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default LoginPage
