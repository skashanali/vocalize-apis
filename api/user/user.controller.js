const db = require('../../config/db.config');
const User = db.users;
 
// Creates  a User
exports.create = (req, res) => {
	User.create(req.body).then(user => {
		res.json(user);
	})
	.catch(err => {
		res.status(400).json({message: err.errors[0].message})
	});
};
 
// Get all Users
exports.findAll = (req, res) => {
	User.findAll().then(users => {
		if(users.length===0) res.status(404).json({message: 'No users found.'})
		else res.json(users);
	});
};
 
// Find a User by Id
exports.findById = (req, res) => {	
	User.findById(req.params.id).then(user => {
		if(!user) res.status(404).json({message: 'User not found.'})
		else res.json(user);
	});
};
 
// Update a User by Id
exports.update = (req, res) => {
	User.update(req.body, { 
			where: {id: req.params.id} 
		})
		.then(modified => {
			let [count] = modified;
			if(!count) res.status(404).json({message: 'User not found.'})
			else res.json({message: `Successfully updated a user with id = ${req.params.id}`});
		})
		.catch(err => {
			res.status(400).json({message: err.errors[0].message})
		});
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	User.destroy({
	  where: { id: req.params.id }
	})
	.then(user => {
		if(!user) res.status(404).json({message: 'User not found.'})
	  else res.json({message: `Successfully deleted a user with id = ${req.params.id}`});
	});
};
