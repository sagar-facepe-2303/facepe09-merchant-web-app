/**
 * Reusable StepHeader Component for Signup Flow
 * Shows progress through signup steps with icons and connecting lines
 */

// Step configuration with icons
const STEPS = [
  {
    id: 1,
    label: 'Create account',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 14.6666V2.66659C4 2.31296 4.14048 1.97382 4.39052 1.72378C4.64057 1.47373 4.97971 1.33325 5.33333 1.33325H10.6667C11.0203 1.33325 11.3594 1.47373 11.6095 1.72378C11.8595 1.97382 12 2.31296 12 2.66659V14.6666H4Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.99967 8H2.66634C2.31272 8 1.97358 8.14048 1.72353 8.39052C1.47348 8.64057 1.33301 8.97971 1.33301 9.33333V13.3333C1.33301 13.687 1.47348 14.0261 1.72353 14.2761C1.97358 14.5262 2.31272 14.6667 2.66634 14.6667H3.99967" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6H13.3333C13.687 6 14.0261 6.14048 14.2761 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H12" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.66699 4H9.33366" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.66699 6.6665H9.33366" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.66699 9.3335H9.33366" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.66699 12H9.33366" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 2,
    label: 'Verify phone',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14.6669 11.2802V13.2802C14.6677 13.4659 14.6297 13.6497 14.5553 13.8198C14.4809 13.9899 14.3718 14.1426 14.235 14.2681C14.0982 14.3937 13.9367 14.4892 13.7608 14.5487C13.5849 14.6082 13.3985 14.6303 13.2136 14.6136C11.1622 14.3907 9.19161 13.6897 7.46028 12.5669C5.8495 11.5433 4.48384 10.1777 3.46028 8.56689C2.3336 6.8277 1.63244 4.84756 1.41361 2.78689C1.39695 2.60254 1.41886 2.41673 1.47795 2.24131C1.53703 2.06589 1.63199 1.90469 1.75679 1.76797C1.88159 1.63126 2.03348 1.52203 2.20281 1.44724C2.37213 1.37245 2.55517 1.33374 2.74028 1.33356H4.74028C5.06382 1.33038 5.37748 1.44495 5.62279 1.65592C5.8681 1.86689 6.02833 2.15986 6.07361 2.48023C6.15803 3.12027 6.31458 3.74871 6.54028 4.35356C6.62998 4.59218 6.64939 4.8515 6.59622 5.10081C6.54305 5.35012 6.41952 5.57897 6.24028 5.76023L5.39361 6.60689C6.34265 8.27592 7.72458 9.65786 9.39361 10.6069L10.2403 9.76023C10.4215 9.58099 10.6504 9.45746 10.8997 9.40429C11.149 9.35112 11.4083 9.37053 11.6469 9.46023C12.2518 9.68593 12.8802 9.84248 13.5203 9.92689C13.8441 9.97258 14.1399 10.1357 14.3513 10.3852C14.5627 10.6348 14.6751 10.9533 14.6669 11.2802Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 3,
    label: 'Verify email',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.333 2.6665H2.66634C1.92996 2.6665 1.33301 3.26346 1.33301 3.99984V11.9998C1.33301 12.7362 1.92996 13.3332 2.66634 13.3332H13.333C14.0694 13.3332 14.6663 12.7362 14.6663 11.9998V3.99984C14.6663 3.26346 14.0694 2.6665 13.333 2.6665Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.6663 4.6665L8.68634 8.4665C8.48052 8.59545 8.24255 8.66384 7.99967 8.66384C7.7568 8.66384 7.51883 8.59545 7.31301 8.4665L1.33301 4.6665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 4,
    label: 'Connect gateway',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.333 3.3335H2.66634C1.92996 3.3335 1.33301 3.93045 1.33301 4.66683V11.3335C1.33301 12.0699 1.92996 12.6668 2.66634 12.6668H13.333C14.0694 12.6668 14.6663 12.0699 14.6663 11.3335V4.66683C14.6663 3.93045 14.0694 3.3335 13.333 3.3335Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.33301 6.6665H14.6663" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

function StepHeader({ currentStep = 1 }) {
  return (
    <ol className="step-header" aria-label="Signup progress">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id
        const isActive = currentStep === step.id
        const isUpcoming = currentStep < step.id

        return (
          <li
            key={step.id}
            className={`step-header-item ${
              isActive ? 'step-active' : ''
            } ${isCompleted ? 'step-completed' : ''} ${
              isUpcoming ? 'step-upcoming' : ''
            }`}
          >
            {/* Step bubble with number */}
            <span className="step-header-bubble">
              {String(step.id).padStart(2, '0')}
            </span>

            {/* Step icon */}
            <span className="step-header-icon" aria-hidden="true">
              {step.icon}
            </span>

            {/* Step label */}
            <span className="step-header-label">{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default StepHeader
