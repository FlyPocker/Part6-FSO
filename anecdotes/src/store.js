import { create } from 'zustand'

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    setAnecdotes: (anecdotes) => set({ anecdotes }),
    add: (anecdote) => set((state) => ({
      anecdotes: state.anecdotes.concat(anecdote),
    })),
    update: (anecdote) => set((state) => ({
      anecdotes: state.anecdotes.map((item) =>
        item.id === anecdote.id ? anecdote : item
      ),
    })),
    remove: (id) => set((state) => ({
      anecdotes: state.anecdotes.filter((item) => item.id !== id),
    })),
    setFilter: (filter) => set({ filter }),
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
