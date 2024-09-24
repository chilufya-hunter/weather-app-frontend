import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchHistory from './components/SearchHistory';

// Set the base URL for Axios if your backend is on a different port or domain
axios.defaults.baseURL = 'http://localhost:5000'; 

function App() {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);

    // Fetch current weather data
    const fetchCurrentWeather = async (city, countryCode) => {
        try {
            const response = await axios.get('/api/current', {
                params: { city, countryCode }
            });
            setCurrentWeatherData(response.data.data[0]); 
            saveSearch(city, countryCode); 
        } catch (error) {
            console.error('Error fetching current weather:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    // Fetch forecast data
    const fetchForecast = async (city, countryCode) => {
        try {
            const response = await axios.get('/api/forecast/daily', {
                params: { city, countryCode }
            });
            setForecastData(response.data.data); 
        } catch (error) {
            console.error('Error fetching forecast:', error);
            // Handle error
        }
    };

    // Fetch search history
    const fetchSearchHistory = async () => {
        try {
            const response = await axios.get('/api/search-history');
            setSearchHistory(response.data); 
        } catch (error) {
            console.error('Error fetching search history:', error);
            // Handle error
        }
    };

    // Save search history
    const saveSearch = async (city, countryCode) => {
        try {
            await axios.post('/api/search-history', { city, countryCode });
            fetchSearchHistory(); 
        } catch (error) {
            console.error('Error saving search history:', error);
            // Handle error
        }
    };

    // Fetch initial search history when the component mounts
    useEffect(() => {
        fetchSearchHistory();
    }, []); 

    return (
        <div className="container mx-auto p-4">
            <Search 
                onSearch={fetchCurrentWeather} 
                onSaveSearch={saveSearch} 
            />
            {currentWeatherData && (
                <CurrentWeather data={currentWeatherData} />
            )}
            {forecastData && (
                <Forecast data={forecastData} />
            )}
            <SearchHistory 
                history={searchHistory} 
                onItemClick={fetchCurrentWeather} 
            />
        </div>
    );
}

export default App;