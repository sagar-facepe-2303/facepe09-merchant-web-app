import { useEffect, useState } from 'react'
import ChartCard from './ChartCard'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import statusBreakdownResponse from '../../data/statusBreakdownData.json'

const COLOR_MAP = {
  Success: '#16A34A',
  Pending: '#D97706',
  Failed: '#DC2626'
}

function StatusDonut() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Simulate API call - replace with real fetch when backend is ready
    // e.g. fetch('/api/status-breakdown?period=week').then(r => r.json()).then(...)
    const fetchStatus = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const mapped = statusBreakdownResponse.week.data.map((item) => ({
          name: item.name,
          value: item.value,
          color: COLOR_MAP[item.name] || item.fill
        }))
        setData(mapped)
      } catch (err) {
        console.error('Failed to load status breakdown:', err)
      }
    }
    fetchStatus()
  }, [])

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <ChartCard 
      title="Status Breakdown" 
      subtitle="67% increased this week"
    >
      <div className="status-donut">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
              formatter={(value, name) => [value, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <span className="donut-value">{total}</span>
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
