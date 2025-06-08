import './button.css';

interface ButtonProps {
  primary?: boolean;
  className?: string;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  className,
  icon: Icon,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        mode,
        className,
      ].join(' ')}
      style={{ backgroundColor }}
      {...props}>
      {Icon} {label}
    </button>
  );
};
