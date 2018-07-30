const db = require('../../config/db.config');
const sequelize = db.sequelize;
const Issue = db.Issue;
const {scanQueryParams} = require('../../lib/index');
 
// Creates an Issue
exports.create = (req, res) => {
	// req.body.city = req.user.city;
	// req.body.createdBy = req.user.id;
	Issue.create(req.body).then(issue => {
		res.json(issue);
	})
	.catch(err => {
		res.status(422).json({message: err.errors[0].message})
	});
};
 
// Get all Issues
exports.findAll = (req, res) => {
    const scanedQuery = scanQueryParams(req.query, ['category', 'status', 'offset', 'limit', 'order', 'attributes'], ['offset', 'limit', 'order', 'attributes'], res);
    let { query, offset, limit, attributes, order } = scanedQuery;
	Issue.findAll({
        offset: offset,
        limit: limit,
        order: order,
        attributes: attributes,
        where: query
    }).then(issues => {
        if(issues.length === 0)  return res.status(404).json({message: 'No issues found.'})
        let count = issues.length;
		res.json({issues, count});
	});
};

// Find an Issue by Id
exports.find = (req, res) => {	
	Issue.findOne({
		where: {id: req.params.id},
	})
	.then(issue => {
		if(!issue) return res.status(404).json({message: 'Issue not found.'})
		res.json(issue);
	});
};
 
// Update an issue by Id
exports.update = (req, res) => {
	Issue.update(req.body, { 
			where: {id: req.params.id} 
		})
		.then(modified => {
			let [count] = modified;
			if(!count) return res.status(404).json({message: 'Issue not found.'})
			res.json({message: `Successfully updated a issue with id = ${req.params.id}`});
		})
		.catch(err => {
			res.status(422).json({message: err.errors[0].message})
		});
};

// Update push of an issue by Id
exports.updatePush = (req, res) => {
    var key, query;
    if(req.body.push === 'up') {
        key = 'pushUp';
        query = 'pushUp + 1';
    }
    else {
        key = 'pushDown';
        query = 'pushDown + 1';
    }
    Issue.update({ [key]: sequelize.literal(query) }, { where: { id: req.params.id } })
    .then(modified => {
        let [count] = modified;
        if(!count) return res.status(404).json({message: 'Issue not found.'})
        res.json({message: `Successfully updated a issue with id = ${req.params.id}`});
    })
    .catch(err => {
        res.status(422).json({message: err.errors[0].message})
    });
};
 
// Delete an Issue by Id
exports.delete = (req, res) => {
	Issue.destroy({
	  where: { id: req.params.id }
	})
	.then(issue => {
		if(!issue) return res.status(404).json({message: 'Issue not found.'})
		res.json({message: `Successfully deleted a issue with id = ${req.params.id}`});
	});
};
