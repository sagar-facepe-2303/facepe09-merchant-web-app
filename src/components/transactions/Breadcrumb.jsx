import { Link } from 'react-router-dom'

function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/dashboard" className="breadcrumb-item">Dashboard</Link>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-item breadcrumb-item-active">Transactions</span>
    </nav>
  )
}

export default Breadcrumb
