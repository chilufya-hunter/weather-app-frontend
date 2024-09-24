import React from 'react';

const Forecast = ({ data }) => {
    if (!data || data.length === 0) {
        return null; // Or a loading indicator
    }

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-4">16-Day Forecast</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((forecast, index) => (
                    <div key={index} className="bg-gray-100 rounded p-3">
                        <p className="text-gray-600 mb-1">{new Date(forecast.datetime).toLocaleDateString()}</p>
                        <img src={`https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`} alt={forecast.weather.description} className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold">{forecast.max_temp}°C / {forecast.min_temp}°C</p>
                        <p>{forecast.weather.description}</p>
                        <p className="text-gray-600">Precip: {forecast.precip} mm</p>
                        <p className="text-gray-600">UV: {forecast.uv}</p>
                        <p className="text-gray-600">Wind: {forecast.wind_cdir_full} {forecast.wind_spd} m/s</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;