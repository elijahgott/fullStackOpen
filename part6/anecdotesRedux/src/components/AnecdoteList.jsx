import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(( state ) => {
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    })
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(setNotification(`You voted for ${anecdote.content}`, 3))
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