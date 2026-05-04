import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ onToggle }) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
    if (onToggle) {
      onToggle(!isCollapsed)
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: '💳', path: '/dashboard/transactions' },
    { id: 'customers', label: 'Customers', icon: '👥', path: '/dashboard/customers' },
    { id: 'products', label: 'Products', icon: '📦', path: '/dashboard/products' },
    { id: 'analytics', label: 'Analytics', icon: '📈', path: '/dashboard/analytics' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
  ]

  const logoSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g filter="url(#filter0_d_1_10740)">
        <rect x="7.35986" y="5.75999" width="32" height="32" rx="6.4" fill="url(#paint0_linear_1_10740)"/>
        <path d="M18.6241 21.798H21.4994L24.6981 18.6018H18.6241V16.1452H27.1732L30.5184 12.8H17.3145C16.7802 12.8 16.2678 13.0123 15.89 13.3901C15.5122 13.7679 15.2999 14.2803 15.2999 14.8146V27.9999L18.6241 24.6594V21.798Z" fill="white"/>
        <path d="M29.7067 18.6048H27.1478L23.9515 21.8011H28.3923V24.2065H21.5531L15.0396 30.72H19.285L22.3673 27.4074H29.6951C29.9596 27.4074 30.2216 27.3553 30.466 27.2541C30.7104 27.1528 30.9325 27.0044 31.1196 26.8174C31.3066 26.6303 31.455 26.4082 31.5562 26.1638C31.6575 25.9194 31.7096 25.6574 31.7096 25.3929V20.6194C31.7096 20.0871 31.4989 19.5764 31.1236 19.199C30.7484 18.8215 30.239 18.6079 29.7067 18.6048Z" fill="white"/>
      </g>
      <defs>
        <filter id="filter0_d_1_10740" x="-0.000136554" y="-5.36442e-06" width="47.36" height="47.36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.32" dy="1.92"/>
          <feGaussianBlur stdDeviation="3.84"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.301961 0 0 0 0 0.0627451 0 0 0 0 0.878431 0 0 0 0.24 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_10740"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_10740" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_1_10740" x1="9.36936" y1="6.79851" x2="28.4067" y2="33.4301" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8F66F3"/>
          <stop offset="1" stopColor="#490ADF"/>
        </linearGradient>
      </defs>
    </svg>
  )

  const menuToggleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.3073 12.4993V7.49935C18.3073 3.33268 16.6406 1.66602 12.474 1.66602H7.47396C3.30729 1.66602 1.64062 3.33268 1.64062 7.49935V12.4993C1.64062 16.666 3.30729 18.3327 7.47396 18.3327H12.474C16.6406 18.3327 18.3073 16.666 18.3073 12.4993Z" stroke="#8C93A1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.64062 1.66602V18.3327" stroke="#8C93A1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.4732 7.86719L10.3398 10.0005L12.4732 12.1339" stroke="#8C93A1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const transactionsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3.33301 4.16667H16.6663C17.5868 4.16667 18.333 4.91286 18.333 5.83333V14.1667C18.333 15.0871 17.5868 15.8333 16.6663 15.8333H3.33301C2.41254 15.8333 1.66634 15.0871 1.66634 14.1667V5.83333C1.66634 4.91286 2.41254 4.16667 3.33301 4.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.6665 8.33333H18.3332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const settingsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8.05843 3.44744C8.15284 2.44644 8.99346 1.68164 9.99916 1.68164C11.0049 1.68164 11.8455 2.44644 11.9399 3.44744C11.9962 4.08179 12.3574 4.64799 12.907 4.96459C13.4566 5.28119 14.1276 5.31053 14.7061 5.04208C15.6196 4.62846 16.6988 4.97459 17.2007 5.84328C17.7026 6.71197 17.4633 7.81981 16.6477 8.40402C16.1275 8.76907 15.8184 9.36474 15.8184 9.99996C15.8184 10.6352 16.1275 11.2309 16.6477 11.5959C17.4633 12.1801 17.7026 13.288 17.2007 14.1567C16.6988 15.0254 15.6196 15.3715 14.7061 14.9579C14.1276 14.6894 13.4566 14.7188 12.907 15.0354C12.3574 15.352 11.9962 15.9182 11.9399 16.5525C11.8455 17.5535 11.0049 18.3183 9.99916 18.3183C8.99346 18.3183 8.15284 17.5535 8.05843 16.5525C8.00224 15.9198 7.64088 15.3532 7.09065 15.0355C6.54042 14.7177 5.86851 14.6885 5.28957 14.9579C4.37609 15.3715 3.2969 15.0254 2.79501 14.1567C2.29312 13.288 2.53237 12.1801 3.34794 11.5959C3.86817 11.2309 4.17728 10.6352 4.17728 9.99996C4.17728 9.36474 3.86817 8.76907 3.34794 8.40402C2.53463 7.81947 2.29587 6.71273 2.79717 5.84464C3.29847 4.97655 4.37685 4.63001 5.29005 5.04208C5.86859 5.31053 6.53966 5.28119 7.08924 4.96459C7.63882 4.64799 7.99989 4.08179 8.05622 3.44744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 10C7.5 11.3807 8.61929 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const helpIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6025 18.3332 10.0001C18.3332 5.39771 14.6022 1.66675 9.99984 1.66675C5.39746 1.66675 1.6665 5.39771 1.6665 10.0001C1.6665 14.6025 5.39746 18.3334 9.99984 18.3334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5752 7.29158C7.66305 6.88354 7.90212 6.52519 8.2452 6.2866C8.58829 6.04801 9.01017 5.94608 9.43107 6.0013C9.85196 6.05652 10.2401 6.26512 10.5182 6.58675C10.7963 6.90838 10.9448 7.32051 10.9352 7.74492C10.9352 8.74992 9.39354 9.29159 9.39354 9.29159V10.2083" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.99976 12.7083H10.0081" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const feedbackIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16.6665 1.66675H3.33317C2.4127 1.66675 1.6665 2.41294 1.6665 3.33341V13.3334C1.6665 14.2539 2.4127 15.0001 3.33317 15.0001H5.83317V18.3334L10.8332 15.0001H16.6665C17.587 15.0001 18.3332 14.2539 18.3332 13.3334V3.33341C18.3332 2.41294 17.587 1.66675 16.6665 1.66675Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const logoutIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3335 14.1666L17.5002 9.99992L13.3335 5.83325" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-section">
          <div className="sidebar-logo-wrapper">
            {logoSvg}
          </div>
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <h2 className="sidebar-brand-name">FacePe</h2>
              <p className="sidebar-brand-subtitle">Admin console</p>
            </div>
          )}
        </div>
        <button className="sidebar-toggle" onClick={handleToggle} aria-label="Toggle sidebar">
          {menuToggleIcon}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        {/* MAIN Section */}
        <div className="sidebar-section">
          {!isCollapsed && <span className="sidebar-section-label">MAIN</span>}
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <Link
                to="/dashboard/transactions"
                className={`sidebar-link ${isActive('/dashboard/transactions') ? 'active' : ''}`}
                aria-current={isActive('/dashboard/transactions') ? 'page' : undefined}
              >
                <span className="sidebar-icon" aria-hidden="true">{transactionsIcon}</span>
                {!isCollapsed && <span className="sidebar-label">Transactions</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* SYSTEM Section */}
        <div className="sidebar-section">
          {!isCollapsed && <span className="sidebar-section-label">SYSTEM</span>}
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <Link
                to="/dashboard/settings"
                className={`sidebar-link ${isActive('/dashboard/settings') ? 'active' : ''}`}
                aria-current={isActive('/dashboard/settings') ? 'page' : undefined}
              >
                <span className="sidebar-icon" aria-hidden="true">{settingsIcon}</span>
                {!isCollapsed && <span className="sidebar-label">Settings</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <ul className="sidebar-footer-menu">
          <li className="sidebar-menu-item">
            <Link to="/help" className="sidebar-link">
              <span className="sidebar-icon" aria-hidden="true">{helpIcon}</span>
              {!isCollapsed && <span className="sidebar-label">Help</span>}
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/feedback" className="sidebar-link">
              <span className="sidebar-icon" aria-hidden="true">{feedbackIcon}</span>
              {!isCollapsed && <span className="sidebar-label">Feedback</span>}
            </Link>
          </li>
        </ul>

        {!isCollapsed && (
          <div className="sidebar-user-card">
            <div className="sidebar-user-avatar">
              <span>JD</span>
            </div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">John Doe</p>
              <p className="sidebar-user-role">Admin</p>
            </div>
            <button className="sidebar-logout" aria-label="Logout">
              {logoutIcon}
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
