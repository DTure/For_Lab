const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);

describe('Test the root path', () => {
  test('It should respond with "Hello World"', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});

