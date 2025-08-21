import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import { useNotificationsDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const dispatchNotification = useNotificationsDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatchNotification({ 
        type: 'SET',
        message: `Added anecdote: ${content}`
      })
      setTimeout(() => {
        dispatchNotification({
          type: 'CLEAR'
        })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({ 
        type: 'SET',
        message: `Error adding anecdote: ${error}`
      })
      setTimeout(() => {
        dispatchNotification({
          type: 'CLEAR'
        })
      }, 5000)
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0, id: getId()})
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
