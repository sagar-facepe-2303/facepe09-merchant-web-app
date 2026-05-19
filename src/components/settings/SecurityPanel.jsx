import { useEffect, useState } from 'react'
import securityResponse from '../../data/securityData.json'

const PasswordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15.8333 9.16675H4.16667C3.24619 9.16675 2.5 9.91294 2.5 10.8334V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V10.8334C17.5 9.91294 16.7538 9.16675 15.8333 9.16675Z" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.83301 9.1665V5.83317C5.83301 4.7281 6.27199 3.66829 7.0534 2.88689C7.8348 2.10549 8.89461 1.6665 9.99967 1.6665C11.1047 1.6665 12.1646 2.10549 12.946 2.88689C13.7274 3.66829 14.1663 4.7281 14.1663 5.83317V9.1665" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.99967 18.3332C9.99967 18.3332 16.6663 14.9998 16.6663 9.99984V4.1665L9.99967 1.6665L3.33301 4.1665V9.99984C3.33301 14.9998 9.99967 18.3332 9.99967 18.3332Z" stroke="#5F15EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.667 2.5H3.33366C2.41318 2.5 1.66699 3.24619 1.66699 4.16667V12.5C1.66699 13.4205 2.41318 14.1667 3.33366 14.1667H16.667C17.5875 14.1667 18.3337 13.4205 18.3337 12.5V4.16667C18.3337 3.24619 17.5875 2.5 16.667 2.5Z" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66699 17.5H13.3337" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14.1667V17.5001" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const QrDecorativeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="97" height="108" viewBox="0 0 97 108" fill="none">
    <path d="M26.189 11.3906H7.75953C6.15243 11.3906 4.84961 12.6624 4.84961 14.2312V32.2219C4.84961 33.7907 6.15243 35.0625 7.75953 35.0625H26.189C27.7962 35.0625 29.099 33.7907 29.099 32.2219V14.2312C29.099 12.6624 27.7962 11.3906 26.189 11.3906Z" fill="#1A1830"/>
    <path d="M22.3096 16.125H11.6399C10.5685 16.125 9.69995 16.9729 9.69995 18.0187V28.4344C9.69995 29.4803 10.5685 30.3281 11.6399 30.3281H22.3096C23.381 30.3281 24.2496 29.4803 24.2496 28.4344V18.0187C24.2496 16.9729 23.381 16.125 22.3096 16.125Z" stroke="white" strokeWidth="1.8938"/>
    <path d="M89.2398 11.3906H70.8103C69.2032 11.3906 67.9004 12.6624 67.9004 14.2312V32.2219C67.9004 33.7907 69.2032 35.0625 70.8103 35.0625H89.2398C90.8469 35.0625 92.1497 33.7907 92.1497 32.2219V14.2312C92.1497 12.6624 90.8469 11.3906 89.2398 11.3906Z" fill="#1A1830"/>
    <path d="M85.3597 16.125H74.6899C73.6185 16.125 72.75 16.9729 72.75 18.0187V28.4344C72.75 29.4803 73.6185 30.3281 74.6899 30.3281H85.3597C86.4311 30.3281 87.2996 29.4803 87.2996 28.4344V18.0187C87.2996 16.9729 86.4311 16.125 85.3597 16.125Z" stroke="white" strokeWidth="1.8938"/>
    <path d="M26.189 72.9375H7.75953C6.15243 72.9375 4.84961 74.2093 4.84961 75.7781V93.7687C4.84961 95.3376 6.15243 96.6094 7.75953 96.6094H26.189C27.7962 96.6094 29.099 95.3376 29.099 93.7687V75.7781C29.099 74.2093 27.7962 72.9375 26.189 72.9375Z" fill="#1A1830"/>
    <path d="M22.3096 77.6719H11.6399C10.5685 77.6719 9.69995 78.5197 9.69995 79.5656V89.9812C9.69995 91.0271 10.5685 91.875 11.6399 91.875H22.3096C23.381 91.875 24.2496 91.0271 24.2496 89.9812V79.5656C24.2496 78.5197 23.381 77.6719 22.3096 77.6719Z" stroke="white" strokeWidth="1.8938"/>
    <path d="M40.7398 11.3906H34.9199C34.3842 11.3906 33.95 11.8146 33.95 12.3375V18.0187C33.95 18.5417 34.3842 18.9656 34.9199 18.9656H40.7398C41.2755 18.9656 41.7097 18.5417 41.7097 18.0187V12.3375C41.7097 11.8146 41.2755 11.3906 40.7398 11.3906Z" fill="#1A1830"/>
    <path d="M53.3494 11.3906H47.5295C46.9938 11.3906 46.5596 11.8146 46.5596 12.3375V18.0187C46.5596 18.5417 46.9938 18.9656 47.5295 18.9656H53.3494C53.8851 18.9656 54.3194 18.5417 54.3194 18.0187V12.3375C54.3194 11.8146 53.8851 11.3906 53.3494 11.3906Z" fill="#1A1830"/>
    <path d="M40.7398 23.7H34.9199C34.3842 23.7 33.95 24.1239 33.95 24.6468V30.3281C33.95 30.851 34.3842 31.275 34.9199 31.275H40.7398C41.2755 31.275 41.7097 30.851 41.7097 30.3281V24.6468C41.7097 24.1239 41.2755 23.7 40.7398 23.7Z" fill="#1A1830"/>
    <path d="M62.0799 23.7H56.26C55.7243 23.7 55.29 24.1239 55.29 24.6468V30.3281C55.29 30.851 55.7243 31.275 56.26 31.275H62.0799C62.6156 31.275 63.0498 30.851 63.0498 30.3281V24.6468C63.0498 24.1239 62.6156 23.7 62.0799 23.7Z" fill="#1A1830"/>
    <path d="M40.7398 39.7969H34.9199C34.3842 39.7969 33.95 40.2208 33.95 40.7437V46.425C33.95 46.9479 34.3842 47.3719 34.9199 47.3719H40.7398C41.2755 47.3719 41.7097 46.9479 41.7097 46.425V40.7437C41.7097 40.2208 41.2755 39.7969 40.7398 39.7969Z" fill="#1A1830"/>
    <path d="M53.3494 39.7969H47.5295C46.9938 39.7969 46.5596 40.2208 46.5596 40.7437V46.425C46.5596 46.9479 46.9938 47.3719 47.5295 47.3719H53.3494C53.8851 47.3719 54.3194 46.9479 54.3194 46.425V40.7437C54.3194 40.2208 53.8851 39.7969 53.3494 39.7969Z" fill="#1A1830"/>
    <path d="M66.9295 39.7969H61.1096C60.5739 39.7969 60.1396 40.2208 60.1396 40.7437V46.425C60.1396 46.9479 60.5739 47.3719 61.1096 47.3719H66.9295C67.4652 47.3719 67.8994 46.9479 67.8994 46.425V40.7437C67.8994 40.2208 67.4652 39.7969 66.9295 39.7969Z" fill="#1A1830"/>
    <path d="M11.6394 52.1064H5.81958C5.28388 52.1064 4.84961 52.5304 4.84961 53.0533V58.7346C4.84961 59.2575 5.28388 59.6814 5.81958 59.6814H11.6394C12.1751 59.6814 12.6094 59.2575 12.6094 58.7346V53.0533C12.6094 52.5304 12.1751 52.1064 11.6394 52.1064Z" fill="#1A1830"/>
  </svg>
)

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1.33 8s2.67-4.67 6.67-4.67S14.67 8 14.67 8s-2.67 4.67-6.67 4.67S1.33 8 1.33 8Z" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="2" stroke="#9CA3AF" strokeWidth="1.3"/>
  </svg>
)

const MonitorSmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="#6B7280" strokeWidth="1.5"/>
    <path d="M7 17h6M10 14v3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const PhoneSmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="6" y="2" width="8" height="16" rx="1.5" stroke="#6B7280" strokeWidth="1.5"/>
    <path d="M9.5 15.5h1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

function PasswordInput({ label, value, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="password-input-wrapper">
        <input
          type={show ? 'text' : 'password'}
          className="form-input"
          placeholder="Enter Password"
          value={value}
          onChange={onChange}
        />
        <button type="button" className="password-toggle" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility">
          <EyeIcon />
        </button>
      </div>
    </div>
  )
}

function SessionIcon({ device }) {
  const isPhone = /iPhone|iPad|Android/i.test(device)
  return isPhone ? <PhoneSmIcon /> : <MonitorSmIcon />
}

function SecurityPanel() {
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [twoFactor, setTwoFactor] = useState({ enabled: false, qrValue: '', backupCodes: [] })
  const [showQr, setShowQr] = useState(true)
  const [showBackup, setShowBackup] = useState(true)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    // Simulate API call - replace with real fetch when backend is ready
    // e.g. fetch('/api/security').then(r => r.json()).then(...)
    const fetchSecurity = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setTwoFactor(securityResponse.twoFactor)
        setSessions(securityResponse.activeSessions)
      } catch (err) {
        console.error('Failed to load security data:', err)
      }
    }
    fetchSecurity()
  }, [])

  const handlePasswordChange = (field) => (e) =>
    setPasswords((prev) => ({ ...prev, [field]: e.target.value }))

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    console.log('Update password:', passwords)
  }

  const handleRevoke = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  const handleDownloadBackup = () => {
    const content = twoFactor.backupCodes.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'backup-codes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const qrImgSrc = twoFactor.qrValue
    ? `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(twoFactor.qrValue)}`
    : ''

  return (
    <div className="security-panel">
      {/* Change Password */}
      <form className="security-card" onSubmit={handleUpdatePassword}>
        <div className="security-card-header">
          <PasswordIcon />
          <h3 className="security-card-title">Change Password</h3>
        </div>
        <div className="security-password-grid">
          <PasswordInput label="Current Password" value={passwords.current} onChange={handlePasswordChange('current')} />
          <PasswordInput label="New Password" value={passwords.next} onChange={handlePasswordChange('next')} />
          <PasswordInput label="Confirm Password" value={passwords.confirm} onChange={handlePasswordChange('confirm')} />
        </div>
        <div className="security-card-footer">
          <button type="submit" className="update-password-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M12.67 7.33H3.33C2.6 7.33 2 7.93 2 8.67v4.67C2 14.07 2.6 14.67 3.33 14.67h9.34c.73 0 1.33-.6 1.33-1.33V8.67c0-.74-.6-1.34-1.33-1.34Z" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.67 7.33V4.67a3.33 3.33 0 0 1 6.66 0v2.66" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Update Password
          </button>
        </div>
      </form>

      {/* Two-Factor Authentication */}
      <div className="security-card">
        <div className="security-card-header with-toggle">
          <div className="security-card-header-left">
            <ShieldIcon />
            <h3 className="security-card-title">Two-Factor Authentication</h3>
          </div>
          <button
            type="button"
            className={`tfa-toggle ${twoFactor.enabled ? 'on' : ''}`}
            onClick={() => setTwoFactor((prev) => ({ ...prev, enabled: !prev.enabled }))}
            aria-pressed={twoFactor.enabled}
            aria-label="Toggle two-factor authentication"
          >
            <span className="tfa-toggle-thumb" />
          </button>
        </div>

        {twoFactor.enabled && (
          <div className="tfa-body">
            <div className="tfa-body-header">
              <button type="button" className="tfa-chip" onClick={() => setShowQr((s) => !s)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" stroke="#1A1830" strokeWidth="1.3"/><rect x="9" y="2" width="5" height="5" stroke="#1A1830" strokeWidth="1.3"/><rect x="2" y="9" width="5" height="5" stroke="#1A1830" strokeWidth="1.3"/><rect x="10" y="10" width="1.5" height="1.5" fill="#1A1830"/><rect x="13" y="10" width="1.5" height="1.5" fill="#1A1830"/><rect x="10" y="13" width="1.5" height="1.5" fill="#1A1830"/></svg>
                {showQr ? 'Hide QR code' : 'Show QR code'}
              </button>

              <div className="tfa-header-actions">
                <button type="button" className="tfa-secondary-btn" onClick={() => setShowBackup((s) => !s)}>
                  <EyeIcon />
                  {showBackup ? 'Hide Backup codes' : 'Show Backup codes'}
                </button>
                <button type="button" className="tfa-primary-btn" onClick={handleDownloadBackup}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0 3-3m-3 3L5 7m-3 5.33V13a1.33 1.33 0 0 0 1.33 1.33h9.34A1.33 1.33 0 0 0 14 13v-.67" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download Backup Codes
                </button>
              </div>
            </div>

            <div className="tfa-content">
              {showQr && (
                <div className="tfa-qr-section">
                  <div className="tfa-qr-box">
                    {qrImgSrc ? (
                      <img src={qrImgSrc} alt="Two-factor authentication QR code" width="88" height="88" />
                    ) : (
                      <QrDecorativeIcon />
                    )}
                  </div>
                  <div className="tfa-qr-text">
                    <p className="tfa-qr-title">Scan with your authenticator app</p>
                    <p className="tfa-qr-subtitle">
                      Open Google Authenticator, Authy, or any TOTP app and scan this QR code.
                    </p>
                  </div>
                </div>
              )}

              {showBackup && (
                <div className="tfa-backup-grid">
                  {twoFactor.backupCodes.map((code, idx) => (
                    <div key={idx} className="tfa-backup-code">{code}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="security-card">
        <div className="security-card-header">
          <MonitorIcon />
          <h3 className="security-card-title">Active Sessions</h3>
        </div>
        <ul className="sessions-list">
          {sessions.map((session) => (
            <li key={session.id} className="session-item">
              <div className="session-icon"><SessionIcon device={session.device} /></div>
              <div className="session-info">
                <span className="session-device">{session.device}</span>
                <span className="session-meta">
                  <span className="session-meta-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#9CA3AF" strokeWidth="1"/><path d="M6 3.5V6l1.5 1.5" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/></svg>
                  </span>
                  {session.lastActive}
                  <span className="session-meta-sep">•</span>
                  <span className="session-meta-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 11s3.5-3 3.5-5.5a3.5 3.5 0 1 0-7 0C2.5 8 6 11 6 11Z" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="5.5" r="1.2" stroke="#9CA3AF" strokeWidth="1"/></svg>
                  </span>
                  {session.location}
                </span>
              </div>
              {session.current ? (
                <span className="session-badge current">Current</span>
              ) : (
                <button type="button" className="session-badge revoke" onClick={() => handleRevoke(session.id)}>
                  Revoke
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SecurityPanel
