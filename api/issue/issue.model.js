module.exports = (sequelize, Sequelize) => {
	const Issue = sequelize.define('issue', {
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		category: {
			type: Sequelize.STRING,
			allowNull: false
        },
        city: {
			type: Sequelize.STRING,
			allowNull: false
        },
		location: {
			type: Sequelize.STRING,
			allowNull: false
        },
        createdBy: {
			type: Sequelize.INTEGER,
			allowNull: false
        },
        pushUp:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        pushDown:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
		status: {
			type: Sequelize.STRING,
			defaultValue: 'pending'
		}
	});

	return Issue;
}
