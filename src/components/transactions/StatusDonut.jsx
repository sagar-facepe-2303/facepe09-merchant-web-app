import ChartCard from './ChartCard'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

function StatusDonut() {
  const data = [
    { name: 'Success', value: 120, color: '#16A34A' },
    { name: 'Pending', value: 40, color: '#D97706' },
    { name: 'Failed', value: 20, color: '#DC2626' },
  ]

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
