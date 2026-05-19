const iconMap = {
  monitor: (
    <>
      <path
        d="M18.333 2.75H3.66634C2.65382 2.75 1.83301 3.57081 1.83301 4.58333V13.75C1.83301 14.7625 2.65382 15.5833 3.66634 15.5833H18.333C19.3455 15.5833 20.1663 14.7625 20.1663 13.75V4.58333C20.1663 3.57081 19.3455 2.75 18.333 2.75Z"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33301 19.25H14.6663"
        stroke="#6C5CE7"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 15.5833V19.2499" stroke="#6C5CE7" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.41699 10.5415C7.17638 10.5415 7.79199 9.9259 7.79199 9.1665C7.79199 8.40711 7.17638 7.7915 6.41699 7.7915C5.6576 7.7915 5.04199 8.40711 5.04199 9.1665C5.04199 9.9259 5.6576 10.5415 6.41699 10.5415Z"
        fill="#6C5CE7"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  document: (
    <>
      <path
        d="M12.8337 1.8335H5.50033C5.0141 1.8335 4.54778 2.02665 4.20396 2.37047C3.86015 2.71428 3.66699 3.1806 3.66699 3.66683V18.3335C3.66699 18.8197 3.86015 19.286 4.20396 19.6299C4.54778 19.9737 5.0141 20.1668 5.50033 20.1668H16.5003C16.9866 20.1668 17.4529 19.9737 17.7967 19.6299C18.1405 19.286 18.3337 18.8197 18.3337 18.3335V7.3335L12.8337 1.8335Z"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.833 1.8335V7.3335H18.333"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.25 11.9167H13.75" stroke="#6C5CE7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.25 15.5833H11.9167" stroke="#6C5CE7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  grid: (
    <>
      <path
        d="M18.333 6.4165H3.66634C2.65382 6.4165 1.83301 7.23732 1.83301 8.24984V17.4165C1.83301 18.429 2.65382 19.2498 3.66634 19.2498H18.333C19.3455 19.2498 20.1663 18.429 20.1663 17.4165V8.24984C20.1663 7.23732 19.3455 6.4165 18.333 6.4165Z"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6663 19.25V4.58333C14.6663 4.0971 14.4732 3.63079 14.1294 3.28697C13.7856 2.94315 13.3192 2.75 12.833 2.75H9.16634C8.68011 2.75 8.2138 2.94315 7.86998 3.28697C7.52616 3.63079 7.33301 4.0971 7.33301 4.58333V19.25"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.83301 11H20.1663" stroke="#6C5CE7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  shield: (
    <>
      <path
        d="M11.0003 20.1668C11.0003 20.1668 18.3337 16.5002 18.3337 11.0002V4.5835L11.0003 1.8335L3.66699 4.5835V11.0002C3.66699 16.5002 11.0003 20.1668 11.0003 20.1668Z"
        stroke="#6C5CE7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.25 11.0001L10.0833 12.8334L13.75 9.16675" stroke="#6C5CE7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

function FeatureIcon({ type }) {
  return (
    <span className="feature-icon" aria-hidden="true">
      <svg viewBox="0 0 22 22" width="22" height="22" fill="none" focusable="false">
        {iconMap[type]}
      </svg>
    </span>
  )
}

export default FeatureIcon
