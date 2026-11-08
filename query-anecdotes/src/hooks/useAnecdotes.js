import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from '../requests'
import useNotify from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotify()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`a new anecdote '${anecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`you voted '${anecdote.content}'`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => {
      newAnecdoteMutation.mutate({ content, votes: 0 })
    },
    voteAnecdote: (anecdote) => {
      voteAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      })
    },
  }
}
