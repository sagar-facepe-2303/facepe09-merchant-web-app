import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { transactionService } from '../../api/services/transactionService'
import { parseApiError } from '../../utils/errorParser'

export const fetchTransactionsThunk = createAsyncThunk(
  'transactions/fetch',
  async (params = {}, { rejectWithValue }) => {
    try {
      return await transactionService.list(params)
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    statusFilter: 'all',
    loading: false,
    error: null,
    lastFetchedAt: null,
  },
  reducers: {
    setStatusFilter(state, action) {
      state.statusFilter = action.payload || 'all'
      state.page = 1
    },
    setPage(state, action) {
      state.page = action.payload || 1
    },
    setLimit(state, action) {
      state.limit = action.payload || 10
      state.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false
        const data = action.payload || {}
        state.items = data.transactions || data.items || []
        state.total = data.total ?? state.items.length
        state.lastFetchedAt = Date.now()
      })
      .addCase(fetchTransactionsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to load transactions'
      })
  },
})

export const { setStatusFilter, setPage, setLimit } = transactionsSlice.actions
export default transactionsSlice.reducer
