import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import statusBreakdownResponse from '../../data/statusBreakdownData.json'
import './StatusBreakdownCard.css'

function StatusBreakdownCard() {
  const [period, setPeriod] = useState('week')
  const [mainData, setMainData] = useState([])
  const [totals, setTotals] = useState({ success: 0, pending: 0, failed: 0 })
  const [selected, setSelected] = useState({ name: 'Success', value: 0 })

  useEffect(() => {
    // Simulate API call - replace with real fetch when backend is ready
    // e.g. fetch(`/api/status-breakdown?period=${period}`).then(r => r.json()).then(...)
    const fetchStatus = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const periodData = statusBreakdownResponse[period]
        setMainData(periodData.data)
        setTotals(periodData.totals)
        setSelected({ name: 'Success', value: periodData.totals.success })
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
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null
                const item = payload[0]
                if (!item?.name) return null
                return (
                  <div
                    style={{
                      background: '#100824',
                      color: '#FFFFFF',
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '12px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: item.payload?.fill || '#FFFFFF',
                      }}
                    />
                    <span>{item.name}:</span>
                    <strong>{item.value}</strong>
                  </div>
                )
              }}
            />
            {/* Background Track */}
            <Pie
              data={trackData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="100%"
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
              innerRadius="70%"
              outerRadius="100%"
              dataKey="value"
              stroke="none"
              onClick={(data) => {
                if (data && data.name) {
                  setSelected({ name: data.name, value: data.value })
                }
              }}
            >
              {mainData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Floating Badge */}
        <div className="status-breakdown-badge" title={selected.name}>
          <span className="status-breakdown-badge-value">{selected.value}</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBreakdownCard
