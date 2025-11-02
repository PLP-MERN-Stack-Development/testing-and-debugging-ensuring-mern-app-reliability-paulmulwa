/**
 * Validation utility functions for bug tracker
 */

/**
 * Validates bug data
 * @param {Object} bug - Bug object to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
function validateBug(bug) {
  const errors = [];

  if (!bug.title || typeof bug.title !== 'string' || bug.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (bug.title && bug.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (!bug.description || typeof bug.description !== 'string' || bug.description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  }

  if (bug.description && bug.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  const validStatuses = ['open', 'in-progress', 'resolved'];
  if (bug.status && !validStatuses.includes(bug.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates bug status update
 * @param {string} status - Status to validate
 * @returns {boolean}
 */
function validateStatus(status) {
  const validStatuses = ['open', 'in-progress', 'resolved'];
  return validStatuses.includes(status);
}

/**
 * Sanitizes bug input
 * @param {Object} bug - Bug object to sanitize
 * @returns {Object} - Sanitized bug object
 */
function sanitizeBug(bug) {
  return {
    title: bug.title ? bug.title.trim() : '',
    description: bug.description ? bug.description.trim() : '',
    status: bug.status || 'open',
    priority: bug.priority || 'medium'
  };
}

module.exports = {
  validateBug,
  validateStatus,
  sanitizeBug
};
