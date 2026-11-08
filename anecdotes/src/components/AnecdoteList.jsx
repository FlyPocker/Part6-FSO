import { useAnecdoteActions, useAnecdotes, useFilter } from '../store'
import { useNotificationStore } from '../notificationStore'
import { getVisibleAnecdotes } from './anecdoteUtils'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { update, remove: removeFromStore } = useAnecdoteActions()
  const notify = useNotificationStore((state) => state.notify)

  const visibleAnecdotes = getVisibleAnecdotes(anecdotes, filter)

  const vote = async (id) => {
    const anecdote = anecdotes.find((item) => item.id === id)
    const votedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    update(votedAnecdote)
    notify(`you voted '${votedAnecdote.content}'`)
  }

  const remove = async (id) => {
    await anecdoteService.remove(id)
    removeFromStore(id)
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
