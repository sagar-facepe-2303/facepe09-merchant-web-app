import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../features/landing/landingSlice'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import transactionsReducer from '../features/transactions/transactionsSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    auth: authReducer,
    profile: profileReducer,
    transactions: transactionsReducer,
    notifications: notificationsReducer,
  },
})
