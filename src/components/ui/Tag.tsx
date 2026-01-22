interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'teal' | 'navy' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-navy-100 text-navy-700',
  teal: 'bg-teal-100 text-teal-700',
  navy: 'bg-navy-900 text-white',
  rose: 'bg-rose-100 text-rose-700',
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
