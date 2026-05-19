import apiClient from '../axiosClient'

export const profileService = {
  getProfile: () => apiClient.get('/profile').then((r) => r.data),

  updateProfile: (payload) =>
    apiClient.put('/profile', payload).then((r) => r.data),

  uploadLogo: (file) => {
    if (!file) {
      console.error('No file provided to uploadLogo')
      return Promise.reject(new Error('No file provided'))
    }
    const form = new FormData()
    form.append('file', file, file.name)
    return apiClient
      .put('/me/logo', form, {
        // Remove the default JSON Content-Type so the browser auto-sets
        // multipart/form-data with the correct boundary.
        transformRequest: (data, headers) => {
          if (headers) {
            delete headers['Content-Type']
            delete headers['content-type']
          }
          return data
        },
      })
      .then((r) => r.data)
  },
}
