import { useEffect, useState } from 'react'

import SendMessage from '../../components/forms/send-message/SendMessage'
import Message from '../../components/message/Message'

import { useAvaxboxContext } from '../../context/avaxbox/avaxboxContext'

import styles from './HomeView.module.scss'

export default function HomeView() {
  const [messages, setMessages] = useState({
    state: 'loading',
    data: [],
    error: null,
  })
  const { contractInterface, getNumOfMessages, getOwnMessages } =
    useAvaxboxContext()

  useEffect(() => {
    const onGetMessagesSuccess = (fetchedMessages) => {
      setMessages({
        state: 'success',
        data: fetchedMessages,
        error: null,
      })
    }

    const onGetNumOfMessagesSuccess = (numOfMessages) => {
      getOwnMessages({
        startIndex: 0,
        count: numOfMessages > 5 ? 5 : numOfMessages,
        onSuccess: onGetMessagesSuccess,
      })
    }

    if (contractInterface) {
      getNumOfMessages({
        onSuccess: onGetNumOfMessagesSuccess,
      })
    }
  }, [contractInterface, getNumOfMessages, getOwnMessages])

  const renderMessages = () => {
    if (!messages.data.length) {
      return <p>No messages yet</p>
    }

    return messages.data.map(({ id, date, sender, text, value }) => (
      <Message key={id} date={date} sender={sender} text={text} value={value} />
    ))
  }

  return (
    <div className={styles.home}>
      <h2>Welcome to Avaxbox</h2>
      <p>A decentralised way of sending messages on the Avalanche network</p>

      <SendMessage />

      <h3>Recent messages</h3>
      {renderMessages()}
    </div>
  )
}
