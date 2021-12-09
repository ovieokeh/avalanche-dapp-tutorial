import styles from './Button.module.scss'

export default function Button({
  children,
  handleClick,
  isActive,
  extraClassnames,
  ...rest
}) {
  const className = `${styles.button} ${isActive ? styles.buttonActive : ''} ${
    extraClassnames ? extraClassnames : ''
  }`.trim()

  return (
    <button className={className} type="button" onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}
