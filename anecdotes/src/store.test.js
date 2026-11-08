import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getVisibleAnecdotes } from './components/anecdoteUtils'
import { useAnecdoteStore } from './store'

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

    await useAnecdoteStore.getState().initialize()

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
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ...anecdotes[0], votes: 2 }),
    }))

    await useAnecdoteStore.getState().voteAnecdote('1')

    expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(2)
  })
})
