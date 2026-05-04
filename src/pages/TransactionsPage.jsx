import Sidebar from '../components/layout/Sidebar/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader'
import RevenueChart from '../components/transactions/RevenueChart'
import StatusBreakdownCard from '../components/transactions/StatusBreakdownCard'
import VolumeBarChart from '../components/transactions/VolumeBarChart'
import TransactionsTable from '../components/transactions/TransactionsTable'
import './transactions.css'

function TransactionsPage() {
  return (
    <div className="transactions-page">
      <Sidebar />
      <div className="transactions-content">
<div className='transaction-main'>
        <DashboardHeader currentPage="Transactions" currentPagePath="/transactions" />


        <div className="transactions-title-section">
          <div className="transactions-title-text">
            <h1 className="transactions-title">All Transactions</h1>
            <p className="transactions-subtitle">Monitor and manage all payment activity across your kiosk network</p>
          </div>
          <div className="transactions-actions">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-primary">Sync Data</button>
          </div>
        </div>

        <div className="transactions-cards">
          <RevenueChart />
          <StatusBreakdownCard />
          <VolumeBarChart />
        </div>
      

        <TransactionsTable />
          </div>
      </div>
    </div>
  )
}

export default TransactionsPage
