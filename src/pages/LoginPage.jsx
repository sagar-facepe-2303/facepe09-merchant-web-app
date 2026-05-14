import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import facePeLogo from '../assets/FacePe Logo SVG.svg'
import { Button, Input } from '../components/common'
import { loginThunk, clearAuthError } from '../features/auth/authSlice'
import { ROUTES } from '../routes/paths'
import { validateForm, required, emailOrPhone } from '../utils/validators'
import { toast } from '../utils/toast'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading, error, fieldErrors, isAuthenticated } = useSelector((s) => s.auth)

  const [form, setForm] = useState({ username: '', password: '' })
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      const target = location.state?.from || ROUTES.DASHBOARD_TRANSACTIONS
      navigate(target, { replace: true })
    }
  }, [isAuthenticated, navigate, location.state])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const onChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, errors: localErrors } = validateForm(form, {
      username: [required('Email or phone is required'), emailOrPhone()],
      password: [required('Password is required')],
    })
    setErrors(localErrors)
    if (!ok) return

    const result = await dispatch(loginThunk({ ...form, remember }))
    if (loginThunk.fulfilled.match(result)) {
      toast.success('Welcome back!')
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <header className="login-brand" aria-label="FacePe">
          <img className="login-brand-image" src={facePeLogo} alt="FacePe" />
        </header>

        <section className="login-card" aria-label="Sign in form">
          <div className="login-intro">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Enter your credentials to access your account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <Input
              id="username"
              name="username"
              type="text"
              label="Email or Phone"
              placeholder="admin@gmail.com"
              autoComplete="username"
              value={form.username}
              onChange={onChange('username')}
              error={errors.username || fieldErrors?.username}
              disabled={loading}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="********"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange('password')}
              error={errors.password || fieldErrors?.password}
              disabled={loading}
            />

            <div className="login-options">
              <label className="remember-row" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="login-submit"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </section>

        <p className="login-footer">
          Don&apos;t have an account?{' '}
          <button type="button" className="create-account-link" onClick={() => navigate(ROUTES.SIGNUP)}>
            Create new account
          </button>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
