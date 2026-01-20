// src/assets/svg/FlowForgeIcon.tsx

export const FlowForgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>,
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 140"
    fill="none"
    strokeWidth={1.5}
    className={`w-15 h-10 ${props.className ?? ''}`}
  >
    {/* Lines (workflow paths) */}
    <line
      x1="30"
      y1="60"
      x2="80"
      y2="30"
      stroke="#6366F1"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="80"
      y1="30"
      x2="130"
      y2="60"
      stroke="#6366F1"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="130"
      y1="60"
      x2="180"
      y2="30"
      stroke="#6366F1"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <line
      x1="130"
      y1="60"
      x2="180"
      y2="90"
      stroke="#6366F1"
      strokeWidth="10"
      strokeLinecap="round"
    />

    {/* Nodes */}
    <circle cx="30" cy="60" r="15" fill="#475569" />
    <circle cx="80" cy="30" r="15" fill="#475569" />
    <circle cx="130" cy="60" r="20" fill="#8B5CF6" />
    <circle cx="180" cy="30" r="15" fill="#475569" />
    <circle cx="180" cy="90" r="15" fill="#475569" />
  </svg>
);
