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
		res.send(user);
	});
};
 
// FETCH all Users
exports.findAll = (req, res) => {
	User.findAll().then(users => {
	  // Send all users to Client
	  res.send(users);
	});
};
 
// Find a User by Id
exports.findById = (req, res) => {	
	User.findById(req.params.userId).then(user => {
		res.send(user);
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
		}).then(() => {
			res.status(200).send("updated successfully a user with id = " + id);
		});
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a user with id = ' + id);
	});
};