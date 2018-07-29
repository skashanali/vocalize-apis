module.exports = function(app) {
    app.use('/api/users', require('./api/user'));
    app.use('/api/auth', require('./api/auth'));
}
