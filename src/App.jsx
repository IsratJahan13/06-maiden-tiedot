import { useState, useEffect } from 'react'
import Country from './components/Country'
import "./App.css";

const App = () => {
  const [countries,setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => response.json())
    .then(data => setCountries(data))
  },[])
  console.log(countries)

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <h1>Country Information App</h1>
      <p>Search for countries:</p>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {searchQuery && (
        <div>
        {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            
              filteredCountries.map(country => (
              <Country key={country.name.common} 
              name={country.name.common} 
              capital={country.capital}
              area={country.area} 
              languages={country.languages ? Object.values(country.languages) : []}
              flag={country.flags.svg}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default App