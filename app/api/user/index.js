var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

// Create a new User
router.post('/', controller.create);

// Retrieve all User
router.get('/', controller.findAll);

// Retrieve a single User by Id
router.get('/:userId', controller.findById);

// Update a User with Id
router.put('/:userId', controller.update);

// Delete a User with Id
router.delete('/:userId', controller.delete);

module.exports = router;