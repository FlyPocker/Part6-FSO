import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useAnecdoteStore } from './store'
import { useNotificationStore } from './notificationStore'

const App = () => {
  const initialize = useAnecdoteStore((state) => state.initialize)
  const notify = useNotificationStore((state) => state.notify)

  useEffect(() => {
    initialize().catch((error) => {
      console.error(error)
      notify('could not load anecdotes')
    })
  }, [initialize, notify])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
