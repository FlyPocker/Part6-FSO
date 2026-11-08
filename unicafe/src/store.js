import { create } from 'zustand'

export const useFeedbackStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  giveFeedback: (type) => set((state) => ({
    [type]: state[type] + 1,
  })),
}))
