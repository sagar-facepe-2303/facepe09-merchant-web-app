import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import VerifyPhonePage from './pages/VerifyPhonePage'
import TransactionsPage from './pages/TransactionsPage'
import './pages/transactions.css'
import './components/transactions/StatusBreakdownCard.css'
import ConnectGatewayPage from './pages/ConnectGatewayPage'
import EnterSecurityCodePage from './pages/EnterSecurityCodePage'
import NewPasswordPage  from './pages/NewPasswordPage'
import PasswordUpdatedPage from './pages/PasswordUpdatedPage'
import DashboardPage from './pages/DashboardPage'
import SettingsPage from './pages/SettingsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import AuthBootstrap from './routes/AuthBootstrap'
import { ROUTES } from './routes/paths'
import { ToastContainer } from './components/common'
import './styles/theme.css'
import './styles/landing.css'
import './styles/login.css'
import './styles/reset-password.css'
import './styles/security-code.css'
import './styles/new-password.css'
import './styles/password-updated.css'
import './styles/dashboard.css'
import './styles/signup.css'
import './styles/verify-email.css'
import './styles/verify-phone.css'
import './styles/connect-gateway.css'

// Common component styles
import './components/common/Button/Button.css'
import './components/common/Input/Input.css'
import './components/common/Loader/Loader.css'
import './components/common/Card/Card.css'
import './components/common/StepHeader/StepHeader.css'

// Layout component styles
import './components/layout/Header/Header.css'
import './components/layout/Layout/Layout.css'
import './components/layout/Sidebar/Sidebar.css'
import './components/layout/DashboardHeader/DashboardHeader.css'

function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Routes>
          {/* Public */}
          <Route path={ROUTES.ROOT} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ResetPasswordPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD_VERIFY_CODE} element={<EnterSecurityCodePage />} />
          <Route path={ROUTES.FORGOT_PASSWORD_NEW_PASSWORD} element={<NewPasswordPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD_SUCCESS} element={<PasswordUpdatedPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.SIGNUP_VERIFY_EMAIL} element={<VerifyEmailPage />} />
          <Route path={ROUTES.SIGNUP_VERIFY_PHONE} element={<VerifyPhonePage />} />
          <Route path={ROUTES.SIGNUP_CONNECT_GATEWAY} element={<ConnectGatewayPage />} />

          {/* Protected */}
          <Route path={ROUTES.DASHBOARD} element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path={ROUTES.DASHBOARD_TRANSACTIONS} element={
            <ProtectedRoute><TransactionsPage /></ProtectedRoute>
          } />
          <Route path={ROUTES.DASHBOARD_SETTINGS} element={
            <ProtectedRoute><SettingsPage /></ProtectedRoute>
          } />
        </Routes>
        <ToastContainer />
      </AuthBootstrap>
    </BrowserRouter>
  )
}

export default App
