import compressAddress from '../../utilities/compressAddress'

import styles from './Message.module.scss'

export default function Message({ date, sender, value, text }) {
  return (
    <div className={styles.message}>
      <div className={styles.messageInfo}>
        <p className={styles.messageSender}>
          From: {compressAddress(sender)}
          <span className={styles.messageDate}>
            {date.toLocaleDateString()}
          </span>
        </p>
        <p className={styles.messageTip}>{value} AVAX</p>
      </div>

      <p className={styles.messageText}>{text}</p>
    </div>
  )
}
