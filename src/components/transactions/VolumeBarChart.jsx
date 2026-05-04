import ChartCard from './ChartCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function VolumeBarChart() {
  const weekDropdown = (
    <select className="chart-dropdown">
      <option>Week</option>
      <option>Month</option>
      <option>Year</option>
    </select>
  )

  const data = [
    { name: 'Mon', failed: 1500, pending: 2000, successful: 3500, max: 10000 },
    { name: 'Tue', failed: 1800, pending: 2200, successful: 4000, max: 10000 },
    { name: 'Wed', failed: 1600, pending: 2100, successful: 3800, max: 10000 },
    { name: 'Thu', failed: 2000, pending: 2500, successful: 4500, max: 10000 },
    { name: 'Fri', failed: 2200, pending: 2800, successful: 5500, max: 10000 },
    { name: 'Sat', failed: 1700, pending: 2300, successful: 4000, max: 10000 },
    { name: 'Sun', failed: 1500, pending: 2000, successful: 3700, max: 10000 },
  ]

  return (
    <ChartCard 
      title="Transaction volume" 
      subtitle="Transaction peaked on Friday"
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
          <BarChart data={data} barSize={12} barCategoryGap="40px" barGap={0} margin={{ top: 10, right: 0, left: 0, bottom: 20 }}>
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
              tickFormatter={(v) => v === 0 ? '0k' : v / 1000 + 'k'}
              domain={[0, 10000]}
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
