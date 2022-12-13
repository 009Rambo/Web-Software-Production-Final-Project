const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });

  describe('Endpoint /api/v1/todos', () => {
    it('should respond with 200 when called with GET request', (done) => {
      request(app)
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  
    it('should return a list of todos when called with GET', (done) => {
      const expected = [
        {
          id: 1,
          text: 'Study',
          done: true
        },
        {
          id: 2,
          text: 'Work',
          done: true
        },
        {
          id: 3,
          text: 'Play',
          done: true
        },
      ];
      request(app)
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected, done);
    });
    
    
    it('should return the todos when called with GET id', (done) => {
      const expected = {
        id: 2,
        text: 'Work',
        done: true
      };

      request(app)
        .get('/api/v1/todos/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected, done);
    });
    
    
    it('should return 404 if nothing was found with the id', (done) => {
      request(app)
        .get('/api/v1/todos/20')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { message: 'Not found' }, done);
    });
    
    
    it('should return 201 when new todos was added', async () => {
      await request(app)
        .post('/api/v1/todos/')
        .set('Accept', 'application/json')
        .send({ id: 4, text: 'Sleep' })
        .expect('Content-Type', /json/)
        .expect(201, { id: 4, text: 'Sleep', done: false });

      // Check that it was actually added as well
      const expected = {
        id: 4,
        text: 'Sleep',
        done: false
      };

      await request(app)
        .get('/api/v1/todos/4')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected);
      });
    
    
    it('should return 200 when todos was updated', async () => {
      await request(app)
        .patch('/api/v1/todos/3')
        .set('Accept', 'application/json')
        .send({ text: 'Do laundry' })
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Updated' });

      // Check that it was actually added as well
      const expected = {
        id: 3,
        text: 'Do laundry',
      };

      await request(app)
        .get('/api/v1/todos/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected);
    });
    
    
    it('should return 200 when todos was deleted', async () => {
      await request(app)
        .delete('/api/v1/todos/4')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { id: 4, text: 'Sleep', done: false });
        
      await request(app)
        .get('/api/v1/todos/4')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { message: 'Not found' });
    });
  });
});
