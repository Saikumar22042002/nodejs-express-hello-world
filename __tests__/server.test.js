const request = require('supertest');
const app = require('../server'); // Import the app instance

// Test suite for the main application endpoints
describe('GET /', () => {
  it('should respond with Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});

// Test suite for the health check endpoint
describe('GET /health', () => {
  it('should respond with a healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'healthy' });
  });
});

// Test suite for non-existent routes
describe('GET /notfound', () => {
  it('should respond with a 404 error', async () => {
    const response = await request(app).get('/a-route-that-does-not-exist');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });
});
