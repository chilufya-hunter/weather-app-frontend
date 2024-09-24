const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// API Routes (we'll add these later)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'weather',
    password: '12345',
    port: 5432, // Default PostgreSQL port
});

// Create search_history table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS search_history (
        id SERIAL PRIMARY KEY,
        city VARCHAR(255) NOT NULL,
        country_code VARCHAR(2) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`)
.then(() => {
    console.log('Search history table created or already exists');
})
.catch(err => {
    console.error('Error creating search history table:', err);
});