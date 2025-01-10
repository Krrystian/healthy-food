
import request from 'supertest';

describe('GET /api/admin/getRecipe', () => {
  it('should return recipes with the "wegańskie" tag', async () => {
    const response = await request('http://localhost:3000') 
      .get('/api/admin/getRecipe')
      .query({ tag: 'wegańskie', page: '1' });

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
    expect(response.body.recipes.length).toBeGreaterThan(0);
    response.body.recipes.forEach((recipe: any) => {
      expect(recipe.tags).toContain('wegańskie');
    });
  });

  it('should return recipes that contain "dyni" in their name', async () => {
    const response = await request('http://localhost:3000')
      .get('/api/admin/getRecipe')
      .query({ name: 'dyni', page: '1' });

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
    expect(response.body.recipes.length).toBeGreaterThan(0);
    response.body.recipes.forEach((recipe: any) => {
      expect(recipe.name.toLowerCase()).toContain('dyni');
    });
  });

  it('should return a recipe with a specific ID', async () => {
    const response = await request('http://localhost:3000')
      .get('/api/admin/getRecipe')
      .query({ id: 'cm5mykcgv0001e197bbzocqy6' });

    expect(response.status).toBe(200);
    expect(response.body.recipe).toBeDefined();
    expect(response.body.recipe.id).toBe('cm5mykcgv0001e197bbzocqy6');
  });

  it('should return 404 if recipe is not found by ID', async () => {
    const response = await request('http://localhost:3000')
      .get('/api/admin/getRecipe')
      .query({ id: 'nonexistent_id' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Recipe not found');
  });

  it('should return a paginated list of recipes', async () => {
    const response = await request('http://localhost:3000')
      .get('/api/admin/getRecipe')
      .query({ page: '2', tag: 'wegańskie' });

    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
    expect(response.body.totalPages).toBeDefined();
    expect(response.body.currentPage).toBe(2);
  });
});
