import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  useEffect(() => {
    // Filter countries based on the search query
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [query, countries]); // Update filtered countries when query or countries change

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Country Information App</h1>
      <p>Search for countries:</p>

      {/* Input field for search */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={handleInputChange}
      />
      
      {/* Display filtered countries */}
      <ul className='nameList'>
      {filteredCountries.length > 10 ? (
          <p>Too many matches. Specify another filter.</p>
        ) : ( filteredCountries.map((country, index) => (
          <li key={index}>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h4>Languages:</h4>
            <ul>
              {country.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </li>
        ))
        )}
      </ul>
    </div>
  );
};

export default App;
