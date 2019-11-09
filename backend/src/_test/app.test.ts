import request from 'supertest';
import app from '../app';

describe('hello world ', () => {
  it('should return string hello world', async () => {
    const result = await request(app).get('/');
    expect(result.text).toBe('Hello World!');
  });
});
