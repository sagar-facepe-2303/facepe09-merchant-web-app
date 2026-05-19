/**
 * Dashboard Layout Component
 * Wraps dashboard pages with Header and consistent layout
 */
import Header from '../Header/Header'

function Layout({
  children,
  user,
  onLogout,
  showHeader = true,
  className = ''
}) {
  const classes = ['dashboard-layout', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {showHeader && (
        <Header user={user} onLogout={onLogout} />
      )}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
