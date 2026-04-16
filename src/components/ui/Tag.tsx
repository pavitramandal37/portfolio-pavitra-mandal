interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'teal' | 'navy' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-muted text-foreground-muted',
  teal: 'bg-secondary/10 text-secondary',
  navy: 'bg-foreground text-background',
  rose: 'bg-accent/10 text-accent',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Tag({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: TagProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
