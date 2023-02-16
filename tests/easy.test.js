const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const request = require('supertest');
const app = require('../app');
require('dotenv').config();

/* Connect to database before each test */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

/* Drop collections and disconnect from database */
afterEach(async () => {
  await mongoose.connection.close();
});


/*
* GET REQUESTS
*/
// GET all - good
describe('GET /easy', () => {
  it('should return all entries', async () => {
    const res = await request(app).get('/easy');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// Get all entries using query parameters for filtering
describe('GET /easy?points=x&answer=y', () => {
  it('should return all entries that match the query parameters of points & answer', async () => {
    const res = await request(app).get('/easy?test=test1&points=1&points=2&answer=10');
    expect(res.statusCode).toBe(200);
    // expect(res.body.formula).toBe('(2+2)^2');
  });
});

// Get one by ID - good
describe('GET /easy/:id', () => {
  it('should return one entry that matches the ID', async () => {
    const res = await request(app).get('/easy/63d2ba1eac0d970ad6bfabb6');
    expect(res.statusCode).toBe(200);
    expect(res.body.formula).toBe('(2+2)^2');
  });
});

// Get one by ID - bad


/*
* POST REQUESTS
*/
// Post one entry
describe('POST /easy', () => {
  it('should return one entry that matches the ID', async () => {
    const res = await request(app).get('/easy/63d2ba1eac0d970ad6bfabb6');
    expect(res.statusCode).toBe(200);
    expect(res.body.formula).toBe('(2+2)^2');
  });
});

/*
* PUT REQUESTS
*/
// Update one - good
describe('PUT /easy/:id', () => {
  it('should return one entry that matches the ID', async () => {
    const res = await request(app).get('/easy/63d2ba1eac0d970ad6bfabb6');
    expect(res.statusCode).toBe(200);
    expect(res.body.formula).toBe('(2+2)^2');
  });
});

// Update one - bad ID


// Update one - entry does not exist

/*
* DELETE REQUESTS
*/
// delete one - good


// delete one - bad ID

