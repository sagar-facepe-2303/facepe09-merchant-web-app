import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerStartThunk, clearAuthError } from '../features/auth/authSlice'
import { ROUTES } from '../routes/paths'
import { authService } from '../api/services/authService'
import { toast } from '../utils/toast'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { STORAGE_KEYS } from '../utils/constants'
import { storage } from '../utils/storage'
import { Button, Input, StepHeader } from '../components/common'
import {
  validateForm, required, email as emailRule, phone as phoneRule, strongPassword,
} from '../utils/validators'

function SignupPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, fieldErrors } = useSelector((s) => s.auth)

  const [form, setForm] = useState({
    businessName: '',
    adminName: '',
    businessTaxId: '',
    businessUrl: '',
    email: '',
    mobileNumber: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => { dispatch(clearAuthError()) }, [dispatch])
  useEffect(() => { if (error) toast.error(error) }, [error])

  const onChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, errors: localErrors } = validateForm(form, {
      businessName: [required('Business name is required')],
      adminName: [required('Admin name is required')],
      email: [required('Email is required'), emailRule()],
      mobileNumber: [required('Mobile number is required'), phoneRule()],
      password: [required('Password is required'), strongPassword()],
    })
    setErrors(localErrors)
    if (!ok) return

    const result = await dispatch(
      registerStartThunk({
        email: form.email,
        password: form.password,
        business_name: form.businessName,
        mobile_number: form.mobileNumber,
      })
    )
    if (registerStartThunk.fulfilled.match(result)) {
      const { vsid, session_secret } = result.payload
      try {
        await authService.sendRegistrationOtp({ vsid, session_secret, channel: 'phone' })
        toast.success('OTP sent to your phone.')
      } catch (err) {
        toast.error('Failed to send OTP. Please try resending.')
      }
      navigate(ROUTES.SIGNUP_VERIFY_PHONE)
    }
  }

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
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="signup-grid">
              <Input
                id="business-name" name="businessName" type="text"
                label="Business name" placeholder="Walmart Inc" required
                helper="Full name not needed"
                value={form.businessName} onChange={onChange('businessName')}
                error={errors.businessName || fieldErrors?.business_name}
                disabled={loading}
              />
              <Input
                id="admin-name" name="adminName" type="text"
                label="Admin name" placeholder="John Doe" required
                value={form.adminName} onChange={onChange('adminName')}
                error={errors.adminName} disabled={loading}
              />
              <Input
                id="business-tax-id" name="businessTaxId" type="text"
                label="Business Tax ID" placeholder="4817XXX77"
                helper="Enter your business tax ID"
                value={form.businessTaxId} onChange={onChange('businessTaxId')}
                error={errors.businessTaxId} disabled={loading}
              />
              <Input
                id="business-url" name="businessUrl" type="url"
                label="Business Website URL" placeholder="www.walmart.com"
                value={form.businessUrl} onChange={onChange('businessUrl')}
                error={errors.businessUrl} disabled={loading}
              />
            </div>

            <Input
              id="business-email" name="email" type="email"
              label="Email" placeholder="admin@walmart.com" required
              autoComplete="email"
              value={form.email} onChange={onChange('email')}
              error={errors.email || fieldErrors?.email} disabled={loading}
            />

            <Input
              id="mobile-number" name="mobileNumber" type="tel"
              label="Mobile Number" placeholder="+15551234567" required
              autoComplete="tel"
              value={form.mobileNumber} onChange={onChange('mobileNumber')}
              error={errors.mobileNumber || fieldErrors?.mobile_number} disabled={loading}
            />

            <Input
              id="business-password" name="password" type="password"
              label="Password" placeholder="********" required
              autoComplete="new-password"
              value={form.password} onChange={onChange('password')}
              error={errors.password || fieldErrors?.password} disabled={loading}
            />

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Submitting…' : 'Continue'}
            </Button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default SignupPage
