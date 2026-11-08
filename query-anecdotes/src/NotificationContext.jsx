import { createContext, useState } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('')

  const notify = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => setMessage(''), 5000)
  }

  return (
    <NotificationContext.Provider value={{ message, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
