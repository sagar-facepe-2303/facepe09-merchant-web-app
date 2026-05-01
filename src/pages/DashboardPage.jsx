import Layout from '../components/layout/Layout/Layout'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader'

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Layout>
          <DashboardHeader currentPage="Dashboard" currentPagePath="/dashboard" />
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">Welcome back, John!</h1>
            <p className="dashboard-subtitle">Here's what's happening with your store today.</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Revenue</p>
                <p className="stat-value">$24,560</p>
                <p className="stat-change stat-change-positive">+12.5%</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 11V7C16 6.46957 15.7893 5.96086 15.4142 5.58579C15.0391 5.21071 14.5304 5 14 5H10C9.46957 5 8.96086 5.21071 8.58579 5.58579C8.21071 5.96086 8 6.46957 8 7V11M3 13H21M5 13V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Orders</p>
                <p className="stat-value">1,234</p>
                <p className="stat-change stat-change-positive">+8.2%</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Customers</p>
                <p className="stat-value">892</p>
                <p className="stat-change stat-change-positive">+15.3%</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2V9H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Pending Orders</p>
                <p className="stat-value">45</p>
                <p className="stat-change stat-change-negative">-2.1%</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2 className="card-title">Recent Transactions</h2>
              <div className="transaction-list">
                <div className="transaction-item">
                  <div className="transaction-info">
                    <p className="transaction-name">Payment #1234</p>
                    <p className="transaction-date">Today, 2:30 PM</p>
                  </div>
                  <p className="transaction-amount transaction-amount-success">+$250.00</p>
                </div>
                <div className="transaction-item">
                  <div className="transaction-info">
                    <p className="transaction-name">Payment #1233</p>
                    <p className="transaction-date">Today, 1:15 PM</p>
                  </div>
                  <p className="transaction-amount transaction-amount-success">+$180.00</p>
                </div>
                <div className="transaction-item">
                  <div className="transaction-info">
                    <p className="transaction-name">Refund #892</p>
                    <p className="transaction-date">Yesterday, 5:45 PM</p>
                  </div>
                  <p className="transaction-amount transaction-amount-negative">-$45.00</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h2 className="card-title">Quick Actions</h2>
              <div className="quick-actions">
                <button className="quick-action-btn">
                  <span className="quick-action-icon">➕</span>
                  <span>Add Product</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">📤</span>
                  <span>Export Report</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">⚙️</span>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  )
}

export default DashboardPage
