import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ChartCard from './ChartCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Count transactions by status into period buckets
function computeVolume(transactions, period) {
  const now = new Date()
  let buckets = []

  if (period === 'week') {
    const dayOfWeek = now.getDay()
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    const monday = new Date(now)
    monday.setDate(now.getDate() - daysFromMonday)
    monday.setHours(0, 0, 0, 0)

    buckets = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return { name: DAY_NAMES[i], start: d, end: new Date(d.getTime() + 86400000), successful: 0, pending: 0, failed: 0 }
    })
  } else if (period === 'month') {
    buckets = Array.from({ length: 4 }, (_, i) => {
      const start = new Date(now)
      start.setDate(now.getDate() - (28 - i * 7))
      start.setHours(0, 0, 0, 0)
      const end = new Date(start)
      end.setDate(start.getDate() + 7)
      return { name: `Wk ${i + 1}`, start, end, successful: 0, pending: 0, failed: 0 }
    })
  } else {
    buckets = Array.from({ length: 12 }, (_, i) => {
      const start = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
      const end = new Date(now.getFullYear(), now.getMonth() - (11 - i) + 1, 1)
      return { name: MONTH_NAMES[start.getMonth()], start, end, successful: 0, pending: 0, failed: 0 }
    })
  }

  ;(transactions || []).forEach((t) => {
    const td = new Date(t.created_at)
    const bucket = buckets.find((b) => td >= b.start && td < b.end)
    if (!bucket) return
    if (t.status === 'completed') bucket.successful += 1
    else if (t.status === 'pending') bucket.pending += 1
    else if (t.status === 'failed') bucket.failed += 1
  })

  return buckets.map(({ name, successful, pending, failed }) => ({ name, successful, pending, failed }))
}

function VolumeBarChart() {
  const [period, setPeriod] = useState('week')
  const { items: transactions } = useSelector((s) => s.transactions)

  const data = useMemo(() => computeVolume(transactions, period), [transactions, period])
  const maxValue = useMemo(() => {
    const m = Math.max(
      ...data.map((d) => (d.successful || 0) + (d.pending || 0) + (d.failed || 0)),
      0
    )
    return m > 0 ? Math.ceil(m * 1.2) : 10
  }, [data])

  const weekDropdown = (
    <select
      className="chart-dropdown"
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
    >
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  )

  return (
    <ChartCard 
      title="Transaction volume" 
      subtitle={(() => {
        const peak = data.reduce((max, d) => {
          const total = (d.successful || 0) + (d.pending || 0) + (d.failed || 0)
          return total > max.total ? { name: d.name, total } : max
        }, { name: '-', total: 0 })
        return peak.total > 0 ? `Peaked on ${peak.name} (${peak.total} txns)` : 'No transactions'
      })()}
      rightAction={weekDropdown}
    >
      {/* Legend */}
      <div className="bar-legend bar-legend-above">
        <div className="legend-item">
          <span className="legend-dot legend-dot-success"></span>
          <span className="legend-label">Successful</span>
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
      
      <div className="volume-bar-chart">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} barSize={12} barCategoryGap="20%" barGap={0} margin={{ top: 10, right: 8, left: 0, bottom: 20 }}>
            <CartesianGrid vertical={false} horizontal={true} stroke="#E7E7E7" strokeWidth={1} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#8C93A1', fontFamily: 'Inter, sans-serif' }}
              tickMargin={12}
              dy={8}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#8C93A1', fontFamily: 'Inter, sans-serif' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
              allowDecimals={false}
              domain={[0, maxValue]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#100824', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                color: '#ffffff',
                padding: '8px 12px'
              }}
            />
            {/* Stacked bars: Failed (bottom), Pending (middle), Successful (top) */}
            <Bar dataKey="failed" fill="#EF4444" stackId="a" radius={[0, 0, 6, 6]} isAnimationActive={false} />
            <Bar dataKey="pending" fill="#F59E0B" stackId="a" radius={[0, 0, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="successful" fill="#ADD78A" stackId="a" radius={[6, 6, 0, 0]} background={{ fill: "#F5F5F5", radius: 6 }} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default VolumeBarChart
