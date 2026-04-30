import { useNavigate } from 'react-router-dom'

function CtaButtons({ loginText, signupText }) {
  const navigate = useNavigate()

  return (
    <div className="cta-buttons">
      <button
        type="button"
        className="btn btn-light btn-theme-outline"
        onClick={() => navigate('/login')}
      >
        <span className="btn-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <path
              d="M10 2.2A7.8 7.8 0 1 0 17.8 10 7.81 7.81 0 0 0 10 2.2Zm0 1.8A6 6 0 1 1 4 10a6.01 6.01 0 0 1 6-6Zm-.9 2.6a.9.9 0 0 1 1.8 0V9h2.3a.9.9 0 0 1 0 1.8H10a.9.9 0 0 1-.9-.9V6.6Z"
              fill="currentColor"
            />
          </svg>
        </span>
        {loginText}
      </button>
      <button type="button" className="btn btn-primary btn-theme-primary">
        <span className="btn-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <path
              d="M5.2 3.6A2.6 2.6 0 0 0 2.6 6.2v7.6a2.6 2.6 0 0 0 2.6 2.6h9.6a2.6 2.6 0 0 0 2.6-2.6V6.2a2.6 2.6 0 0 0-2.6-2.6H5.2Zm0 1.8h9.6a.8.8 0 0 1 .8.8v7.6a.8.8 0 0 1-.8.8H5.2a.8.8 0 0 1-.8-.8V6.2a.8.8 0 0 1 .8-.8Zm1.5 1.4a.9.9 0 1 0 0 1.8h6.6a.9.9 0 1 0 0-1.8H6.7Zm0 3.2a.9.9 0 1 0 0 1.8h3.5a.9.9 0 0 0 0-1.8H6.7Z"
              fill="currentColor"
            />
          </svg>
        </span>
        {signupText}
      </button>
    </div>
  )
}

export default CtaButtons
