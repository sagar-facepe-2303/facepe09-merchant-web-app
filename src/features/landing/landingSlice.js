import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brand: 'FacePe',
  headingLead: 'Monitor your ',
  headingBrand: 'FacePe',
  headingMid: ' devices & ',
  headingHighlight: 'transactions',
  subText:
    'One dashboard for all terminals. Track payments in real-time, detect outages early, and keep checkout running 24/7.',
  ctas: {
    login: 'Log In',
    signup: 'Sign Up',
  },
  features: [
    {
      id: 'device-manager',
      title: 'Device Manager',
      description: 'Monitor terminal health in real time. Get alerts when one goes offline.',
      icon: 'monitor',
    },
    {
      id: 'transaction-logs',
      title: 'Transaction Logs',
      description: 'Search payments in seconds. Filter, export, and reconcile easily.',
      icon: 'document',
      highlighted: true,
    },
    {
      id: 'gateway-setup',
      title: 'Gateway Setup',
      description: 'Connect Stripe, Razorpay, and 20+ processors with guided setup.',
      icon: 'grid',
    },
    {
      id: 'secure-access',
      title: 'Secure Access',
      description: 'Bank-grade 2FA with OTP, biometric login, and role-based permissions.',
      icon: 'shield',
    },
  ],
}

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {},
})

export const selectLanding = (state) => state.landing

export default landingSlice.reducer
