import apiClient from '../axiosClient'

export const transactionService = {
  /**
   * @param {object} params
   * @param {'all'|'pending'|'completed'|'failed'} [params.status_filter]
   * @param {number} [params.page]
   * @param {number} [params.limit]
   * @param {string} [params.date_from] - ISO date string
   * @param {string} [params.date_to] - ISO date string
   * @param {number} [params.amount_min]
   * @param {number} [params.amount_max]
   * @param {string} [params.kiosk]
   * @param {string} [params.processor]
   */
  list: (params = {}) =>
    apiClient
      .get('/transactions', { params: { status_filter: 'all', ...params } })
      .then((r) => r.data),

  getById: (id) => apiClient.get(`/transactions/${id}`).then((r) => r.data),
}
