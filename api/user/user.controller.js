const db = require('../../config/db.config');
const User = db.User;
const {authenticate} = require('../auth/auth.service');
 
// Creates  a User
exports.create = (req, res) => {
	User.create(req.body).then(user => {
		res.json(user);
	})
	.catch(err => {
		res.status(422).json({message: err.errors[0].message})
	});
};
 
// Get all Users
exports.findAll = (req, res) => {
	User.findAll({
		attributes: [ 'id', 'name', 'email', 'cnic', 'role' ]
	})
	.then(users => {
		if(users.length === 0)  return res.status(404).json({message: 'No users found.'})
		res.json(users);
	});
};
 
// Find a User by Id
exports.find = (req, res) => {	
	User.findOne({
		where: {id: req.params.id},
		attributes: [ 'id', 'name', 'email', 'cnic', 'role' ]
	})
	.then(user => {
		if(!user) return res.status(404).json({message: 'User not found.'})
		res.json(user);
	});
};
 
// Update a User by Id
exports.update = (req, res) => {
	User.update(req.body, { 
			where: {id: req.params.id} 
		})
		.then(modified => {
			let [count] = modified;
			if(!count) return res.status(404).json({message: 'User not found.'})
			res.json({message: `Successfully updated a user with id = ${req.params.id}`});
		})
		.catch(err => {
			res.status(422).json({message: err.errors[0].message})
		});
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	User.destroy({
	  where: { id: req.params.id }
	})
	.then(user => {
		if(!user) return res.status(404).json({message: 'User not found.'})
		res.json({message: `Successfully deleted a user with id = ${req.params.id}`});
	});
};

// Change user's password
exports.changePassword = (req, res) => {
	User.findOne({
		where: { id: req.params.id }
	})
	.then(user => {
		if(!user) return res.status(404).json({message: 'User not found.'})
		if(!authenticate(req.body.oldPassword, user.password)) return res.status(404).json({message: 'Old password is not correct.'})
		if(!req.body.newPassword) return  res.status(404).json({message: 'New password can\'t be empty.'})
		User.update({password: req.body.newPassword}, {
			where: { id: req.params.id }
		})
		.then(() => {
			res.json({message: `Successfully updated user's password with id = ${req.params.id}`});
		});
	});
}
