import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StatusBadge from './StatusBadge'
import TransactionDrawer from './TransactionDrawer'
import {
  fetchTransactionsThunk,
  setStatusFilter,
  setPage,
} from '../../features/transactions/transactionsSlice'
import { EmptyState, Button } from '../common'

// Map UI status label → API `status_filter` value
const UI_TO_API_STATUS = {
  '': 'all',
  completed: 'completed',
  pending: 'pending',
  failed: 'failed',
}

const formatAmount = (amount, currency = 'USD') => {
  if (amount == null) return '-'
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

const formatDateTime = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function TransactionsTable() {
  const dispatch = useDispatch()
  const {
    items: transactions,
    total,
    page: currentPage,
    statusFilter,
    loading,
    error,
  } = useSelector((s) => s.transactions)

  const itemsPerPage = 7

  // Local-only filters (date / amount / kiosk / processor are filtered client-side
  // over the page returned from the API). Status filter is sent to the backend.
  const [filters, setFilters] = useState({
    date: '',
    amount: '',
    kiosk: '',
    processor: '',
    status: '',
  })

  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Initial + status-filter-driven fetch
  useEffect(() => {
    dispatch(
      fetchTransactionsThunk({
        status_filter: statusFilter,
        page: currentPage,
        limit: itemsPerPage,
      })
    )
  }, [dispatch, statusFilter, currentPage])

  const retry = () =>
    dispatch(
      fetchTransactionsThunk({
        status_filter: statusFilter,
        page: currentPage,
        limit: itemsPerPage,
      })
    )

  const filteredTransactions = useMemo(
    () =>
      (transactions || []).filter((t) => {
        const dateStr = t.created_at ? new Date(t.created_at).toISOString().slice(0, 10) : ''
        if (filters.date && dateStr !== filters.date) return false
        if (filters.amount && !String(t.amount || '').includes(filters.amount)) return false
        if (filters.kiosk && t.kiosk !== filters.kiosk) return false
        if (filters.processor && t.processor !== filters.processor) return false
        if (filters.status && t.status !== filters.status.toLowerCase()) return false
        return true
      }),
    [transactions, filters]
  )

  // Client-side pagination over filtered results
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage
  const indexOfLastItem = indexOfFirstItem + itemsPerPage
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage))

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    if (field === 'status') {
      dispatch(setStatusFilter(UI_TO_API_STATUS[value] ?? 'all'))
    }
    if (currentPage !== 1) dispatch(setPage(1))
  }

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedTransaction(null)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 7 // Maximum number of page buttons to show

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        )
      }
      return (
        <button
          key={page}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => dispatch(setPage(page))}
          disabled={loading}
        >
          {page}
        </button>
      )
    })
  }

  return (
    <>
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
              <option value="completed">Successful</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
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
                <th>Customer</th>
                <th>Gateway / Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && currentItems.length === 0 && (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`sk-${i}`}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j}><span className="skeleton-bar" /></td>
                    ))}
                  </tr>
                ))
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={6} style={{ padding: 0 }}>
                    <EmptyState
                      title="Couldn't load transactions"
                      description={error}
                      action={<Button variant="primary" onClick={retry}>Retry</Button>}
                    />
                  </td>
                </tr>
              )}

              {!loading && !error && currentItems.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 0 }}>
                    <EmptyState
                      title="No transactions found"
                      description="Try adjusting your filters or syncing data."
                    />
                  </td>
                </tr>
              )}

              {currentItems.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="table-row-clickable"
                  onClick={() => handleRowClick(transaction)}
                >
                  <td className="table-id" title={transaction.id}>
                    {String(transaction.id || '').slice(0, 18)}{String(transaction.id || '').length > 18 ? '…' : ''}
                  </td>
                  <td className="table-date">{formatDateTime(transaction.created_at)}</td>
                  <td className="table-amount">{formatAmount(transaction.amount, transaction.currency)}</td>
                  <td className="table-kiosk">{transaction.customer_name || '-'}</td>
                  <td className="table-processor" title={transaction.gateway_transaction_id || ''}>
                    {transaction.gateway_transaction_id
                      ? String(transaction.gateway_transaction_id).slice(0, 18) + '…'
                      : (transaction.description || '-')}
                  </td>
                  <td className="table-status">
                    <StatusBadge status={String(transaction.status || '').toLowerCase()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="transactions-table-footer">
          <div className="transactions-table-info">
            {filteredTransactions.length === 0
              ? `0 results`
              : `Showing ${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredTransactions.length)} of ${filteredTransactions.length} results`}
          </div>
          <div className="transactions-table-pagination">
            <button
              className="pagination-btn"
              onClick={() => dispatch(setPage(Math.max(currentPage - 1, 1)))}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className="pagination-btn pagination-btn-next"
              onClick={() => dispatch(setPage(Math.min(currentPage + 1, totalPages)))}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <TransactionDrawer 
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        transaction={selectedTransaction}
      />
    </>
  )
}

export default TransactionsTable
