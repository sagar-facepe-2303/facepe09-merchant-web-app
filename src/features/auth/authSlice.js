/**
 * Auth slice — login / logout / forgot-password / signup-flow state.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../api/services/authService'
import { tokenService } from '../../utils/tokenService'
import { storage } from '../../utils/storage'
import { STORAGE_KEYS } from '../../utils/constants'
import { parseApiError } from '../../utils/errorParser'

// ───── Thunks ──────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ username, password, remember }, { rejectWithValue }) => {
    try {
      tokenService.setRememberMe(!!remember)
      const data = await authService.login({ username, password })
      tokenService.setTokens(data)
      return data
    } catch (error) {
      return rejectWithValue(parseApiError(error, 'Login failed.'))
    }
  }
)

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
  tokenService.clear()
  storage.removeItem(STORAGE_KEYS.REGISTRATION_SESSION)
  return true
})

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const data = await authService.forgotPassword(email)
      storage.setItem(STORAGE_KEYS.RESET_PASSWORD_EMAIL, email)
      return data
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

export const verifyForgotPasswordOtpThunk = createAsyncThunk(
  'auth/verifyForgotPasswordOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const data = await authService.verifyForgotPasswordOtp({ email, otp })
      storage.setItem(STORAGE_KEYS.RESET_PASSWORD_OTP, otp)
      return data
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, new_password }, { rejectWithValue }) => {
    try {
      const data = await authService.resetPassword({ email, otp, new_password })
      storage.removeItem(STORAGE_KEYS.RESET_PASSWORD_EMAIL)
      storage.removeItem(STORAGE_KEYS.RESET_PASSWORD_OTP)
      return data
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

export const registerStartThunk = createAsyncThunk(
  'auth/registerStart',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.registerStart(payload)
      if (import.meta.env.DEV) {
        // Surface the full backend response in dev so we can see whether the
        // server returned a debug OTP, a delivery status, or any hint about
        // why the email isn't arriving.
        // eslint-disable-next-line no-console
        console.log('[register/start] response:', data)
      }
      storage.setItem(STORAGE_KEYS.REGISTRATION_SESSION, {
        vsid: data.vsid,
        session_secret: data.session_secret,
        state: data.state,
        email: payload.email,
        mobile_number: payload.mobile_number,
      })
      return data
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

export const verifyRegistrationEmailThunk = createAsyncThunk(
  'auth/verifyRegistrationEmail',
  async ({ vsid, session_secret, code }, { rejectWithValue }) => {
    try {
      return await authService.verifyRegistrationEmail({ vsid, session_secret, code })
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

export const verifyRegistrationPhoneThunk = createAsyncThunk(
  'auth/verifyRegistrationPhone',
  async ({ vsid, session_secret, code }, { rejectWithValue }) => {
    try {
      return await authService.verifyRegistrationPhone({ vsid, session_secret, code })
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

// ───── Slice ───────────────────────────────────────────────────────────────
const initialState = {
  isAuthenticated: tokenService.isAuthenticated(),
  loading: false,
  error: null,
  fieldErrors: null,

  // forgot password staging
  forgotPassword: {
    email: storage.getItem(STORAGE_KEYS.RESET_PASSWORD_EMAIL) || '',
    otp: storage.getItem(STORAGE_KEYS.RESET_PASSWORD_OTP) || '',
  },

  // signup staging
  registration: storage.getItem(STORAGE_KEYS.REGISTRATION_SESSION) || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null
      state.fieldErrors = null
    },
    setForgotPasswordEmail(state, action) {
      state.forgotPassword.email = action.payload || ''
    },
    setForgotPasswordOtp(state, action) {
      state.forgotPassword.otp = action.payload || ''
    },
    forceLogout(state) {
      state.isAuthenticated = false
      state.registration = null
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.loading = true
      state.error = null
      state.fieldErrors = null
    }
    const setError = (state, action) => {
      state.loading = false
      state.error = action.payload?.message || 'Something went wrong.'
      state.fieldErrors = action.payload?.fields || null
    }

    builder
      .addCase(loginThunk.pending, setLoading)
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(loginThunk.rejected, setError)

      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false
        state.registration = null
      })

      .addCase(forgotPasswordThunk.pending, setLoading)
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false
        state.forgotPassword.email = action.meta.arg.email
      })
      .addCase(forgotPasswordThunk.rejected, setError)

      .addCase(verifyForgotPasswordOtpThunk.pending, setLoading)
      .addCase(verifyForgotPasswordOtpThunk.fulfilled, (state, action) => {
        state.loading = false
        state.forgotPassword.otp = action.meta.arg.otp
      })
      .addCase(verifyForgotPasswordOtpThunk.rejected, setError)

      .addCase(resetPasswordThunk.pending, setLoading)
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false
        state.forgotPassword = { email: '', otp: '' }
      })
      .addCase(resetPasswordThunk.rejected, setError)

      .addCase(registerStartThunk.pending, setLoading)
      .addCase(registerStartThunk.fulfilled, (state, action) => {
        state.loading = false
        state.registration = {
          vsid: action.payload.vsid,
          session_secret: action.payload.session_secret,
          state: action.payload.state,
          email: action.meta.arg.email,
          mobile_number: action.meta.arg.mobile_number,
        }
      })
      .addCase(registerStartThunk.rejected, setError)

      .addCase(verifyRegistrationEmailThunk.pending, setLoading)
      .addCase(verifyRegistrationEmailThunk.fulfilled, (state, action) => {
        state.loading = false
        if (state.registration) {
          state.registration.state = action.payload?.state || 'phone_pending'
        }
      })
      .addCase(verifyRegistrationEmailThunk.rejected, setError)

      .addCase(verifyRegistrationPhoneThunk.pending, setLoading)
      .addCase(verifyRegistrationPhoneThunk.fulfilled, (state, action) => {
        state.loading = false
        if (state.registration) {
          state.registration.state = action.payload?.state || 'gateway_pending'
        }
      })
      .addCase(verifyRegistrationPhoneThunk.rejected, setError)
  },
})

export const {
  clearAuthError,
  setForgotPasswordEmail,
  setForgotPasswordOtp,
  forceLogout,
} = authSlice.actions

export default authSlice.reducer
