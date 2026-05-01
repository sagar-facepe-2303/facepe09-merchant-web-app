import StatusBadge from './StatusBadge'

function TransactionsTable() {
  const transactions = [
    { id: '#TXN-001', date: 'Jan 15, 2024 10:30 AM', amount: '$250.00', kiosk: 'Kiosk-001', processor: 'Stripe', status: 'success' },
    { id: '#TXN-002', date: 'Jan 15, 2024 11:45 AM', amount: '$180.00', kiosk: 'Kiosk-002', processor: 'PayPal', status: 'success' },
    { id: '#TXN-003', date: 'Jan 15, 2024 12:20 PM', amount: '$320.00', kiosk: 'Kiosk-001', processor: 'Stripe', status: 'pending' },
    { id: '#TXN-004', date: 'Jan 15, 2024 01:15 PM', amount: '$450.00', kiosk: 'Kiosk-003', processor: 'Square', status: 'failed' },
    { id: '#TXN-005', date: 'Jan 15, 2024 02:30 PM', amount: '$210.00', kiosk: 'Kiosk-002', processor: 'Stripe', status: 'success' },
    { id: '#TXN-006', date: 'Jan 15, 2024 03:45 PM', amount: '$380.00', kiosk: 'Kiosk-001', processor: 'PayPal', status: 'success' },
    { id: '#TXN-007', date: 'Jan 15, 2024 04:20 PM', amount: '$290.00', kiosk: 'Kiosk-003', processor: 'Stripe', status: 'pending' },
    { id: '#TXN-008', date: 'Jan 15, 2024 05:10 PM', amount: '$520.00', kiosk: 'Kiosk-002', processor: 'Square', status: 'failed' },
    { id: '#TXN-009', date: 'Jan 15, 2024 06:30 PM', amount: '$340.00', kiosk: 'Kiosk-001', processor: 'Stripe', status: 'success' },
    { id: '#TXN-010', date: 'Jan 15, 2024 07:45 PM', amount: '$410.00', kiosk: 'Kiosk-003', processor: 'PayPal', status: 'success' },
  ]

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
          <button className="table-action-btn" aria-label="Filter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.66699 3.33301H13.3337" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.33301 6.66667H12.6663" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.33301 10H10.6663" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="table-id">{transaction.id}</td>
                <td className="table-date">{transaction.date}</td>
                <td className="table-amount">{transaction.amount}</td>
                <td className="table-kiosk">{transaction.kiosk}</td>
                <td className="table-processor">{transaction.processor}</td>
                <td className="table-status">
                  <StatusBadge status={transaction.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transactions-table-pagination">
        <button className="pagination-btn">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn pagination-btn-next">Next</button>
      </div>
    </div>
  )
}

export default TransactionsTable
