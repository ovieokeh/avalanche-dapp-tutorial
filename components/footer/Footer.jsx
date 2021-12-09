import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.footerLink}
        href="https://ovie.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by Ovie Okeh
      </a>
    </footer>
  )
}
