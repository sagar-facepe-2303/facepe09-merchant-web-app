function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-shell">
        <header className="login-brand" aria-label="FacePe">
          <span className="login-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 34 34" focusable="false">
              <path d="M6 5.5h20.5L18 14h8.5v4H14.6L9.2 23.2H6V5.5z" fill="currentColor" />
              <path d="M11.2 10h10.1l-4.4 3.9h-5.7V10z" fill="#fff" />
              <path d="M6 27.8L15.4 18h4.7L10.8 27.8H6z" fill="currentColor" />
            </svg>
          </span>
          <span className="login-brand-text">FacePe</span>
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
