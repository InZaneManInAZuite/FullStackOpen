import PersonService from "../services/PersonService"

const Persons = ({persons, setPersons, filter}) => {

    const handleDelete = (event) => {
        // Get the person to delete
        const id = event.target.id
        const person = persons.find(person => person.id === id)

        // Check if user wants to delete person
        if (window.confirm(`Delete ${person.name}?`)) {

            // Remove person from phonebook and db
            PersonService
            .remove(id)
            .then(() =>  setPersons(persons.filter(person => person.id !== id)))
        }
    }

    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => (
                    <div key={person.id}>{person.name} {person.number} 
                        <button id={person.id} onClick={handleDelete}>delete</button>
                    </div>))}
        </div>
    )
}

export default Persons