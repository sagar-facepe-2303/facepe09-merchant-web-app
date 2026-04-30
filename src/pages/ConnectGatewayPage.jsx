import { useNavigate } from 'react-router-dom'

function ConnectGatewayPage() {
  const navigate = useNavigate()

  return (
    <main className="gateway-page">
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
          <li className="signup-step signup-step-complete">
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
          <li className="signup-step signup-step-active">
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

        <section className="gateway-card">
          <div className="gateway-content">
            <h1>Setup Payment Credentials</h1>
            <p className="gateway-subtitle">
              Connect your payment gateway to start accepting
              <br />
              FacePe payments at your store
            </p>

            <label className="gateway-label" htmlFor="gateway-select">
              <span className="gateway-label-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    d="M3 5.2A2.2 2.2 0 0 1 5.2 3h9.6A2.2 2.2 0 0 1 17 5.2v9.6a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 14.8V5.2Zm2 .1v2.4h10V5.3H5Zm10 4.2H5v5.2h10V9.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Select Payment Gateway
            </label>
            <div className="gateway-select-wrap">
              <select id="gateway-select" className="gateway-input gateway-select">
                <option>Select your Payment gateway</option>
              </select>
            </div>

            <h2 className="gateway-section-title">API Credentials</h2>

            <label className="gateway-label" htmlFor="publishable-key">
              <span className="gateway-label-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    d="M8.2 3.1a3 3 0 0 1 3.6 0l4.1 3a3 3 0 0 1 0 4.8l-4.1 3a3 3 0 0 1-3.6 0l-4.1-3a3 3 0 0 1 0-4.8l4.1-3Zm.8 1.7-4.1 3a1 1 0 0 0 0 1.6l4.1 3a1 1 0 0 0 1.2 0l4.1-3a1 1 0 0 0 0-1.6l-4.1-3a1 1 0 0 0-1.2 0Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              API Key (Publishable Key)<span className="required-mark">*</span>
            </label>
            <input id="publishable-key" className="gateway-input" placeholder="pk_live_...." />
            <p className="gateway-help">Your publishable API key from square dashboard</p>

            <label className="gateway-label" htmlFor="secret-key">
              <span className="gateway-label-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path
                    d="M10 2.8A3.2 3.2 0 0 0 6.8 6v1.2H6A2.2 2.2 0 0 0 3.8 9.4v6.2A2.2 2.2 0 0 0 6 17.8h8a2.2 2.2 0 0 0 2.2-2.2V9.4A2.2 2.2 0 0 0 14 7.2h-.8V6A3.2 3.2 0 0 0 10 2.8Zm-1.4 4.4V6a1.4 1.4 0 1 1 2.8 0v1.2H8.6Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              API Secret (Secret Key)<span className="required-mark">*</span>
            </label>
            <input id="secret-key" className="gateway-input" placeholder="sk_live_...." />
            <p className="gateway-help">Your secret API key (will be encrypted and stored securely)</p>

            <label className="gateway-label" htmlFor="webhook-url">
              Webhook URL
            </label>
            <div className="webhook-row">
              <input
                id="webhook-url"
                className="gateway-input"
                value="https://api.facepe.cloud/webhooks/payments"
                readOnly
              />
              <button type="button" className="gateway-copy-btn">
                Copy
              </button>
            </div>
            <p className="gateway-help">Add this webhook URL to your square dashboard</p>

            <div className="gateway-note gateway-note-success">
              <p className="note-title">Secure Connection</p>
              <ul>
                <li>All credentials are encrypted using AES-256 encryption</li>
                <li>We never store your secret keys in plain text</li>
                <li>PCI DSS compliant infrastructure</li>
              </ul>
            </div>

            <div className="gateway-note gateway-note-warning">
              <p className="note-title">Important Security Guidelines</p>
              <ul>
                <li>Never share your API credentials with anyone</li>
                <li>Use live keys only in production environment</li>
                <li>Rotate your API keys regularly for security</li>
                <li>You can update these credentials anytime from settings</li>
              </ul>
            </div>

            <button type="button" className="gateway-secondary-btn">
              Test connection
            </button>
            <button type="button" className="gateway-primary-btn">
              Verify Phone Number
            </button>
          </div>

          <button
            type="button"
            className="gateway-back-btn"
            onClick={() => navigate('/signup/verify-phone')}
          >
            <span aria-hidden="true">&larr;</span> Back to Phone Verification
          </button>
        </section>
      </section>
    </main>
  )
}

export default ConnectGatewayPage
