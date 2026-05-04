import ChartCard from './ChartCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function VolumeBarChart() {
  const data = [
    { name: 'Mon', success: 45, pending: 12, failed: 8 },
    { name: 'Tue', success: 52, pending: 15, failed: 10 },
    { name: 'Wed', success: 48, pending: 14, failed: 12 },
    { name: 'Thu', success: 65, pending: 18, failed: 15 },
    { name: 'Fri', success: 78, pending: 20, failed: 18 },
    { name: 'Sat', success: 55, pending: 16, failed: 11 },
    { name: 'Sun', success: 50, pending: 14, failed: 9 },
  ]

  return (
    <ChartCard 
      title="Transaction volume" 
      subtitle="Transaction peaked on Friday"
    >
      <div className="volume-bar-chart">
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} barSize={12} barGap={4}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#8C93A1', fontFamily: 'Inter, sans-serif' }}
              dy={8}
            />
            <YAxis hide={true} />
            <CartesianGrid vertical={false} horizontal={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#100824', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                color: '#ffffff'
              }}
            />
            <Bar dataKey="success" fill="#16A34A" radius={[2, 2, 0, 0]} />
            <Bar dataKey="pending" fill="#D97706" radius={[2, 2, 0, 0]} />
            <Bar dataKey="failed" fill="#DC2626" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
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
