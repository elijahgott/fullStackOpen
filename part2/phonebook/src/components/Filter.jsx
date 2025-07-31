const Filter = ({newSearch, setNewSearch}) => {
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    }

    return(
        <div>
            Search: <input value={newSearch} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter