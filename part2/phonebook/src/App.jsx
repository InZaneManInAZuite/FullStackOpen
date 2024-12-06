import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonService from './services/PersonService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const personService = PersonService

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleFilterChange = (event) => { setFilter(event.target.value) }
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handlenumChange = (event) => { setNewNumber(event.target.value) }

  const handleOnSubmit = (event) => {
    event.preventDefault()

    // Check if person already exists
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    // Create new person
    const newPerson = { 
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    // Add new person to the phonebook
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

    // Clear input fields
    setNewName('')
    setNewNumber('')

  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        onNameChange={handleNameChange}
        onNumberChange={handlenumChange}
        onSubmit={handleOnSubmit}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App