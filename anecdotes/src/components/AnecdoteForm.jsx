import { useAnecdoteStore } from '../store'
import { useNotificationStore } from '../notificationStore'

const AnecdoteForm = () => {
  const createAnecdote = useAnecdoteStore((state) => state.createAnecdote)
  const notify = useNotificationStore((state) => state.notify)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content) return
    await createAnecdote(content)
    event.target.reset()
    notify(`a new anecdote '${content}' created`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
