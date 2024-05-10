import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import "./App.css";
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);


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

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const fetchWeather = async () => {
      if (filteredCountries.length === 1 && filteredCountries[0].capital) {
        const capital = filteredCountries[0].capital[0];
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

        try {
          const response = await axios.get(apiUrl);
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeather();
  }, [filteredCountries]);

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
              selectedCountry && selectedCountry.name.common === country.name.common ? (
                <div key={country.name.common}>
                  <h2>{country.name.common}</h2>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area}</p>
                  <h4>Languages:</h4>
                  <ul>
                    {Object.values(country.languages).map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                  </ul>
                  <figure className="image">
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                  </figure>

                  {weather && (
                  <div>
                    <h3>Weather in {country.capital}:</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <img
                      src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                    <p>wind: {weather.wind.speed}m/s</p>
                  </div>
                )}
                </div>
              ) : (
                <Country
                  key={country.name.common}
                  name={country.name.common}
                  onClick={handleShowDetails}
                />
              )
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
