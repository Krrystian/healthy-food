import request from 'supertest';

describe('POST /api/admin/createRecipe', () => {
  it('should create a recipe when the user is an admin', async () => {
    const response = await request('http://localhost:3000') 
      .post('/api/admin/createRecipe')
      .send({
        userId: 'cm5l185zv0000o1kzi5p1rmhi',
        title: 'Test Recipe',
        description: 'Delicious test recipe',
        tags: ['test', 'recipe'],
        image: 'https://software-inz.s3.eu-north-1.amazonaws.com/recipe/Placki z dyni',
        preparation: 'Step 1: Do this\nStep 2: Do that',
        products: [
          { name: 'Tomato', quantity: '1/2', metric: 'pcs' },
          { name: 'Cucumber', quantity: '1', metric: 'pcs' },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Notifications sent');
  });

  it('should return 400 for invalid input data', async () => {
    const response = await request('http://localhost:3000')
      .post('/api/admin/createRecipe')
      .send({
        userId: 'cm5l185zv0000o1kzi5p1rmhi',
        title: '',
        description: 'Delicious test recipe',
        tags: ['test', 'recipe'],
        image: 'https://software-inz.s3.eu-north-1.amazonaws.com/recipe/Placki z dyni',
        preparation: 'Step 1: Do this\nStep 2: Do that',
        products: [
          { name: 'Tomato', quantity: '2', metric: 'pcs' },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
