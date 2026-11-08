import { useAnecdoteActions } from '../store'
import { useNotificationStore } from '../notificationStore'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const notify = useNotificationStore((state) => state.notify)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content) return
    const newAnecdote = await anecdoteService.createNew(content)
    add(newAnecdote)
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
