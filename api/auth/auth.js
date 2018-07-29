const db = require('../../config/db.config');
const User = db.User;
const {authenticate, signToken} = require('./auth.service');

// User Authentication
exports.authenticate = (req, res) => {
	User.findOne({
		where: {email: req.body.email}
	})
	.then(user => {
		if(!user) return res.status(404).json({message: 'This email is not registered.'})
        if(!authenticate(req.body.password, user.password)) return res.status(404).json({message: 'This password is not correct.'})
        let role = user.role, token = signToken(user._id, role);
        res.json({ token, role });
	});
};