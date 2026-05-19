import Sidebar from '../components/layout/Sidebar/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader'
import RevenueChart from '../components/transactions/RevenueChart'
import StatusBreakdownCard from '../components/transactions/StatusBreakdownCard'
import VolumeBarChart from '../components/transactions/VolumeBarChart'
import TransactionsTable from '../components/transactions/TransactionsTable'
import './transactions.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const formatAmount = (amount, currency = 'USD') => {
  if (amount == null) return ''
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

const formatDateTime = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function TransactionsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const transactions = useSelector((state) => state.transactions.items || [])

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed)
  }

  const handleExportCsv = () => {
    if (!transactions.length) return

    const headers = ['Transaction ID', 'Date / Time', 'Amount', 'Customer', 'Gateway / Description', 'Status']
    const rows = transactions.map((transaction) => [
      transaction.id || '',
      formatDateTime(transaction.created_at),
      formatAmount(transaction.amount, transaction.currency),
      transaction.customer_name || '',
      transaction.gateway_transaction_id || transaction.description || '',
      transaction.status || '',
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\r\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `transactions-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="transactions-page">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`transactions-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
<div className='transaction-main'>
        <DashboardHeader currentPage="Transactions" currentPagePath="/transactions" />

        <div className="transactions-title-section">
          <div className="transactions-title-text">
            <h1 className="transactions-title">All Transactions</h1>
            <p className="transactions-subtitle">Monitor and manage all payment activity across your kiosk network</p>
          </div>
          <div className="transactions-actions">
            <button className="btn-secondary" onClick={handleExportCsv} disabled={transactions.length === 0}>
              Export CSV
            </button>
            {/* <button className="btn-primary">Sync Data</button> */}
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
