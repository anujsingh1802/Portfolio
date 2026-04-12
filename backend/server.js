const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes (allow frontend to communicate with backend)
app.use(bodyParser.json()); // Parse JSON requests

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Portfolio Backend is running fine!');
});

// POST /contact endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    // Log to console (as requested)
    console.log('--- New Contact Form Submission ---');
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // Simulate network delay for frontend loading UI visibility
    setTimeout(() => {
        // Send success response
        res.status(200).json({ success: true, message: 'Message received successfully!' });
    }, 1500); 
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
