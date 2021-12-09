import { useState } from 'react'

import { useAvaxboxContext } from '../../../context/avaxbox/avaxboxContext'

import styles from './SendMessage.module.scss'

export default function SendMessage() {
  const [formState, setFormState] = useState({
    text: '',
    value: '',
    receiver: '',
  })
  const [transactionState, setTransactionState] = useState({
    state: 'initial',
    data: null,
    error: null,
  })

  const { sendMessage } = useAvaxboxContext()

  const handleInputChange = (event) => {
    const {
      target: { name, value },
    } = event

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }))

    if (transactionState.state === 'success') {
      setTransactionState({
        state: 'initial',
        data: null,
        error: null,
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setTransactionState((prevTransactionState) => ({
      ...prevTransactionState,
      state: 'loading',
    }))

    const onSuccess = (data) => {
      setTransactionState({
        state: 'success',
        data,
        error: null,
      })

      setFormState({
        text: '',
        value: '',
        receiver: '',
      })
    }

    const onError = (error) => {
      setTransactionState({
        state: 'error',
        data: null,
        error,
      })
    }

    sendMessage({ messageData: formState, onSuccess, onError })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        <span className={styles.formLabelText}>Text* </span>
        <textarea
          className={styles.formTextarea}
          name="text"
          value={formState.text}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className={styles.formLabel}>
        <span className={styles.formLabelText}>Receiver address* </span>
        <input
          className={styles.formInput}
          name="receiver"
          value={formState.receiver}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className={styles.formLabel}>
        <span className={styles.formLabelText}>Amount in AVAX </span>
        <input
          className={styles.formInput}
          name="value"
          value={formState.value}
          onChange={handleInputChange}
        />
      </label>

      {transactionState.state === 'success' ? (
        <p className={styles.formNotification}>Message sent successfully</p>
      ) : (
        ''
      )}
      <button className={styles.formSubmit} type="submit">
        {transactionState.state === 'loading'
          ? 'Sending message...'
          : 'Send message'}
      </button>
    </form>
  )
}
