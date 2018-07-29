var express = require('express');
var router = express.Router();
var controller = require('./auth');

router.post('/', controller.authenticate);

module.exports = router;
