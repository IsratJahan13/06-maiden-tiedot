import React from 'react';
import { useState } from 'react'

const countries = [
  { name: 'Finland', capital: 'Helsinki', area: 338424, languages: ['finnish', 'swedish'] },
  { name: 'Japan', capital: 'Tokyo', area: 377975, languages: 'japanese' },
];

const App = () => {
  return (
    <div>
      <h1>Country Information App</h1>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            {country.name} <br></br>
            {country.capital} <br></br>
            {country.area} <br></br>
            {country.languages}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the App component
export default App;
