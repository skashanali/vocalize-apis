const db = require('../../config/db.config');
const User = db.users;
 
// Post a User
exports.create = (req, res) => {
	// Save to MySQL database
	User.create({  
	  name: req.body.name,
	  email: req.body.email,
		cnic: req.body.cnic,
		password: req.body.password
	}).then(user => {		
		// Send created user to client
		res.json(user);
	});
};
 
// FETCH all Users
exports.findAll = (req, res) => {
	User.findAll().then(users => {
	  // Send all users to Client
	  res.json(users);
	});
};
 
// Find a User by Id
exports.findById = (req, res) => {	
	User.findById(req.params.userId).then(user => {
		res.json(user);
	})
};
 
// Update a User
exports.update = (req, res) => {
	const id = req.params.userId;
	User.update( 
		{ 
			name: req.body.name,
			email: req.body.email,
			cnic: req.body.cnic,
			password: req.body.password 
		}, { 
			where: {id: id} 
		}).then((user) => {
			res.status(200).json(user);
		});
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({message: `Deleted successfully a user with id = ${id}`});
	});
};