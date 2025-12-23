const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Main route to serve Hello World
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// Health check endpoint for Kubernetes probes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown handler
const gracefulShutdown = () => {
  console.log('Received shutdown signal, closing server gracefully.');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app; // Export for testing purposes
