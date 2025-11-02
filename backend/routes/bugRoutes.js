const express = require('express');
const router = express.Router();
const bugDB = require('../models/bugModel');
const { validateBug, validateStatus } = require('../utils/validation');

/**
 * @route   GET /api/bugs
 * @desc    Get all bugs
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const bugs = await bugDB.getAll();
    res.json(bugs);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/bugs/:id
 * @desc    Get bug by ID
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const bug = await bugDB.getById(req.params.id);
    
    if (!bug) {
      res.status(404);
      throw new Error('Bug not found');
    }
    
    res.json(bug);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/bugs
 * @desc    Create new bug
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const validation = validateBug(req.body);
    
    if (!validation.valid) {
      res.status(400);
      throw new Error(validation.errors.join(', '));
    }

    const bug = await bugDB.create(req.body);
    res.status(201).json(bug);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/bugs/:id
 * @desc    Update bug
 * @access  Public
 */
router.put('/:id', async (req, res, next) => {
  try {
    const bug = await bugDB.getById(req.params.id);
    
    if (!bug) {
      res.status(404);
      throw new Error('Bug not found');
    }

    // Validate if status is being updated
    if (req.body.status && !validateStatus(req.body.status)) {
      res.status(400);
      throw new Error('Invalid status value');
    }

    const updatedBug = await bugDB.update(req.params.id, req.body);
    res.json(updatedBug);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/bugs/:id
 * @desc    Delete bug
 * @access  Public
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await bugDB.delete(req.params.id);
    
    if (!deleted) {
      res.status(404);
      throw new Error('Bug not found');
    }
    
    res.json({ message: 'Bug deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
