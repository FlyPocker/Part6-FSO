import { create } from 'zustand'

const apiUrl = 'http://localhost:3001/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  initialize: async () => {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch anecdotes')
    }
    const anecdotes = await response.json()
    set({ anecdotes })
  },
  createAnecdote: async (content) => {
    const anecdote = { content, votes: 0 }
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anecdote),
    })
    if (!response.ok) {
      throw new Error('Failed to create anecdote')
    }
    const createdAnecdote = await response.json()
    set((state) => ({ anecdotes: state.anecdotes.concat(createdAnecdote) }))
    return createdAnecdote
  },
  voteAnecdote: async (id) => {
    const anecdote = get().anecdotes.find((item) => item.id === id)
    if (!anecdote) {
      throw new Error('Anecdote not found')
    }
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnecdote),
    })
    if (!response.ok) {
      throw new Error('Failed to vote for anecdote')
    }
    const savedAnecdote = await response.json()
    set((state) => ({
      anecdotes: state.anecdotes.map((item) =>
        item.id === id ? savedAnecdote : item
      ),
    }))
    return savedAnecdote
  },
  deleteAnecdote: async (id) => {
    const anecdote = get().anecdotes.find((item) => item.id === id)
    if (!anecdote || anecdote.votes !== 0) {
      throw new Error('Only anecdotes with zero votes can be deleted')
    }
    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error('Failed to delete anecdote')
    }
    set((state) => ({
      anecdotes: state.anecdotes.filter((item) => item.id !== id),
    }))
  },
  setFilter: (filter) => set({ filter }),
}))
