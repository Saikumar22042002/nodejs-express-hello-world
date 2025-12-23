const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should respond with Hello World', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello World');
    });
  });

  describe('GET /health', () => {
    it('should respond with a 200 status and UP status', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'UP');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
