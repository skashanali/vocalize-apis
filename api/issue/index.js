var express = require('express');
var router = express.Router();
var controller = require('./issue.controller');
const {isAuthenticated, hasRole} = require('../auth/auth.service');

// Create a new Issue
router.post('/', hasRole('citizen'), controller.create);

// Retrieve all Issues
router.get('/', isAuthenticated(), controller.findAll);

// Retrieve a single Issue by Id
router.get('/:id', isAuthenticated(), controller.find);

// Update an Issue with Id
router.put('/:id', isAuthenticated(), controller.update);

// Update an Issue push with Id
router.put('/push/:id', isAuthenticated(), controller.updatePush);

// Delete an Issue with Id
router.delete('/:id', isAuthenticated(), controller.delete);

module.exports = router;
