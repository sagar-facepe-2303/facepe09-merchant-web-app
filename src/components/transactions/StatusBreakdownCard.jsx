import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import './StatusBreakdownCard.css'

function StatusBreakdownCard() {
  const weekDropdown = (
    <select className="status-breakdown-dropdown">
      <option>Week</option>
      <option>Month</option>
      <option>Year</option>
    </select>
  )

  const trackData = [{ value: 100 }]
  const mainData = [
    { name: 'Success', value: 180, fill: '#A3D18B' },
    { name: 'Pending', value: 10, fill: '#F59E0B' },
    { name: 'Failed', value: 10, fill: '#EF4444' },
  ]

  return (
    <div className="status-breakdown-card">
      {/* Header Section */}
      <div className="status-breakdown-header">
        <div className="status-breakdown-title-section">
          <h2 className="status-breakdown-title">Status Breakdown</h2>
          <p className="status-breakdown-subtitle">67% increased this week</p>
        </div>
        {weekDropdown}
      </div>

      {/* Stats Row */}
      <div className="status-breakdown-stats">
        <div className="status-breakdown-stat">
          <span className="status-breakdown-stat-number">180</span>
          <div className="status-breakdown-stat-label">
            <span className="status-breakdown-dot status-breakdown-dot-success"></span>
            <span className="status-breakdown-stat-text">Success</span>
          </div>
        </div>
        <div className="status-breakdown-stat">
          <span className="status-breakdown-stat-number">10</span>
          <div className="status-breakdown-stat-label">
            <span className="status-breakdown-dot status-breakdown-dot-pending"></span>
            <span className="status-breakdown-stat-text">Pending</span>
          </div>
        </div>
        <div className="status-breakdown-stat">
          <span className="status-breakdown-stat-number">10</span>
          <div className="status-breakdown-stat-label">
            <span className="status-breakdown-dot status-breakdown-dot-failed"></span>
            <span className="status-breakdown-stat-text">Failed</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="status-breakdown-chart-wrapper">
        <ResponsiveContainer width={300} height={200}>
          <PieChart>
            {/* Background Track */}
            <Pie
              data={trackData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={110}
              outerRadius={150}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#E6F4EA" />
            </Pie>
            {/* Main Data */}
            <Pie
              data={mainData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={110}
              outerRadius={150}
              dataKey="value"
              stroke="none"
            >
              {mainData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Floating Badge */}
        <div className="status-breakdown-badge">
          <span className="status-breakdown-badge-value">180</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBreakdownCard
