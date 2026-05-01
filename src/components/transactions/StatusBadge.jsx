function StatusBadge({ status }) {
  const statusConfig = {
    success: {
      label: 'Success',
      className: 'status-badge-success'
    },
    pending: {
      label: 'Pending',
      className: 'status-badge-pending'
    },
    failed: {
      label: 'Failed',
      className: 'status-badge-failed'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className={`status-badge ${config.className}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
