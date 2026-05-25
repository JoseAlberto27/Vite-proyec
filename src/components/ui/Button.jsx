export function Button({
  children,
  className = '',
  isLoading = false,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={`button button--${variant} ${className}`.trim()}
      disabled={isLoading || props.disabled}
      type={type}
      {...props}
    >
      {isLoading ? 'Procesando...' : children}
    </button>
  );
}
