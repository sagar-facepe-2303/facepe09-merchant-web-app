import ChartCard from './ChartCard'

function VolumeBarChart() {
  return (
    <ChartCard 
      title="Transaction volume" 
      subtitle="Transaction peaked on Friday"
    >
      <div className="volume-bar-chart">
        <svg viewBox="0 0 280 120" className="chart-svg">
          <g className="bar-group">
            <rect x="10" y="60" width="20" height="40" fill="#16A34A" rx="2"/>
            <rect x="10" y="45" width="20" height="15" fill="#D97706" rx="2"/>
            <rect x="10" y="35" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
          <g className="bar-group">
            <rect x="50" y="50" width="20" height="50" fill="#16A34A" rx="2"/>
            <rect x="50" y="40" width="20" height="10" fill="#D97706" rx="2"/>
            <rect x="50" y="30" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
          <g className="bar-group">
            <rect x="90" y="55" width="20" height="45" fill="#16A34A" rx="2"/>
            <rect x="90" y="45" width="20" height="10" fill="#D97706" rx="2"/>
            <rect x="90" y="35" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
          <g className="bar-group">
            <rect x="130" y="40" width="20" height="60" fill="#16A34A" rx="2"/>
            <rect x="130" y="30" width="20" height="10" fill="#D97706" rx="2"/>
            <rect x="130" y="20" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
          <g className="bar-group">
            <rect x="170" y="30" width="20" height="70" fill="#16A34A" rx="2"/>
            <rect x="170" y="20" width="20" height="10" fill="#D97706" rx="2"/>
            <rect x="170" y="10" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
          <g className="bar-group">
            <rect x="210" y="50" width="20" height="50" fill="#16A34A" rx="2"/>
            <rect x="210" y="40" width="20" height="10" fill="#D97706" rx="2"/>
            <rect x="210" y="30" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
          <g className="bar-group">
            <rect x="250" y="55" width="20" height="45" fill="#16A34A" rx="2"/>
            <rect x="250" y="45" width="20" height="10" fill="#D97706" rx="2"/>
            <rect x="250" y="35" width="20" height="10" fill="#DC2626" rx="2"/>
          </g>
        </svg>
        <div className="chart-x-axis">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
      <div className="bar-legend">
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

export default VolumeBarChart
