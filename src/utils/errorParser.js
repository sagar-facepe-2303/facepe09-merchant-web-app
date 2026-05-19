/**
 * Centralized API error parser.
 * Handles both backend response shapes:
 *   { detail: "string" }
 *   { detail: { error, message, hint } }
 * Plus axios-level network errors.
 *
 * Returns:
 *   {
 *     message: string,    // human readable, safe to toast
 *     code: string|null,  // backend error code if present
 *     hint: string|null,  // optional remediation hint
 *     fields: object|null // field-level validation map for forms
 *     status: number|null // HTTP status code
 *   }
 */
export function parseApiError(error, fallback = 'Something went wrong. Please try again.') {
  // Network or no-response error
  if (!error?.response) {
    if (error?.code === 'ERR_NETWORK') {
      return {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
        hint: null,
        fields: null,
        status: null,
      }
    }
    if (error?.code === 'ECONNABORTED') {
      return {
        message: 'Request timed out. Please try again.',
        code: 'TIMEOUT',
        hint: null,
        fields: null,
        status: null,
      }
    }
    return { message: error?.message || fallback, code: null, hint: null, fields: null, status: null }
  }

  const { status, data } = error.response

  // FastAPI 422 validation: { detail: [{ loc, msg, type }] }
  if (status === 422 && Array.isArray(data?.detail)) {
    const fields = {}
    data.detail.forEach((item) => {
      const field = Array.isArray(item.loc) ? item.loc[item.loc.length - 1] : item.loc
      if (field) fields[field] = item.msg
    })
    return {
      message: data.detail[0]?.msg || 'Validation failed.',
      code: 'VALIDATION_ERROR',
      hint: null,
      fields,
      status,
    }
  }

  const detail = data?.detail

  // Structured detail object
  if (detail && typeof detail === 'object') {
    return {
      message: detail.message || fallback,
      code: detail.error || null,
      hint: detail.hint || null,
      fields: detail.fields || null,
      status,
    }
  }

  // Simple string detail
  if (typeof detail === 'string') {
    return { message: detail, code: null, hint: null, fields: null, status }
  }

  // Default by status code
  const statusMessages = {
    400: 'Invalid request.',
    401: 'Your session has expired. Please log in again.',
    403: "You don't have permission to perform this action.",
    404: 'Resource not found.',
    409: 'Conflict — this resource already exists or is in use.',
    429: 'Too many requests. Please slow down.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway.',
    503: 'Service unavailable.',
  }

  return {
    message: statusMessages[status] || fallback,
    code: null,
    hint: null,
    fields: null,
    status,
  }
}
