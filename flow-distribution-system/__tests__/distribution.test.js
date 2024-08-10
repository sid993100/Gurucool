const request = require('supertest');
const app = require('../server'); // Ensure you export the app from your server file
const mongoose = require('mongoose');
const User = require('../models/User');
const Astrologer = require('../models/Astrologer');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('should assign user to astrologer', async () => {
  const user = await User.create({ name: 'John Doe' });
  const astrologer = await Astrologer.create({ name: 'Astro1', flow: 2 });
  await Astrologer.create({ name: 'Astro2', flow: 1 });

  const response = await request(app)
    .post('/distribution/assign')
    .send({ userId: user._id });

  expect(response.status).toBe(200);
  expect(response.body.user.name).toBe('John Doe');
  expect(['Astro1', 'Astro2']).toContain(response.body.astrologer.name);
});
