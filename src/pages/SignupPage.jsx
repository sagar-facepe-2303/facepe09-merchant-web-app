function SignupPage() {
  return (
    <main className="signup-page">
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
          <form className="signup-form" onSubmit={(event) => event.preventDefault()}>
            <div className="signup-grid">
              <div className="field-wrap">
                <label htmlFor="business-name">
                  Business name <span>*</span>
                </label>
                <input id="business-name" type="text" placeholder="Walmart Inc" />
                <small>Ful name not neede</small>
              </div>

              <div className="field-wrap">
                <label htmlFor="admin-name">
                  Admin name <span>*</span>
                </label>
                <input id="admin-name" type="text" placeholder="4817XXX77" />
              </div>

              <div className="field-wrap">
                <label htmlFor="business-tax-id">
                  Business Tax ID <span>*</span>
                </label>
                <input id="business-tax-id" type="text" placeholder="4817XXX77" />
                <small>Ful name not neede.</small>
              </div>

              <div className="field-wrap">
                <label htmlFor="business-url">
                  Business Website URL <span>*</span>
                </label>
                <input id="business-url" type="url" placeholder="www.walmart.com" />
              </div>
            </div>

            <div className="field-wrap">
              <label htmlFor="business-email">
                Email <span>*</span>
              </label>
              <input id="business-email" type="email" placeholder="admin@walmart.com" />
            </div>

            <div className="field-wrap">
              <label htmlFor="business-password">
                Password <span>*</span>
              </label>
              <input id="business-password" type="password" placeholder="********" />
            </div>

            <button type="submit" className="signup-submit">
              Continue
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default SignupPage
