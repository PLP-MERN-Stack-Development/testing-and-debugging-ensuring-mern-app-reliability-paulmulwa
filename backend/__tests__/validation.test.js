const { validateBug, validateStatus, sanitizeBug } = require('../utils/validation');

describe('Validation Utilities', () => {
  describe('validateBug', () => {
    test('should validate a valid bug', () => {
      const bug = {
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'open'
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject bug with missing title', () => {
      const bug = {
        description: 'This is a test bug'
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Title is required and must be a non-empty string');
    });

    test('should reject bug with empty title', () => {
      const bug = {
        title: '   ',
        description: 'This is a test bug'
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should reject bug with title exceeding 100 characters', () => {
      const bug = {
        title: 'a'.repeat(101),
        description: 'This is a test bug'
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Title must be less than 100 characters');
    });

    test('should reject bug with missing description', () => {
      const bug = {
        title: 'Test Bug'
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Description is required and must be a non-empty string');
    });

    test('should reject bug with description exceeding 500 characters', () => {
      const bug = {
        title: 'Test Bug',
        description: 'a'.repeat(501)
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Description must be less than 500 characters');
    });

    test('should reject bug with invalid status', () => {
      const bug = {
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'invalid-status'
      };

      const result = validateBug(bug);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Status must be one of:');
    });

    test('should accept bug with valid status values', () => {
      const statuses = ['open', 'in-progress', 'resolved'];
      
      statuses.forEach(status => {
        const bug = {
          title: 'Test Bug',
          description: 'This is a test bug',
          status
        };

        const result = validateBug(bug);
        expect(result.valid).toBe(true);
      });
    });
  });

  describe('validateStatus', () => {
    test('should validate correct status values', () => {
      expect(validateStatus('open')).toBe(true);
      expect(validateStatus('in-progress')).toBe(true);
      expect(validateStatus('resolved')).toBe(true);
    });

    test('should reject invalid status values', () => {
      expect(validateStatus('invalid')).toBe(false);
      expect(validateStatus('closed')).toBe(false);
      expect(validateStatus('')).toBe(false);
      expect(validateStatus(null)).toBe(false);
    });
  });

  describe('sanitizeBug', () => {
    test('should trim whitespace from title and description', () => {
      const bug = {
        title: '  Test Bug  ',
        description: '  This is a test bug  '
      };

      const sanitized = sanitizeBug(bug);
      expect(sanitized.title).toBe('Test Bug');
      expect(sanitized.description).toBe('This is a test bug');
    });

    test('should set default status to open', () => {
      const bug = {
        title: 'Test Bug',
        description: 'This is a test bug'
      };

      const sanitized = sanitizeBug(bug);
      expect(sanitized.status).toBe('open');
    });

    test('should preserve provided status', () => {
      const bug = {
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'in-progress'
      };

      const sanitized = sanitizeBug(bug);
      expect(sanitized.status).toBe('in-progress');
    });

    test('should set default priority to medium', () => {
      const bug = {
        title: 'Test Bug',
        description: 'This is a test bug'
      };

      const sanitized = sanitizeBug(bug);
      expect(sanitized.priority).toBe('medium');
    });
  });
});
