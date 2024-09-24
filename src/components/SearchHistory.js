import React from 'react';

const SearchHistory = ({ history, onItemClick }) => {
    if (history.length === 0) {
        return null; 
    }

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
            <ul>
                {history.map((search, index) => (
                    <li 
                        key={index} 
                        className="cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() => onItemClick(search.city, search.country_code)}
                    >
                        {search.city}, {search.country_code}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;