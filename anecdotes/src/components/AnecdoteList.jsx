import { useAnecdoteStore } from '../store'
import { useNotificationStore } from '../notificationStore'
import { getVisibleAnecdotes } from './anecdoteUtils'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const voteAnecdote = useAnecdoteStore((state) => state.voteAnecdote)
  const deleteAnecdote = useAnecdoteStore((state) => state.deleteAnecdote)
  const notify = useNotificationStore((state) => state.notify)

  const visibleAnecdotes = getVisibleAnecdotes(anecdotes, filter)

  const vote = async (id) => {
    const votedAnecdote = await voteAnecdote(id)
    notify(`you voted '${votedAnecdote.content}'`)
  }

  const remove = async (id) => {
    await deleteAnecdote(id)
  }

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => remove(anecdote.id)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
