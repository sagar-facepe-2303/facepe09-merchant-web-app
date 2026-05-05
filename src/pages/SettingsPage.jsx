import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader'
import MerchantProfileForm from '../components/settings/MerchantProfileForm'
import SecurityPanel from '../components/settings/SecurityPanel'
import NotificationPreferencesPanel from '../components/settings/NotificationPreferencesPanel'
import './transactions.css'
import '../components/settings/settings.css'

const TABS = [
  { id: 'profile', label: 'Merchant Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notification preferences' },
]

function SettingsPage() {
  const location = useLocation()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'profile')

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab)
    }
  }, [location.state])

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed)
  }

  return (
    <div className="transactions-page">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`transactions-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="transaction-main">
          <DashboardHeader currentPage="Settings" currentPagePath="/dashboard/settings" />

          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your profile, security, notifications, and webhooks.</p>
          </div>

          <div className="settings-tabs" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && <MerchantProfileForm />}
          {activeTab === 'security' && <SecurityPanel />}
          {activeTab === 'notifications' && <NotificationPreferencesPanel />}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
