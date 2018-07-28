var path = require('path');

module.exports = function(app) {
    app.use('/api/users', require('./api/user'));
    // app.use('/auth', require('./auth').default);
}