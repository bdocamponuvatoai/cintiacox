// Functional icons only. Decorative icons are deliberately not part of the design.
type IconProps = { size?: number; className?: string };

function Svg({ size = 20, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Svg {...props}>
      <path
        d="M12 20.5s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.6 3.5h2.6l1.4 4-2 1.3a12 12 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6A1.6 1.6 0 0 1 18.9 19 15.4 15.4 0 0 1 5 5.1a1.6 1.6 0 0 1 1.6-1.6Z" />
    </Svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M14 7l5 5-5 5" />
    </Svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 16 16.5 7.5M9.5 7.5h7v7" />
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
    </Svg>
  );
}

export function ResetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9M4.5 4.5V9H9" />
    </Svg>
  );
}
