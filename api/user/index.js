var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
const {isAuthenticated, hasRole} = require('../auth/auth.service');

// Create a new User
router.post('/', controller.create);

// Retrieve all User
router.get('/', hasRole('admin'), controller.findAll);

// Retrieve a single User by Id
router.get('/:id', isAuthenticated(), controller.find);

// Update a User with Id
router.put('/:id', isAuthenticated(), controller.update);

// Update User's password with Id
router.put('/password/:id', isAuthenticated(), controller.changePassword);

// Delete a User with Id
router.delete('/:id', hasRole('admin'), controller.delete);

module.exports = router;
