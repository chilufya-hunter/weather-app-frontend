import React from 'react';

const CurrentWeather = ({ data }) => {
    if (!data) {
        return null; // Or a loading indicator
    }

    const {
        city_name,
        country_code,
        temp,
        app_temp,
        rh,
        wind_spd,
        weather: { description, icon },
        aqi,
        ob_time
    } = data;

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-2xl font-bold mb-2">{city_name}, {country_code}</h2>
            <p className="text-gray-600 mb-2">As of {new Date(ob_time).toLocaleString()}</p>

            <div className="flex items-center mb-4">
                <img src={`https://www.weatherbit.io/static/img/icons/${icon}.png`} alt={description} className="w-16 h-16 mr-4" />
                <div>
                    <p className="text-4xl font-bold">{temp}°C</p>
                    <p className="text-gray-600">Feels like {app_temp}°C</p>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600">Wind:</p>
                    <p>{wind_spd} m/s</p>
                </div>
                <div>
                    <p className="text-gray-600">Humidity:</p>
                    <p>{rh}%</p>
                </div>
                <div>
                    <p className="text-gray-600">AQI:</p>
                    <p>{aqi}</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;