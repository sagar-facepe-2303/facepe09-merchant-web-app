import apiClient from '../axiosClient'

export const gatewayService = {
  list: () => apiClient.get('/gateways').then((r) => r.data),

  /**
   * @param {object} payload
   * @param {string} payload.gateway_type   e.g. 'basistheory'
   * @param {string} payload.name           Display name
   * @param {object} payload.credentials
   * @param {string} payload.target_psp     e.g. 'stripe'
   * @param {object} payload.target_psp_credentials
   * @param {boolean} [payload.is_default]
   */
  create: (payload) => apiClient.post('/gateways', payload).then((r) => r.data),
}
