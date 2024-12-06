import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

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
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input onChange={handleFilterChange}/></p>
      <h2>add a new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handlenumChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        if (filter === '' || person.name.toLowerCase().includes(filter.toLowerCase()))
          return (
            <div key={person.id}>{person.name} {person.number}</div>
          )
        })}
    </div>
  )
}

export default App