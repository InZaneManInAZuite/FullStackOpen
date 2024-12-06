import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonService from './services/PersonService'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notif, setNotif] = useState(null)
  const [notifTone, setNotifTone] = useState(true)
  
  const personService = PersonService

  // Fetch persons from db
  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  // Display notification for 5 seconds
  useEffect(() => {
    if (notif) {
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }
  }, [notif])

  // Event handlers for form inputs
  const handleFilterChange = (event) => { setFilter(event.target.value) }
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handlenumChange = (event) => { setNewNumber(event.target.value) }

  const handleNotification = (message, tone) => {
    setNotifTone(tone)
    setNotif(message)
  }

  // Event handler for form submission
  const handleOnSubmit = (event) => {
    event.preventDefault()

    // Check if person already exists
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {

        // Update person's number
        const updatedPerson = { ...personExists, number: newNumber }

        // Update person in phonebook and db
        personService
          .update(personExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
          })

        // Display notification
        handleNotification(`Updated ${newName}`, true)
      }
      return
    }

    // Create new person
    const newPerson = { 
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    }
    
    // Add new person to the phonebook and db
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

    // Display notification
    handleNotification(`Added ${newName}`, true)

    // Clear input fields
    setNewName('')
    setNewNumber('')
  }  







  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} tone={notifTone}/>
      <Filter onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        onNameChange={handleNameChange}
        onNumberChange={handlenumChange}
        persons={persons}
        setPersons={setPersons}
        onSubmit={handleOnSubmit}/>
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filter={filter} 
        setPersons={setPersons} 
        handleNotif={handleNotification}/>
    </div>
  )
}

export default App