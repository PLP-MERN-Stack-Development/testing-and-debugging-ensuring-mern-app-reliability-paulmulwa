const request = require('supertest');
const app = require('../app');
const bugDB = require('../models/bugModel');

describe('Bug API Routes', () => {
  // Clear database before each test
  beforeEach(() => {
    bugDB.clear();
  });

  describe('GET /', () => {
    test('should return API running message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Bug Tracker API');
    });
  });

  describe('GET /api/bugs', () => {
    test('should return empty array when no bugs exist', async () => {
      const response = await request(app).get('/api/bugs');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return all bugs', async () => {
      // Create test bugs
      await bugDB.create({
        title: 'Bug 1',
        description: 'First bug'
      });
      await bugDB.create({
        title: 'Bug 2',
        description: 'Second bug'
      });

      const response = await request(app).get('/api/bugs');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('title', 'Bug 1');
      expect(response.body[1]).toHaveProperty('title', 'Bug 2');
    });
  });

  describe('GET /api/bugs/:id', () => {
    test('should return a bug by ID', async () => {
      const bug = await bugDB.create({
        title: 'Test Bug',
        description: 'Test description'
      });

      const response = await request(app).get(`/api/bugs/${bug.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', bug.id);
      expect(response.body).toHaveProperty('title', 'Test Bug');
    });

    test('should return 404 for non-existent bug', async () => {
      const response = await request(app).get('/api/bugs/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Bug not found');
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const newBug = {
        title: 'New Bug',
        description: 'This is a new bug',
        status: 'open',
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(newBug);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'New Bug');
      expect(response.body).toHaveProperty('description', 'This is a new bug');
      expect(response.body).toHaveProperty('status', 'open');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    test('should return 400 for invalid bug data (missing title)', async () => {
      const invalidBug = {
        description: 'This bug has no title'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Title is required');
    });

    test('should return 400 for invalid bug data (missing description)', async () => {
      const invalidBug = {
        title: 'Bug without description'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Description is required');
    });

    test('should return 400 for title exceeding 100 characters', async () => {
      const invalidBug = {
        title: 'a'.repeat(101),
        description: 'Valid description'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);
      
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      const bug = await bugDB.create({
        title: 'Original Title',
        description: 'Original description'
      });

      const updateData = {
        title: 'Updated Title',
        status: 'in-progress'
      };

      const response = await request(app)
        .put(`/api/bugs/${bug.id}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated Title');
      expect(response.body).toHaveProperty('status', 'in-progress');
      expect(response.body).toHaveProperty('description', 'Original description');
    });

    test('should return 404 for non-existent bug', async () => {
      const response = await request(app)
        .put('/api/bugs/999')
        .send({ title: 'Updated' });
      
      expect(response.status).toBe(404);
    });

    test('should return 400 for invalid status', async () => {
      const bug = await bugDB.create({
        title: 'Test Bug',
        description: 'Test description'
      });

      const response = await request(app)
        .put(`/api/bugs/${bug.id}`)
        .send({ status: 'invalid-status' });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid status');
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      const bug = await bugDB.create({
        title: 'Bug to delete',
        description: 'This bug will be deleted'
      });

      const response = await request(app).delete(`/api/bugs/${bug.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Bug deleted successfully');

      // Verify bug is deleted
      const bugs = await bugDB.getAll();
      expect(bugs).toHaveLength(0);
    });

    test('should return 404 for non-existent bug', async () => {
      const response = await request(app).delete('/api/bugs/999');
      
      expect(response.status).toBe(404);
    });
  });

  describe('404 handler', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/nonexistent');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
