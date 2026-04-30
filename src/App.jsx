import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import VerifyPhonePage from './pages/VerifyPhonePage'
import ConnectGatewayPage from './pages/ConnectGatewayPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/theme.css'
import './styles/landing.css'
import './styles/login.css'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/verify-email" element={<VerifyEmailPage />} />
        <Route path="/signup/verify-phone" element={<VerifyPhonePage />} />
        <Route path="/signup/connect-gateway" element={<ConnectGatewayPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
