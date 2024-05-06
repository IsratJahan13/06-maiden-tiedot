import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Reset selected country when searching
  };

  const handleShowDetails = (name) => {
    const country = countries.find(country => country.name.common === name);
    setSelectedCountry(country);
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
              <Country
                key={country.name.common}
                name={country.name.common}
                onClick={handleShowDetails}
              />
            ))
          )}
        </div>
      )}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <figure className="image">
            <img src={selectedCountry.flags.svg} alt={`Flag of ${selectedCountry.name.common}`} />
          </figure>
        </div>
      )}
    </div>
  );
}

export default App;