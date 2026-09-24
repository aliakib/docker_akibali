const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve Flask backend address from Docker Compose network
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve Form Page
app.get('/', (req, res) => {
    res.render('form', { error: null });
});

// Submit Form to Flask Backend
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const response = await axios.post(`${BACKEND_URL}/api/submit`, {
            name,
            email,
            message
        });

        res.render('result', { result: response.data });
    } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || 'Failed to connect to backend';
        res.render('form', { error: errorMsg });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend running on http://0.0.0.0:${PORT}`);
});