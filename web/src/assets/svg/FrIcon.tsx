// src/assets/svg/flags/FrIcon.tsx

export const FrIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>,
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    id="flag-icons-fr"
    viewBox="0 0 512 512"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-6 h-6 ${props.className ?? ''}`}
  >
    <path fill="#fff" d="M0 0h512v512H0z" />
    <path fill="#000091" d="M0 0h170.7v512H0z" />
    <path fill="#e1000f" d="M341.3 0H512v512H341.3z" />
  </svg>
);
