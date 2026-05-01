import ChartCard from './ChartCard'

function RevenueChart() {
  const weekDropdown = (
    <select className="chart-dropdown">
      <option>Week</option>
      <option>Month</option>
      <option>Year</option>
    </select>
  )

  return (
    <ChartCard 
      title="Revenue Trend" 
      subtitle="67% increased this week"
      rightAction={weekDropdown}
    >
      <div className="revenue-chart">
        <svg viewBox="0 0 280 120" className="chart-svg">
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9C6CFE" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#9C6CFE" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,100 Q30,95 60,80 T120,60 T180,40 T240,50 T280,30 L280,120 L0,120 Z" 
            fill="url(#revenueGradient)"
          />
          <path 
            d="M0,100 Q30,95 60,80 T120,60 T180,40 T240,50 T280,30" 
            fill="none" 
            stroke="#9C6CFE" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="180" cy="40" r="5" fill="#9C6CFE"/>
          <foreignObject x="150" y="5" width="60" height="24">
            <div className="chart-tooltip">$990 peak</div>
          </foreignObject>
        </svg>
        <div className="chart-x-axis">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </ChartCard>
  )
}

export default RevenueChart
