import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  const [message, setMessage] = useState(null);
  const [className, setClassName] = useState(null);

  const addName = (event) => {
    event.preventDefault();
    if(persons.find(person => person.name === newName)){
      if(!persons.find(person => person.number === newNumber)){
        // update number
        if(window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)){
          const id = persons.find(person => person.name === newName).id;
          const updatedPerson = {
            name: newName,
            number: newNumber,
            id: id
          }

          personsService
            .updatePerson(id, updatedPerson)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              setClassName(`error`);
              setMessage(`Information for ${newName} has already been removed from the server.`);

              setTimeout(() => setMessage(null), 4000);
              setPersons(
                persons.filter(person => person.name !== newName)
              );
            })
          
            setPersons(
              persons.map(person => person.id === id ? updatedPerson : person)
            );
        }
        // cancelled updating person
      }
      else{
        // name and number same, alert user
        alert(`${newName} already exists in phonebook.`);
      }
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber,
        id: `${parseInt(persons[persons.length - 1].id) + 1}`
      }

      personsService
        .createPerson(newPerson)
        .then(response => {
          setClassName(`success`);
          setMessage(`Added ${newName}`)

          setTimeout(() => setMessage(null), 4000);
        })

      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleDeletePerson = person => {
        if(window.confirm(`Delete ${person.name}?`)){
            personsService
                .deletePerson(person.id)
                .catch(error => {
                    console.log(`Failed to delete ${person.name}`);
                });
            setPersons(persons.filter(p => p.id !== person.id));
        }
        else{
            console.log('Cancelled deletion.')
        }
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={className} message={message} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>Add New:</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App