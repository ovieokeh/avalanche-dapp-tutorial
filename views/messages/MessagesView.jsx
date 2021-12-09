import { useEffect, useState } from 'react'

import Message from '../../components/message/Message'

import { useAvaxboxContext } from '../../context/avaxbox/avaxboxContext'

import styles from './MessagesView.module.scss'

export default function MessagesView() {
  const [messages, setMessages] = useState({
    state: 'loading',
    data: [],
    error: null,
  })
  const { getNumOfMessages, getOwnMessages } = useAvaxboxContext()

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
        count: numOfMessages,
        onSuccess: onGetMessagesSuccess,
      })
    }

    getNumOfMessages({
      onSuccess: onGetNumOfMessagesSuccess,
    })
  }, [getNumOfMessages, getOwnMessages])

  const renderMessages = () => {
    if (!messages.data.length) {
      return <p>No messages yet</p>
    }

    return messages.data.map(({ id, date, sender, text, value }) => (
      <Message key={id} date={date} sender={sender} text={text} value={value} />
    ))
  }

  return (
    <div className={styles.messages}>
      <h2>All messages</h2>

      {renderMessages()}
    </div>
  )
}
