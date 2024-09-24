import React, { useState } from 'react';

const Search = ({ onSearch, onSaveSearch }) => {
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city && countryCode) {
            onSearch(city, countryCode);
            onSaveSearch(city, countryCode); // Save search immediately
            setCity('');
            setCountryCode('');
        } 
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row mb-4">
            <input 
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 rounded mb-2 md:mb-0 md:mr-2 flex-grow"
            />
            <input 
                type="text"
                placeholder="Enter country code (e.g., US)"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border p-2 rounded mb-2 md:mb-0 md:mr-2"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Search
            </button>
        </form>
    );
};

export default Search;