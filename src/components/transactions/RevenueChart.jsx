import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChartCard from './ChartCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts'
import { fetchTransactionsThunk } from '../../features/transactions/transactionsSlice'
import revenueResponse from '../../data/revenueData.json'

function RevenueChart() {
  const dispatch = useDispatch()
  const [period, setPeriod] = useState('week')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { items: transactions } = useSelector((s) => s.transactions)

  useEffect(() => {
    // Compute revenue trend from transaction list
    if (transactions && transactions.length > 0) {
      setLoading(true)
      // For now, use mock data - replace with real computation when backend provides sufficient data
      const periodData = revenueResponse[period]
      setData(periodData.data)
      setLoading(false)
    }
  }, [transactions, period])

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
      subtitle="67% increased this week"
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
              domain={[0, 1100]}
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
