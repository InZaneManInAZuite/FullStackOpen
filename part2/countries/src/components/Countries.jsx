import { useState, useEffect } from 'react'
import Country from './Country'

const Countries = ({ countries, search }) => {
    
    const [filteredCountries, setFilteredCountries] = useState([])
    const [numOfCountries, setNumOfCountries] = useState(0)

    useEffect(() => {
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        setNumOfCountries(filtered.length)
        setFilteredCountries(filtered)
    }, [search])

    if (numOfCountries === 1) {
        return <Country country={filteredCountries[0]} />
    }

    if (numOfCountries > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <div>
            {filteredCountries.map(country => 
                <div key={country.name.common}>{country.name.common}</div>
            )}
        </div>
    )

}

export default Countries