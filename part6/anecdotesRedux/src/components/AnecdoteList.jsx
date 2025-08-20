import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(( state ) => {
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    })

    // const anecdotes = useSelector(state => state.anecdotes
    //     .filter(a => a.content.toLowerCase().includes(state.filter))
    //     .sort((a, b) => b.votes - a.votes))
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(setNotification(`You voted for ${anecdote.content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    const byVotes = (a1, a2) => a2.votes - a1.votes

    return(
        <>
            {anecdotes.sort(byVotes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} votes
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList