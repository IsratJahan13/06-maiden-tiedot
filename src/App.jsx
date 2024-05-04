import { useState, useEffect } from 'react'
import Country from './components/Country'
import "./App.css";

const App = () => {
  const [countries,setCountries] = useState([])

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => response.json())
    .then(data => setCountries(data))
  },[])
  console.log(countries)
  
  return (
    <div>
      <h1>Country Information App</h1>
      <p>Search for countries:</p>
      <div>
        {countries.map(country => (
          <Country key={country.name.common} 
          name={country.name.common} 
          capital={country.capital}
          area={country.area} 
          languages={country.languages ? Object.values(country.languages) : []}
          flag={country.flags.svg}
          />
        ))}
      </div>
      
    </div>
  )
}

export default App