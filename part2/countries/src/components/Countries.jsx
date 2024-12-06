import { useState, useEffect } from 'react'
import Country from './Country'

const Countries = ({ countries, search }) => {
    
    const [filteredCountries, setFilteredCountries] = useState([])
    const [numOfCountries, setNumOfCountries] = useState(0)
    const [showCountry, setShowCountry] = useState(false)

    useEffect(() => {
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        setNumOfCountries(filtered.length)
        if (filtered.length < 10) setFilteredCountries(filtered)
    }, [search])


    const handleShowCountry = (event) => {

        // Obtain the country object from the countries array
        const id = event.target.id
        const country = countries.find(country => country.name.common === id)

        // Set the country object to be displayed
        setFilteredCountries([country])
        setNumOfCountries(1)
    }


    if (numOfCountries === 1) {
        return <Country country={filteredCountries[0]} />
    }

    if (numOfCountries > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    return (
        <div>
            {filteredCountries.map(country => 
                <div key={country.name.common}>{country.name.common}
                    <button id={country.name.common} onClick={handleShowCountry}>show</button>
                </div>
            )}
        </div>
    )

}

export default Countries