import Link from 'next/link'

import Button from '../button/Button'

import { useAuthContext } from '../../context/auth/authContext'
import { ACCOUNTS_FETCHED } from '../../context/auth/authReducer'
import compressAddress from '../../utilities/compressAddress'

import styles from './Header.module.scss'

export default function Header() {
  const { authState, connectWallet } = useAuthContext()

  const isConnected = [ACCOUNTS_FETCHED].includes(authState.status)
  const connectText = authState.isLoading
    ? 'Connecting'
    : isConnected
    ? compressAddress(authState.data[0])
    : 'Connect Wallet'

  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.headerTitle}>Avaxbox</a>
      </Link>

      <div className={styles.headerButtons}>
        <Link href="/messages">
          <a className={styles.headerLink}>My messages</a>
        </Link>

        <Button
          extraClassnames={styles.headerButton}
          handleClick={connectWallet}
          isActive={isConnected}
        >
          {connectText}
        </Button>
      </div>
    </div>
  )
}
