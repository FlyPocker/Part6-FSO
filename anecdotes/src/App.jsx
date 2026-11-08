import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useAnecdoteActions } from './store'
import anecdoteService from './services/anecdotes'
import { useNotificationStore } from './notificationStore'

const App = () => {
  const { setAnecdotes } = useAnecdoteActions()
  const notify = useNotificationStore((state) => state.notify)

  useEffect(() => {
    anecdoteService.getAll().then(setAnecdotes).catch((error) => {
      console.error(error)
      notify('could not load anecdotes')
    })
  }, [setAnecdotes, notify])

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
