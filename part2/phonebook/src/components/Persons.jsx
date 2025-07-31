// import personsService from '../services/persons';

const Persons = ({persons, newSearch, handleDeletePerson }) => {
    return(
        <div>
            {newSearch ? persons.filter((person) => person.name.includes(newSearch)).map(person =>
                <div key={person.id}>
                    <p>{person.id}) {person.name} - {person.number}</p>
                    <button onClick={handleDeletePerson(person)}>Delete</button>
                </div>
            ) : persons.map(person => 
                <div key={person.id}>
                    <p>{person.id}) {person.name} - {person.number}</p>
                    <button onClick={() => {handleDeletePerson(person)}}>Delete</button>
                </div>
                
            )}
        </div>
    )
}

export default Persons