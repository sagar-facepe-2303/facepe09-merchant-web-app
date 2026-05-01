import ChartCard from './ChartCard'

function StatusDonut() {
  return (
    <ChartCard 
      title="Status Breakdown" 
      subtitle="67% increased this week"
    >
      <div className="status-donut">
        <svg viewBox="0 0 120 120" className="donut-chart">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#E7E7E7" strokeWidth="12"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#16A34A" strokeWidth="12" 
            strokeDasharray="188 126" strokeDashoffset="0" transform="rotate(-90 60 60)"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#D97706" strokeWidth="12" 
            strokeDasharray="63 251" strokeDashoffset="-188" transform="rotate(-90 60 60)"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#DC2626" strokeWidth="12" 
            strokeDasharray="63 251" strokeDashoffset="-251" transform="rotate(-90 60 60)"/>
        </svg>
        <div className="donut-center">
          <span className="donut-value">180</span>
          <span className="donut-label">Total</span>
        </div>
      </div>
      <div className="donut-legend">
        <div className="legend-item">
          <span className="legend-dot legend-dot-success"></span>
          <span className="legend-label">Success</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-dot-pending"></span>
          <span className="legend-label">Pending</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-dot-failed"></span>
          <span className="legend-label">Failed</span>
        </div>
      </div>
    </ChartCard>
  )
}

export default StatusDonut
