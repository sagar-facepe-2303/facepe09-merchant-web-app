import { createSlice } from '@reduxjs/toolkit'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    connected: false,
    items: [],
    unreadCount: 0,
  },
  reducers: {
    setConnected(state, action) {
      state.connected = !!action.payload
    },
    addNotification(state, action) {
      state.items.unshift(action.payload)
      state.unreadCount += 1
      // keep last 50
      if (state.items.length > 50) state.items.length = 50
    },
    markAllRead(state) {
      state.unreadCount = 0
    },
    clearNotifications(state) {
      state.items = []
      state.unreadCount = 0
    },
  },
})

export const { setConnected, addNotification, markAllRead, clearNotifications } =
  notificationsSlice.actions
export default notificationsSlice.reducer
