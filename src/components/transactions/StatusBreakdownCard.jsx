import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import './StatusBreakdownCard.css'

const STATUS_COLORS = {
  Success: '#34A853',
  Pending: '#FBBC04',
  Failed: '#EA4335',
}

// Filter transactions to those falling within the selected period
function filterByPeriod(transactions, period) {
  const now = new Date()
  const cutoff = new Date(now)
  if (period === 'week') cutoff.setDate(now.getDate() - 7)
  else if (period === 'month') cutoff.setDate(now.getDate() - 30)
  else cutoff.setFullYear(now.getFullYear() - 1)
  return (transactions || []).filter((t) => {
    const td = new Date(t.created_at)
    return td >= cutoff && td <= now
  })
}

function StatusBreakdownCard() {
  const [period, setPeriod] = useState('week')
  const [selected, setSelected] = useState({ name: 'Success', value: 0 })
  const { items: transactions } = useSelector((s) => s.transactions)

  const { mainData, totals } = useMemo(() => {
    const filtered = filterByPeriod(transactions, period)
    const success = filtered.filter((t) => t.status === 'completed').length
    const pending = filtered.filter((t) => t.status === 'pending').length
    const failed = filtered.filter((t) => t.status === 'failed').length
    return {
      totals: { success, pending, failed },
      mainData: [
        { name: 'Success', value: success, fill: STATUS_COLORS.Success },
        { name: 'Pending', value: pending, fill: STATUS_COLORS.Pending },
        { name: 'Failed', value: failed, fill: STATUS_COLORS.Failed },
      ].filter((d) => d.value > 0),
    }
  }, [transactions, period])

  useEffect(() => {
    setSelected({ name: 'Success', value: totals.success })
  }, [totals.success])

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
          <p className="status-breakdown-subtitle">{totals.success + totals.pending + totals.failed} transactions this {period}</p>
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
        {/* <div className="status-breakdown-badge" title={selected.name}>
          <span className="status-breakdown-badge-value">{selected.value}</span>
        </div> */}
      </div>
    </div>
  )
}

export default StatusBreakdownCard
