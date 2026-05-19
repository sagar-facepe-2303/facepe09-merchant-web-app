import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { profileService } from '../../api/services/profileService'
import { parseApiError } from '../../utils/errorParser'

export const fetchProfileThunk = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await profileService.getProfile()
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

export const uploadLogoThunk = createAsyncThunk(
  'profile/uploadLogo',
  async (file, { rejectWithValue }) => {
    try {
      return await profileService.uploadLogo(file)
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.data = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to load profile'
      })
      .addCase(uploadLogoThunk.fulfilled, (state, action) => {
        if (state.data) {
          state.data.logo_url = action.payload?.logo_url || state.data.logo_url
        }
      })
      .addCase(uploadLogoThunk.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to upload logo'
      })
  },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
