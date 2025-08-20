import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterChange(event.target.value))
    }

    return(
        <div>
            <strong>filter</strong> <input onChange={handleChange} />
        </div>
    )

}

export default Filter