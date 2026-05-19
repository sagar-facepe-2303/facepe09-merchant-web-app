function StatusBadge({ status }) {
  const statusConfig = {
    completed: {
      className: 'status-badge-success'
    },
    successful: {
      className: 'status-badge-success'
    },
    success: {
      className: 'status-badge-success'
    },
    pending: {
      className: 'status-badge-pending'
    },
    failed: {
      className: 'status-badge-failed'
    }
  }

  const config = statusConfig[status] || statusConfig.pending
  const displayLabel = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'

  return (
    <span className={`status-badge ${config.className}`}>
      {displayLabel}
    </span>
  )
}

export default StatusBadge
