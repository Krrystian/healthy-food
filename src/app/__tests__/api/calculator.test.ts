//MUSI BYĆ URUCHOMIONY SERWER NEXT.JS NA PORCIE 3000

import request from 'supertest';

describe('POST /api/calculator', () => {
  it('should create a calculator record', async () => {
    const response = await request('http://localhost:3000') // Adres aplikacji Next.js
      .post('/api/calculator')
      .send({
        type: 'BMI',
        userId: 'cm5l185zv0000o1kzi5p1rmhi',
        weight: "70",
        height: "175",
        age: 30,
        gender: 'male',
        activityLevel: 2,
        result: 23.5,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Calculator has been saved.');
  });

  it('should return an error if invalid type is provided', async () => {
    const response = await request('http://localhost:3000') // Adres aplikacji Next.js
      .post('/api/calculator')
      .send({
        type: 'INVALID_TYPE',
        userId: 'cm5l185zv0000o1kzi5p1rmhi',
        weight: "70",
        height: "175",
        age: 30,
        gender: 'male',
        activityLevel: 2,
        result: 23.5,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid calculator type');
  });
});
