import apiClient from '../axiosClient'

export const profileService = {
  getProfile: () => apiClient.get('/profile').then((r) => r.data),

  updateProfile: (payload) =>
    apiClient.put('/profile', payload).then((r) => r.data),

  uploadLogo: (file) => {
    const form = new FormData()
    form.append('logo', file)
    return apiClient
      .put('/me/logo', form)
      .then((r) => r.data)
  },
}
