import { useEffect, useState } from 'react'
import notificationsResponse from '../../data/notificationsData.json'

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.0166 2.42505C7.25828 2.42505 5.01662 4.66672 5.01662 7.42505V9.83338C5.01662 10.3417 4.79995 11.1167 4.54162 11.55L3.58328 13.1417C2.99162 14.125 3.39995 15.2167 4.48328 15.5834C8.07495 16.7834 11.95 16.7834 15.5416 15.5834C16.55 15.25 16.9916 14.0584 16.4416 13.1417L15.4833 11.55C15.2333 11.1167 15.0166 10.3417 15.0166 9.83338V7.42505C15.0166 4.67505 12.7666 2.42505 10.0166 2.42505Z" stroke="#6C5CE7" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M11.5579 2.6667C11.2996 2.5917 11.0329 2.53337 10.7579 2.50003C9.95794 2.40003 9.19128 2.45837 8.47461 2.6667C8.71628 2.05003 9.31628 1.6167 10.0163 1.6167C10.7163 1.6167 11.3163 2.05003 11.5579 2.6667Z" stroke="#6C5CE7" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5167 15.8833C12.5167 17.2583 11.3917 18.3833 10.0167 18.3833C9.33339 18.3833 8.70006 18.1 8.25006 17.65C7.80006 17.2 7.51672 16.5666 7.51672 15.8833" stroke="#6C5CE7" strokeWidth="1.25" strokeMiterlimit="10"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.3334 10.0001C18.3334 14.6001 14.6 18.3334 10 18.3334C5.40002 18.3334 1.66669 14.6001 1.66669 10.0001C1.66669 5.40008 5.40002 1.66675 10 1.66675C14.6 1.66675 18.3334 5.40008 18.3334 10.0001Z" stroke="#616888" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.0917 12.65L10.5083 11.1083C10.0583 10.8416 9.69165 10.2 9.69165 9.67497V6.2583" stroke="#616888" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GROUP_ICONS = {
  transaction: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" stroke="#6C5CE7" strokeWidth="1.3"/>
      <path d="M6 12.5 9 9.5l2 2 3.5-3.5" stroke="#6C5CE7" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  system: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#6C5CE7" strokeWidth="1.3"/>
      <path d="M10 6.5v4M10 13.2v.3" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  reports: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4.5" y="3.5" width="11" height="13" rx="1.5" stroke="#6C5CE7" strokeWidth="1.3"/>
      <path d="M7.5 7h5M7.5 10h5M7.5 13h3" stroke="#6C5CE7" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
}

function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={`notif-checkbox ${checked ? 'checked' : ''}`}
      onClick={onChange}
    >
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6.5 5 9l4.5-5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}

function NotificationPreferencesPanel() {
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    quietHoursStart: '',
    quietHoursEnd: '',
  })
  const [groups, setGroups] = useState([])

  useEffect(() => {
    // Simulate API call - replace with real fetch when backend is ready
    // e.g. fetch('/api/notifications').then(r => r.json()).then(...)
    const fetchNotifications = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setSettings(notificationsResponse.settings)
        setGroups(notificationsResponse.groups)
      } catch (err) {
        console.error('Failed to load notifications:', err)
      }
    }
    fetchNotifications()
  }, [])

  const handleSettingChange = (field) => (e) =>
    setSettings((prev) => ({ ...prev, [field]: e.target.value }))

  const toggleChannel = (groupId, eventId, channel) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              events: g.events.map((ev) =>
                ev.id === eventId ? { ...ev, [channel]: !ev[channel] } : ev
              ),
            }
          : g
      )
    )
  }

  return (
    <div className="notifications-panel">
      {/* Notification Settings */}
      <div className="security-card">
        <div className="security-card-header">
          <BellIcon />
          <h3 className="security-card-title">Notification Settings</h3>
        </div>

        <div className="notif-settings-grid">
          <div className="form-field">
            <label className="form-label">Notification Email</label>
            <input
              className="form-input"
              value={settings.email}
              onChange={handleSettingChange('email')}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Notification Phone</label>
            <input
              className="form-input"
              value={settings.phone}
              onChange={handleSettingChange('phone')}
            />
          </div>

          <div className="form-field quiet-hours-field">
            <label className="form-label">Quiet Hours</label>
            <div className="quiet-hours-row">
              <div className="time-input-wrapper">
                <input
                  className="form-input time-input"
                  value={settings.quietHoursStart}
                  onChange={handleSettingChange('quietHoursStart')}
                />
                <span className="time-input-icon"><ClockIcon /></span>
              </div>
              <span className="quiet-hours-sep">To</span>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Quiet Hours</label>
            <div className="time-input-wrapper">
              <input
                className="form-input time-input"
                value={settings.quietHoursEnd}
                onChange={handleSettingChange('quietHoursEnd')}
              />
              <span className="time-input-icon"><ClockIcon /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Groups */}
      {groups.map((group) => (
        <div key={group.id} className="security-card notif-group-card">
          <div className="security-card-header">
            {GROUP_ICONS[group.id]}
            <h3 className="security-card-title">{group.title}</h3>
          </div>

          <div className="notif-table">
            <div className="notif-table-head">
              <div className="notif-col-event">Event</div>
              <div className="notif-col-channel">Email</div>
              <div className="notif-col-channel">SMS</div>
              <div className="notif-col-channel">In-App</div>
            </div>
            {group.events.map((ev) => (
              <div key={ev.id} className="notif-table-row">
                <div className="notif-col-event">{ev.label}</div>
                <div className="notif-col-channel">
                  <Checkbox checked={ev.email} onChange={() => toggleChannel(group.id, ev.id, 'email')} />
                </div>
                <div className="notif-col-channel">
                  <Checkbox checked={ev.sms} onChange={() => toggleChannel(group.id, ev.id, 'sms')} />
                </div>
                <div className="notif-col-channel">
                  <Checkbox checked={ev.inApp} onChange={() => toggleChannel(group.id, ev.id, 'inApp')} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationPreferencesPanel
