const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

let dbConnection;
beforeAll(async () => {
    dbConnection = await mongoose
        .connect('mongodb+srv://admin:9ecNwMJFmUfcKAVz@testdatabase.ywgrar3.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log(`connected to test db`);
        })
        .catch((error) => {
            console.log(error);
        });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/v1', () => {
    it('responds with a json message', (done) => {
        request(app).get('/api/v1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
            200,
            {
                message: 'API - 👋🌎🌍🌏',
            },
            done
        );
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
});

describe('Endpoint /api/v1/todos', () => {
    let todoId;

    it('should return 404 if nothing was found with the id', async () => {
        const response = await request(app).get('/api/v1/todos/20').set('Accept', 'application/json');

        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('{"error":"No such todo"}');
    });

    it('should return 201 when new todos was added', async () => {
        const response = await request(app)
            .post('/api/v1/todos/')
            .set('Accept', 'application/json')
            .send({ text: 'Sleep' });

        todoId = response._body._id;

        expect(response.statusCode).toBe(200);
        expect(response._body.text).toBe('Sleep');
    });

    it('should return 200 when todos was updated', async () => {
        const response = await request(app)
            .patch(`/api/v1/todos/${todoId}`)
            .set('Accept', 'application/json')
            .send({ text: 'Wake Up' });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"message":"Updated"}');
    });

    it('should respond with 200 when called with GET request', async () => {
        const response = await request(app).get('/api/v1/todos').set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response._body.length).toBeGreaterThan(0);
    });

    it('should return the todos when called with GET id', async () => {
        const response = await request(app).get(`/api/v1/todos/${todoId}`);

        expect(response.statusCode).toBe(200);
        expect(response._body.text).toBe('Wake Up');
    });

    it('should return 200 when todos was deleted', async () => {
        const response = await request(app).delete(`/api/v1/todos/${todoId}`).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response._body.text).toBe('Wake Up');
    });
});
