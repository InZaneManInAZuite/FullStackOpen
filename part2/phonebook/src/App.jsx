import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlenumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()

    // Check if person already exists
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = { 
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handlenumChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App