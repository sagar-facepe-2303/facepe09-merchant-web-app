import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ChartCard from './ChartCard'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Compute revenue trend buckets from completed transactions
function computeRevenueTrend(transactions, period) {
  const completed = (transactions || []).filter((t) => t.status === 'completed')
  const now = new Date()

  if (period === 'week') {
    // Last 7 days, always ordered Mon-Sun
    const dayOfWeek = now.getDay()
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    const monday = new Date(now)
    monday.setDate(now.getDate() - daysFromMonday)
    monday.setHours(0, 0, 0, 0)

    const buckets = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return { name: DAY_NAMES[i], date: d, value: 0 }
    })
    completed.forEach((t) => {
      const td = new Date(t.created_at)
      const bucket = buckets.find(
        (b) => td >= b.date && td < new Date(b.date.getTime() + 86400000)
      )
      if (bucket) bucket.value += Number(t.amount || 0)
    })
    return buckets.map(({ name, value }) => ({ name, value: Math.round(value * 100) / 100 }))
  }

  if (period === 'month') {
    // Last 30 days, grouped into 4 weekly buckets
    const buckets = Array.from({ length: 4 }, (_, i) => {
      const start = new Date(now)
      start.setDate(now.getDate() - (28 - i * 7))
      start.setHours(0, 0, 0, 0)
      const end = new Date(start)
      end.setDate(start.getDate() + 7)
      return { name: `Wk ${i + 1}`, start, end, value: 0 }
    })
    completed.forEach((t) => {
      const td = new Date(t.created_at)
      const bucket = buckets.find((b) => td >= b.start && td < b.end)
      if (bucket) bucket.value += Number(t.amount || 0)
    })
    return buckets.map(({ name, value }) => ({ name, value: Math.round(value * 100) / 100 }))
  }

  // year - last 12 months
  const buckets = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
    return { name: MONTH_NAMES[d.getMonth()], year: d.getFullYear(), month: d.getMonth(), value: 0 }
  })
  completed.forEach((t) => {
    const td = new Date(t.created_at)
    const bucket = buckets.find((b) => b.year === td.getFullYear() && b.month === td.getMonth())
    if (bucket) bucket.value += Number(t.amount || 0)
  })
  return buckets.map(({ name, value }) => ({ name, value: Math.round(value * 100) / 100 }))
}

function RevenueChart() {
  const [period, setPeriod] = useState('week')
  const { items: transactions } = useSelector((s) => s.transactions)

  const data = useMemo(() => computeRevenueTrend(transactions, period), [transactions, period])
  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data])
  const yMax = useMemo(() => {
    const m = Math.max(...data.map((d) => d.value), 0)
    return m > 0 ? Math.ceil(m * 1.2) : 100
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
      title="Revenue Trend"
      subtitle={`Total: $${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      rightAction={weekDropdown}
    >
      <div className="revenue-chart">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9C6CFE" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#9C6CFE" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#E7E7E7"
              strokeWidth={1}
              strokeDasharray="0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#8C93A1', fontFamily: 'Inter, sans-serif' }}
              dy={5}
              interval={0}
            />
            <YAxis
              hide={true}
              domain={[0, yMax]}
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
              formatter={(value) => `$${value}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#9C6CFE"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#9C6CFE', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default RevenueChart
