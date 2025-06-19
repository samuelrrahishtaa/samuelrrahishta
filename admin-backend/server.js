const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Hardcoded admin credentials (for simplicity)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
};

// Serve static folders
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/javascript', express.static(path.join(__dirname, '../js')));
app.use('/images', express.static(path.join(__dirname, '../images')));
// Serve homepage.html at root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../homepage.html'));
});
// About Us page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../About-us.html'));
});

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../contact.html'));
});

// Destination page
app.get('/destination', (req, res) => {
  res.sendFile(path.join(__dirname, '../destination.html'));
});
// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Protected admin data
app.get('/api/admin/data', (req, res) => {
    res.json({
        stats: {
            visitors: 1245,
            destinations: 5,
            messages: 24
        },
        recentMessages: [
            { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Question about Tirana' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Booking inquiry' }
        ]
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
