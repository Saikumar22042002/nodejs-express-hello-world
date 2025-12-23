const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('env', NODE_ENV);

// Middleware for basic logging
app.use((req, res, next) => {
    const startTime = process.hrtime();

    res.on('finish', () => {
        const totalTime = process.hrtime(startTime);
        const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${totalTimeInMs.toFixed(2)}ms`);
    });
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Main application endpoint
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Not found handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    });
}

module.exports = app;