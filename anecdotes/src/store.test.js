import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getVisibleAnecdotes } from './components/anecdoteUtils'
import { useAnecdoteStore } from './store'
import anecdoteService from './services/anecdotes'

const anecdotes = [
  { id: '1', content: 'first', votes: 1 },
  { id: '2', content: 'second', votes: 4 },
]

describe('anecdote store', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [],
      filter: '',
    })
    vi.restoreAllMocks()
  })

  it('initializes with anecdotes returned by the backend', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => anecdotes,
    }))

    const fetchedAnecdotes = await anecdoteService.getAll()
    useAnecdoteStore.getState().actions.setAnecdotes(fetchedAnecdotes)

    expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
  })

  it('sorts anecdotes passed to the list by descending votes', () => {
    const result = getVisibleAnecdotes(anecdotes, '')

    expect(result.map((anecdote) => anecdote.id)).toEqual(['2', '1'])
    expect(anecdotes.map((anecdote) => anecdote.id)).toEqual(['1', '2'])
  })

  it('passes only matching anecdotes through the filter', () => {
    const result = getVisibleAnecdotes([
      ...anecdotes,
      { id: '3', content: 'third', votes: 8 },
    ], 'SECOND')

    expect(result.map((anecdote) => anecdote.content)).toEqual(['second'])
  })

  it('increases an anecdote vote count', async () => {
    useAnecdoteStore.setState({ anecdotes })
    useAnecdoteStore.getState().actions.update({ ...anecdotes[0], votes: 2 })

    expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(2)
  })
})
