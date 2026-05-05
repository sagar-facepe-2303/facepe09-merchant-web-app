import { useState } from 'react'
import { jsPDF } from 'jspdf'
import facePeLogo from '../../assets/FacePe Logo SVG.svg'

// Convert an SVG URL to a PNG data URL for embedding in jsPDF
const svgUrlToPng = (url, width, height) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const scale = 3 // higher resolution for crisp print
      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = url
  })

function TransactionDrawer({ isOpen, onClose, transaction }) {
  const [isCopied, setIsCopied] = useState(false)

  if (!isOpen || !transaction) return null

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.id)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownloadPDF = async () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 40
    let y = margin

    // Brand header bar (light background so the purple logo is clearly visible)
    const headerHeight = 80
    doc.setFillColor(245, 243, 255)
    doc.rect(0, 0, pageWidth, headerHeight, 'F')
    // Thin accent line at the bottom of the header
    doc.setDrawColor(80, 0, 234)
    doc.setLineWidth(2)
    doc.line(0, headerHeight, pageWidth, headerHeight)
    doc.setLineWidth(1)

    // FacePe logo (left side of header)
    const logoSize = 40
    const logoX = margin
    const logoY = (headerHeight - logoSize) / 2
    try {
      const logoDataUrl = await svgUrlToPng(facePeLogo, logoSize, logoSize)
      doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoSize, logoSize)
    } catch (err) {
      console.warn('Failed to embed logo in PDF:', err)
    }

    // "Transaction Receipt" title vertically centered next to the logo
    const textX = logoX + logoSize + 14
    const textBaselineY = headerHeight / 2 + 6 // vertical optical center for the font size
    doc.setTextColor(16, 8, 36)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Transaction Receipt', textX, textBaselineY)

    // Generated date (right-aligned, vertically centered)
    const generatedAt = new Date().toLocaleString()
    doc.setTextColor(108, 109, 123)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(`Generated: ${generatedAt}`, pageWidth - margin, textBaselineY, { align: 'right' })

    y = 110

    // Transaction ID block
    doc.setTextColor(140, 147, 161)
    doc.setFontSize(10)
    doc.text('TRANSACTION ID', margin, y)
    y += 16
    doc.setTextColor(16, 8, 36)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(String(transaction.id || ''), margin, y)
    y += 30

    // Amount + status summary card
    doc.setDrawColor(231, 231, 231)
    doc.setFillColor(249, 250, 251)
    doc.roundedRect(margin, y, pageWidth - margin * 2, 80, 8, 8, 'FD')

    doc.setTextColor(140, 147, 161)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text('AMOUNT', margin + 16, y + 22)
    doc.setTextColor(16, 8, 36)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text(String(transaction.amount || ''), margin + 16, y + 50)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(140, 147, 161)
    doc.text('DATE / TIME', margin + 16, y + 68)
    doc.setTextColor(16, 8, 36)
    doc.setFontSize(10)
    doc.text(String(transaction.datetime || ''), margin + 80, y + 68)

    // Status pill (right side of card)
    const status = String(transaction.status || '')
    const statusColors = {
      Successful: { bg: [232, 245, 233], fg: [22, 163, 74] },
      Pending:   { bg: [255, 244, 214], fg: [217, 119, 6] },
      Failed:    { bg: [254, 226, 226], fg: [220, 38, 38] },
    }
    const sc = statusColors[status] || { bg: [243, 244, 246], fg: [55, 65, 81] }
    const pillW = 80
    const pillH = 26
    const pillX = pageWidth - margin - 16 - pillW
    const pillY = y + 24
    doc.setFillColor(...sc.bg)
    doc.roundedRect(pillX, pillY, pillW, pillH, 13, 13, 'F')
    doc.setTextColor(...sc.fg)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text(status, pillX + pillW / 2, pillY + 17, { align: 'center' })

    y += 100

    // Details
    doc.setTextColor(16, 8, 36)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('More Details', margin, y)
    y += 18

    const details = [
      ['Processor Name', transaction.processor],
      ['Processor ID', transaction.processorId || 'N/A'],
      ['Currency Type', transaction.currency || 'USD'],
      ['Kiosk Name', transaction.kiosk],
      ['Device ID', transaction.deviceId || 'N/A'],
      ['Face ID', transaction.faceId || 'N/A'],
      ['Email ID', transaction.email || 'N/A'],
    ]

    doc.setFontSize(10)
    details.forEach(([label, value]) => {
      doc.setTextColor(140, 147, 161)
      doc.setFont('helvetica', 'normal')
      doc.text(String(label), margin, y)
      doc.setTextColor(16, 8, 36)
      doc.setFont('helvetica', 'bold')
      doc.text(String(value ?? 'N/A'), pageWidth - margin, y, { align: 'right' })
      y += 18
      doc.setDrawColor(240, 240, 240)
      doc.line(margin, y - 6, pageWidth - margin, y - 6)
    })

    y += 16

    // Timeline
    if (Array.isArray(transaction.timeline) && transaction.timeline.length) {
      doc.setTextColor(16, 8, 36)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(13)
      doc.text('Timeline', margin, y)
      y += 18

      doc.setFontSize(10)
      transaction.timeline.forEach((item) => {
        // Bullet
        doc.setFillColor(80, 0, 234)
        doc.circle(margin + 4, y - 3, 3, 'F')
        doc.setTextColor(16, 8, 36)
        doc.setFont('helvetica', 'bold')
        doc.text(String(item.status || ''), margin + 16, y)
        doc.setTextColor(140, 147, 161)
        doc.setFont('helvetica', 'normal')
        doc.text(String(item.time || ''), pageWidth - margin, y, { align: 'right' })
        y += 18
      })
    }

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 30
    doc.setDrawColor(231, 231, 231)
    doc.line(margin, footerY - 12, pageWidth - margin, footerY - 12)
    doc.setTextColor(140, 147, 161)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('This is a system-generated receipt from FacePe.', margin, footerY)
    doc.text('support@facepe.com', pageWidth - margin, footerY, { align: 'right' })

    const safeId = String(transaction.id || 'transaction').replace(/[^a-zA-Z0-9-_]/g, '')
    doc.save(`FacePe-Receipt-${safeId}.pdf`)
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
