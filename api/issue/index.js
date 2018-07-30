var express = require('express');
var router = express.Router();
var controller = require('./issue.controller');
const {isAuthenticated, hasRole} = require('../auth/auth.service');

// Create a new Issue
router.post('/', controller.create);

// Retrieve all Issues
router.get('/', controller.findAll);

// Retrieve a single Issue by Id
router.get('/:id', controller.find);

// Update an Issue with Id
router.put('/:id', controller.update);

// Update an Issue push with Id
router.put('/push/:id', controller.updatePush);

// Delete an Issue with Id
router.delete('/:id', controller.delete);

module.exports = router;
