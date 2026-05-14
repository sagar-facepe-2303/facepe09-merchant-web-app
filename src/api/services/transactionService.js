import apiClient from '../axiosClient'

export const transactionService = {
  /**
   * @param {object} params
   * @param {'all'|'pending'|'completed'|'failed'} [params.status_filter]
   * @param {number} [params.page]
   * @param {number} [params.limit]
   */
  list: (params = {}) =>
    apiClient
      .get('/transactions', { params: { status_filter: 'all', ...params } })
      .then((r) => r.data),

  getById: (id) => apiClient.get(`/transactions/${id}`).then((r) => r.data),
}
