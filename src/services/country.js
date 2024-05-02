// country.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/countries';

const fetchCountries = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}name/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export { fetchCountries };
