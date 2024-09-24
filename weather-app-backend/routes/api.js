const express = require('express');
const router = express.Router();
const axios = require('axios');

// Weatherbit API Key (replace with your actual key)
const API_KEY = process.env.WEATHERBIT_API_KEY; 

// Current Weather Route
router.get('/current', async (req, res) => {
    try {
        const { city, countryCode } = req.query; 
        const response = await axios.get('https://api.weatherbit.io/v2.0/current', {
            params: {
                city: `<span class="math-inline">\{city\},</span>{countryCode}`,
                key: API_KEY
            }
        });
        res.json(response.data); 
    } catch (error) {
        console.error('Error fetching current weather:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 16-Day Forecast Route
router.get('/forecast/daily', async (req, res) => {
    try {
        const { city, countryCode } = req.query;
        const response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
            params: {
                city: `<span class="math-inline">\{city\},</span>{countryCode}`,
                key: API_KEY,
                days: 16 // Fetch forecast for 16 days
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching 16-day forecast:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

// Save Search History
router.post('/search-history', async (req, res) => {
    try {
        const { city, countryCode } = req.body;
        const query = `
            INSERT INTO search_history (city, country_code) 
            VALUES ($1, $2)
            RETURNING *
        `;
        const values = [city, countryCode];
        const result = await pool.query(query, values);
        res.json(result.rows[0]); 
    } catch (error) {
        console.error('Error saving search history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Search History (last 5 searches)
router.get('/search-history', async (req, res) => {
    try {
        const query = `
            SELECT * FROM search_history
            ORDER BY timestamp DESC
            LIMIT 5
        `;
        const result = await pool.query(query);
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
