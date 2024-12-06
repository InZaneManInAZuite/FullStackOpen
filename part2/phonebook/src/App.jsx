import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App