/**
 * In-memory bug storage (simulating database)
 */

let bugs = [];
let nextId = 1;

/**
 * Bug model
 */
class Bug {
  constructor(data) {
    this.id = nextId++;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status || 'open';
    this.priority = data.priority || 'medium';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

/**
 * Database operations
 */
const bugDB = {
  /**
   * Get all bugs
   */
  getAll: async () => {
    return [...bugs];
  },

  /**
   * Get bug by ID
   */
  getById: async (id) => {
    return bugs.find(bug => bug.id === parseInt(id));
  },

  /**
   * Create new bug
   */
  create: async (data) => {
    const bug = new Bug(data);
    bugs.push(bug);
    return bug;
  },

  /**
   * Update bug
   */
  update: async (id, data) => {
    const index = bugs.findIndex(bug => bug.id === parseInt(id));
    if (index === -1) return null;

    bugs[index] = {
      ...bugs[index],
      ...data,
      id: bugs[index].id, // Preserve ID
      createdAt: bugs[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    };
    return bugs[index];
  },

  /**
   * Delete bug
   */
  delete: async (id) => {
    const index = bugs.findIndex(bug => bug.id === parseInt(id));
    if (index === -1) return false;

    bugs.splice(index, 1);
    return true;
  },

  /**
   * Clear all bugs (for testing)
   */
  clear: () => {
    bugs = [];
    nextId = 1;
  }
};

module.exports = bugDB;
