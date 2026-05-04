import { useState } from 'react'

function TransactionDrawer({ isOpen, onClose, transaction }) {
  const [isCopied, setIsCopied] = useState(false)

  if (!isOpen || !transaction) return null

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.id)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownloadPDF = () => {
    // PDF generation temporarily disabled - will be re-enabled after fixing jsPDF import
    alert('PDF download feature coming soon!')
  }

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="transaction-drawer">
        {/* Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">Transaction ID</h2>
          <div className="drawer-id-section">
            <span className="drawer-id">{transaction.id}</span>
            <button 
              className="copy-id-btn" 
              onClick={handleCopyId}
              aria-label="Copy transaction ID"
            >
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.3333 5.33333V10.6667C13.3333 11.0203 13.1929 11.3594 12.9428 11.6095C12.6928 11.8595 12.3536 12 12 12H4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.33333 8.66667L2.66667 6L5.33333 3.33333" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10.6667 10.6667V6.66667C10.6667 6.31305 10.5262 5.97391 10.2761 5.72386C10.0261 5.47381 9.68696 5.33333 9.33333 5.33333H5.33333" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66667 3.33333L4 6L6.66667 8.66667" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close drawer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#8C93A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {/* Summary Section */}
          <div className="drawer-summary">
            <div className="summary-amount">{transaction.amount}</div>
            <div className="summary-datetime">{transaction.datetime}</div>
            <div className={`summary-status summary-status-${transaction.status.toLowerCase()}`}>
              {transaction.status}
            </div>
          </div>

          {/* More Details Section */}
          <div className="drawer-details">
            <h3 className="details-title">More Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Processor Name</span>
                <span className="detail-value">{transaction.processor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Processor ID</span>
                <span className="detail-value">{transaction.processorId || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Currency Type</span>
                <span className="detail-value">{transaction.currency || 'USD'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Kiosk Name</span>
                <span className="detail-value">{transaction.kiosk}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Device ID</span>
                <span className="detail-value">{transaction.deviceId || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Face ID</span>
                <span className="detail-value">{transaction.faceId || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email ID</span>
                <span className="detail-value">{transaction.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="drawer-timeline">
            <h3 className="timeline-title">Timeline</h3>
            <div className="timeline-list">
              {transaction.timeline && transaction.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M8.5 2.5L4 7L1.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-status">{item.status}</span>
                    <span className="timeline-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="drawer-footer">
          <button className="download-receipt-btn" onClick={handleDownloadPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 12.5V2.5M10 12.5L6.66667 9.16667M10 12.5L13.3333 9.16667M2.5 12.5V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Receipt
          </button>
        </div>
      </div>
    </>
  )
}

export default TransactionDrawer
