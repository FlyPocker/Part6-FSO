import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  message: '',
  notify: (message) => {
    set({ message })
    setTimeout(() => set({ message: '' }), 5000)
  },
}))
