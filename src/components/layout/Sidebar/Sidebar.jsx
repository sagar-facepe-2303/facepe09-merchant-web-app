import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: '💳', path: '/transactions' },
    { id: 'customers', label: 'Customers', icon: '👥', path: '/customers' },
    { id: 'products', label: 'Products', icon: '📦', path: '/products' },
    { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ]

  const logoSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g filter="url(#filter0_d_1_10740)">
        <rect x="7.35986" y="5.75999" width="32" height="32" rx="6.4" fill="url(#paint0_linear_1_10740)"/>
        <path d="M18.6241 21.798H21.4994L24.6981 18.6018H18.6241V16.1452H27.1732L30.5184 12.8H17.3145C16.7802 12.8 16.2678 13.0123 15.89 13.3901C15.5122 13.7679 15.2999 14.2803 15.2999 14.8146V27.9999L18.6241 24.6594V21.798Z" fill="white"/>
        <path d="M29.7067 18.6048H27.1478L23.9515 21.8011H28.3923V24.2065H21.5531L15.0396 30.72H19.285L22.3673 27.4074H29.6951C29.9596 27.4074 30.2216 27.3553 30.466 27.2541C30.7104 27.1528 30.9325 27.0044 31.1196 26.8174C31.3066 26.6303 31.455 26.4082 31.5562 26.1638C31.6575 25.9194 31.7096 25.6574 31.7096 25.3929V20.6194C31.7096 20.0871 31.4989 19.5764 31.1236 19.199C30.7484 18.8215 30.239 18.6079 29.7067 18.6048Z" fill="white"/>
      </g>
      <defs>
        <filter id="filter0_d_1_10740" x="-0.000136554" y="-5.36442e-06" width="47.36" height="47.36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.32" dy="1.92"/>
          <feGaussianBlur stdDeviation="3.84"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.301961 0 0 0 0 0.0627451 0 0 0 0 0.878431 0 0 0 0.24 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_10740"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_10740" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_1_10740" x1="9.36936" y1="6.79851" x2="28.4067" y2="33.4301" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8F66F3"/>
          <stop offset="1" stop-color="#490ADF"/>
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

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-section">
          <div className="sidebar-logo-wrapper">
            {logoSvg}
          </div>
          <div className="sidebar-brand-text">
            <h2 className="sidebar-brand-name">FacePe</h2>
            <p className="sidebar-brand-subtitle">Admin console</p>
          </div>
        </div>
        <button className="sidebar-toggle" aria-label="Toggle sidebar">
          {menuToggleIcon}
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
