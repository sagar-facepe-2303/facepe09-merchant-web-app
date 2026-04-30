import facePeLogo from '../assets/FacePe Logo SVG.svg'

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
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="login-input"
              placeholder="admin@gmail.com"
              autoComplete="email"
            />

            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="login-input"
              placeholder="********"
              autoComplete="current-password"
            />

            <div className="login-options">
              <label className="remember-row" htmlFor="remember-me">
                <input id="remember-me" type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-link">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="login-submit">
              Sign In
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default LoginPage
