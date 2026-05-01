function ChartCard({ title, subtitle, rightAction, children }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title-section">
          <h3 className="chart-card-title">{title}</h3>
          <p className="chart-card-subtitle">{subtitle}</p>
        </div>
        {rightAction && <div className="chart-card-action">{rightAction}</div>}
      </div>
      <div className="chart-card-content">
        {children}
      </div>
    </div>
  )
}

export default ChartCard
