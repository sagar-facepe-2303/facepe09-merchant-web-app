import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import statusBreakdownResponse from '../../data/statusBreakdownData.json'
import './StatusBreakdownCard.css'

function StatusBreakdownCard() {
  const [period, setPeriod] = useState('week')
  const [mainData, setMainData] = useState([])
  const [totals, setTotals] = useState({ success: 0, pending: 0, failed: 0 })

  useEffect(() => {
    // Simulate API call - replace with real fetch when backend is ready
    // e.g. fetch(`/api/status-breakdown?period=${period}`).then(r => r.json()).then(...)
    const fetchStatus = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const periodData = statusBreakdownResponse[period]
        setMainData(periodData.data)
        setTotals(periodData.totals)
      } catch (err) {
        console.error('Failed to load status breakdown:', err)
      }
    }
    fetchStatus()
  }, [period])

  const weekDropdown = (
    <select
      className="status-breakdown-dropdown"
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
    >
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  )

  const trackData = [{ value: 100 }]

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
          <span className="status-breakdown-stat-number">{totals.success}</span>
          <div className="status-breakdown-stat-label">
            <span className="status-breakdown-dot status-breakdown-dot-success"></span>
            <span className="status-breakdown-stat-text">Success</span>
          </div>
        </div>
        <div className="status-breakdown-stat">
          <span className="status-breakdown-stat-number">{totals.pending}</span>
          <div className="status-breakdown-stat-label">
            <span className="status-breakdown-dot status-breakdown-dot-pending"></span>
            <span className="status-breakdown-stat-text">Pending</span>
          </div>
        </div>
        <div className="status-breakdown-stat">
          <span className="status-breakdown-stat-number">{totals.failed}</span>
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
          <span className="status-breakdown-badge-value">{totals.success}</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBreakdownCard
