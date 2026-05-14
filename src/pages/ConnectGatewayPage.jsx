import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { StepHeader } from '../components/common'
import { gatewayService } from '../api/services/gatewayService'
import { authService } from '../api/services/authService'
import { tokenService } from '../utils/tokenService'
import { fetchProfileThunk } from '../features/profile/profileSlice'
import { ROUTES } from '../routes/paths'
import { parseApiError } from '../utils/errorParser'
import { toast } from '../utils/toast'

const GATEWAYS = [
  { value: '', label: 'Select your Payment gateway' },
  { value: 'basistheory', label: 'Basis Theory' },
  { value: 'stripe', label: 'Stripe (direct)' },
  { value: 'square', label: 'Square (direct)' },
]

function ConnectGatewayPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const registration = useSelector((s) => s.auth.registration)

  const [form, setForm] = useState({
    gateway_type: '',
    name: 'Main Gateway',
    publishable_key: '',
    secret_key: '',
    is_default: true,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    if (!registration?.vsid) navigate(ROUTES.SIGNUP, { replace: true })
  }, [registration, navigate])

  const onChange = (key) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: v }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const buildPayload = () => ({
    gateway_type: form.gateway_type,
    name: form.name,
    credentials: { bt_api_key: form.publishable_key },
    target_psp: 'stripe',
    target_psp_credentials: { api_key: form.secret_key },
    is_default: form.is_default,
  })

  const handleTest = async () => {
    if (!form.gateway_type || !form.publishable_key || !form.secret_key) {
      toast.error('Fill gateway, publishable key, and secret key first.')
      return
    }
    setTesting(true)
    try {
      await gatewayService.testConnection(buildPayload())
      toast.success('Connection successful!')
    } catch (err) {
      toast.error(parseApiError(err).message)
    } finally {
      setTesting(false)
    }
  }

  const handleSubmit = async () => {
    const newErrors = {}
    if (!form.gateway_type) newErrors.gateway_type = 'Please select a payment gateway.'
    if (!form.publishable_key) newErrors.publishable_key = 'Please enter the publishable key.'
    if (!form.secret_key) newErrors.secret_key = 'Please enter the secret key.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      // 1) Create gateway
      await gatewayService.create(buildPayload())
      // 2) Complete registration → expect tokens back
      const completion = await authService.completeRegistration({
        vsid: registration.vsid,
        session_secret: registration.session_secret,
      })
      if (completion?.access_token) {
        tokenService.setRememberMe(true)
        tokenService.setTokens(completion)
        // refresh profile and reload to pick up auth state from store
        await dispatch(fetchProfileThunk())
        toast.success('Onboarding complete!')
        // Hard navigation to ensure protected routes pick up token
        window.location.replace(ROUTES.DASHBOARD_TRANSACTIONS)
        return
      }
      toast.success('Gateway saved.')
      navigate(ROUTES.LOGIN, { replace: true })
    } catch (err) {
      toast.error(parseApiError(err).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="gateway-page">
      <section className="signup-shell">
        <header className="signup-brand" aria-label="FacePe">
          <img className="signup-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <StepHeader currentStep={4} />

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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.334 3.3335H2.66732C1.93094 3.3335 1.33398 3.93045 1.33398 4.66683V11.3335C1.33398 12.0699 1.93094 12.6668 2.66732 12.6668H13.334C14.0704 12.6668 14.6673 12.0699 14.6673 11.3335V4.66683C14.6673 3.93045 14.0704 3.3335 13.334 3.3335Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.33398 6.6665H14.6673" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Select Payment Gateway
            </label>
            <div className="gateway-select-wrap">
              <select
                id="gateway-select"
                className="gateway-input gateway-select"
                value={form.gateway_type}
                onChange={onChange('gateway_type')}
                disabled={submitting || testing}
              >
                {GATEWAYS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
              {errors.gateway_type && <p className="gateway-error">{errors.gateway_type}</p>}
            </div>

            <h2 className="gateway-section-title">
              <span className="gateway-section-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.916 6.25016L14.8327 8.16683C14.9885 8.31952 15.1979 8.40504 15.416 8.40504C15.6341 8.40504 15.8436 8.31952 15.9993 8.16683L17.7493 6.41683C17.902 6.26105 17.9876 6.05162 17.9876 5.8335C17.9876 5.61537 17.902 5.40594 17.7493 5.25016L15.8327 3.3335" stroke="#8200DB" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 1.66675L9.5 9.66675" stroke="#8200DB" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.24935 17.5002C8.78065 17.5002 10.8327 15.4481 10.8327 12.9168C10.8327 10.3855 8.78065 8.3335 6.24935 8.3335C3.71804 8.3335 1.66602 10.3855 1.66602 12.9168C1.66602 15.4481 3.71804 17.5002 6.24935 17.5002Z" stroke="#8200DB" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              API Credentials
            </h2>

            <label className="gateway-label" htmlFor="publishable-key">
              <span className="gateway-label-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12.6667 7.33325H3.33333C2.59695 7.33325 2 7.93021 2 8.66659V13.3333C2 14.0696 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0696 14 13.3333V8.66659C14 7.93021 13.403 7.33325 12.6667 7.33325Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.66602 7.3335V4.66683C4.66602 3.78277 5.01721 2.93493 5.64233 2.30981C6.26745 1.68469 7.11529 1.3335 7.99935 1.3335C8.8834 1.3335 9.73125 1.68469 10.3564 2.30981C10.9815 2.93493 11.3327 3.78277 11.3327 4.66683V7.3335" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              API Key (Publishable Key)<span className="required-mark">*</span>
            </label>
            <input
              id="publishable-key"
              className="gateway-input"
              placeholder="pk_live_...."
              value={form.publishable_key}
              onChange={onChange('publishable_key')}
              disabled={submitting || testing}
              autoComplete="off"
            />
            {errors.publishable_key && <p className="gateway-error">{errors.publishable_key}</p>}
            <p className="gateway-help">Your publishable API key from square dashboard</p>

            <label className="gateway-label" htmlFor="secret-key">
              <span className="gateway-label-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12.6667 7.33325H3.33333C2.59695 7.33325 2 7.93021 2 8.66659V13.3333C2 14.0696 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0696 14 13.3333V8.66659C14 7.93021 13.403 7.33325 12.6667 7.33325Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.66602 7.3335V4.66683C4.66602 3.78277 5.01721 2.93493 5.64233 2.30981C6.26745 1.68469 7.11529 1.3335 7.99935 1.3335C8.8834 1.3335 9.73125 1.68469 10.3564 2.30981C10.9815 2.93493 11.3327 3.78277 11.3327 4.66683V7.3335" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              API Secret (Secret Key)<span className="required-mark">*</span>
            </label>
            <input
              id="secret-key"
              type="password"
              className="gateway-input"
              placeholder="sk_live_...."
              value={form.secret_key}
              onChange={onChange('secret_key')}
              disabled={submitting || testing}
              autoComplete="off"
            />
            {errors.secret_key && <p className="gateway-error">{errors.secret_key}</p>}
            <p className="gateway-help">Your secret API key (will be encrypted and stored securely)</p>

            {/* <label className="gateway-label" htmlFor="webhook-url">
              Webhook URL
            </label> */}
            {/* <div className="webhook-row">
              <input
                id="webhook-url"
                className="gateway-input"
                value="https://api.facepe.cloud/webhooks/payments"
                readOnly
              />
              <button type="button" className="gateway-copy-btn">
                Copy
              </button>
            </div> */}
            <p className="gateway-help">Add this webhook URL to your square dashboard</p>

            <div className="gateway-note gateway-note-success">
              <p className="note-title">
                <span className="note-title-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_1_7746)">
                      <path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 9.99992L9.16667 11.6666L12.5 8.33325" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_7746">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Secure Connection
              </p>
              <ul>
                <li>All credentials are encrypted using AES-256 encryption</li>
                <li>We never store your secret keys in plain text</li>
                <li>PCI DSS compliant infrastructure</li>
              </ul>
            </div>

            <div className="gateway-note gateway-note-warning">
              <p className="note-title">
                <span className="note-title-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_1_7761)">
                      <path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" stroke="#D08700" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 6.66663V9.99996" stroke="#D08700" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 13.3334H10.0083" stroke="#D08700" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_7761">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Important Security Guidelines
              </p>
              <ul>
                <li>Never share your API credentials with anyone</li>
                <li>Use live keys only in production environment</li>
                <li>Rotate your API keys regularly for security</li>
                <li>You can update these credentials anytime from settings</li>
              </ul>
            </div>

            <button
              type="button"
              className="gateway-secondary-btn"
              onClick={handleTest}
              disabled={testing || submitting}
            >
              {testing ? 'Testing…' : 'Test connection'}
            </button>
            <button
              type="button"
              className="gateway-primary-btn"
              onClick={handleSubmit}
              disabled={testing || submitting}
            >
              {submitting ? 'Saving…' : 'Save & Continue'}
            </button>
          </div>

          <button
            type="button"
            className="gateway-back-btn"
            onClick={() => navigate(ROUTES.SIGNUP_VERIFY_EMAIL)}
          >
            <span aria-hidden="true">&larr;</span> Back to Email Verification
          </button>
        </section>
      </section>
    </main>
  )
}

export default ConnectGatewayPage
