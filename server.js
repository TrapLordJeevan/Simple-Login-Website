const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for simplicity (use a database for production)
let users = [];

// Register route
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.send('Email and password are required.');
    }

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.send('User already exists.');
    }

    // Store user data
    users.push({ email, password });
    res.send('Registration successful!');
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.send('Login successful!');
    } else {
        res.send('Invalid email or password.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
