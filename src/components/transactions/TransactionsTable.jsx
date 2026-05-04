import { useState } from 'react'
import StatusBadge from './StatusBadge'

function TransactionsTable() {
  const [filters, setFilters] = useState({
    date: '',
    amount: '',
    kiosk: '',
    processor: '',
    status: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const transactions = [
    { id: '#13123AEW', datetime: '14:32:15 • 25.03.2026', amount: '$30.00', kiosk: 'JGL124', processor: 'PayPal', status: 'Successful' },
    { id: '#13123AEF', datetime: '15:45:20 • 25.03.2026', amount: '$45.50', kiosk: 'ABC456', processor: 'Stripe', status: 'Successful' },
    { id: '#13123AEG', datetime: '16:22:10 • 25.03.2026', amount: '$120.00', kiosk: 'ZXC123', processor: 'PayPal', status: 'Pending' },
    { id: '#13123AEH', datetime: '17:10:05 • 25.03.2026', amount: '$75.25', kiosk: 'JGL124', processor: 'Stripe', status: 'Failed' },
    { id: '#13123AEI', datetime: '18:30:45 • 25.03.2026', amount: '$200.00', kiosk: 'ABC456', processor: 'PayPal', status: 'Successful' },
    { id: '#13123AEJ', datetime: '19:15:30 • 25.03.2026', amount: '$55.00', kiosk: 'ZXC123', processor: 'Stripe', status: 'Successful' },
    { id: '#13123AEK', datetime: '20:42:15 • 25.03.2026', amount: '$95.75', kiosk: 'JGL124', processor: 'PayPal', status: 'Pending' },
    { id: '#13123AEL', datetime: '21:20:00 • 25.03.2026', amount: '$150.00', kiosk: 'ABC456', processor: 'Stripe', status: 'Successful' },
    { id: '#13123AEM', datetime: '22:05:40 • 25.03.2026', amount: '$80.50', kiosk: 'ZXC123', processor: 'PayPal', status: 'Failed' },
    { id: '#13123AEN', datetime: '23:18:25 • 25.03.2026', amount: '$110.00', kiosk: 'JGL124', processor: 'Stripe', status: 'Successful' },
  ]

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.date && !transaction.datetime.includes(filters.date)) return false
    if (filters.amount && !transaction.amount.includes(filters.amount)) return false
    if (filters.kiosk && transaction.kiosk !== filters.kiosk) return false
    if (filters.processor && transaction.processor !== filters.processor) return false
    if (filters.status && transaction.status !== filters.status) return false
    return true
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
    setCurrentPage(1)
  }

  return (
    <div className="transactions-table-section">
      <div className="transactions-table-header">
        <div className="transactions-table-title-section">
          <h3 className="transactions-table-title">Transactions List</h3>
          <p className="transactions-table-subtitle">Click to view more details</p>
        </div>
        <div className="transactions-table-actions">
          <button className="table-action-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.0996 11.0996L13.9996 13.9996" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="table-action-btn filters-btn" aria-label="Filter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.66699 3.33301H13.3337" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.33301 6.66667H12.6663" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.33301 10H10.6663" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="transactions-filters">
        <div className="filter-field">
          <label>Search by Date</label>
          <input 
            type="date" 
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-field">
          <label>Search by Amount</label>
          <div className="filter-input-with-prefix">
            <span className="input-prefix">$</span>
            <input 
              type="text" 
              placeholder="0.00"
              value={filters.amount}
              onChange={(e) => handleFilterChange('amount', e.target.value)}
              className="filter-input"
            />
          </div>
        </div>
        <div className="filter-field">
          <label>Search by Kiosk</label>
          <select 
            value={filters.kiosk}
            onChange={(e) => handleFilterChange('kiosk', e.target.value)}
            className="filter-input"
          >
            <option value="">All</option>
            <option value="JGL124">JGL124</option>
            <option value="ABC456">ABC456</option>
            <option value="ZXC123">ZXC123</option>
          </select>
        </div>
        <div className="filter-field">
          <label>Search by Processor</label>
          <select 
            value={filters.processor}
            onChange={(e) => handleFilterChange('processor', e.target.value)}
            className="filter-input"
          >
            <option value="">All</option>
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>
        <div className="filter-field">
          <label>Search by Status</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-input"
          >
            <option value="">All</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>
      
      <div className="transactions-table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date / Time</th>
              <th>Amount</th>
              <th>Kiosk</th>
              <th>Processor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((transaction) => (
              <tr key={transaction.id}>
                <td className="table-id">{transaction.id}</td>
                <td className="table-date">{transaction.datetime}</td>
                <td className="table-amount">{transaction.amount}</td>
                <td className="table-kiosk">{transaction.kiosk}</td>
                <td className="table-processor">{transaction.processor}</td>
                <td className="table-status">
                  <StatusBadge status={transaction.status.toLowerCase()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transactions-table-footer">
        <div className="transactions-table-info">
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} results
        </div>
        <div className="transactions-table-pagination">
          <button 
            className="pagination-btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button 
              key={page} 
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button 
            className="pagination-btn pagination-btn-next"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable
