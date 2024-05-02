import React, { useState } from 'react';

// Define your array of country objects
const countries = [
  { name: 'Finland', capital: 'Helsinki' },
  { name: 'United States', capital: 'Washington, D.C.' },
  { name: 'Japan', capital: 'Tokyo' },
  { name: 'Germany', capital: 'Berlin' },
  { name: 'France', capital: 'Paris' },
  // Add more countries as needed
];

// Define your App component
const App = () => {
  // State to store the search query
  const [query, setQuery] = useState('');
  
  // State to store the filtered countries
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Function to handle search input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle search button click
  const handleSearch = () => {
    // Filter countries based on the search query
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <h1>Country Information App</h1>
      {/* Input field for search */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={handleInputChange}
      />
      {/* Search button */}
      <button onClick={handleSearch}>Search</button>
      
      {/* Display filtered countries */}
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>
            {country.name} - {country.capital}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the App component
export default App;
