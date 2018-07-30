var bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		name: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: {
				msg: 'The specified email address is already in use.'
			},
            validate: {
                isEmail: {
					msg: 'Email address must be valid.'
				}
            }
		},
		cnic: {
			type: Sequelize.INTEGER,
			unique: {
				msg: 'The specified cnic number is already in use.'
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			set: function setPassword(pwd) {
				// hash the password
				this.setDataValue('password', bcrypt.hashSync(pwd, 10));
			}
		},
		type: {
			type: Sequelize.STRING,
		},
		city: {
			type: Sequelize.STRING,
		},
		area: {
			type: Sequelize.STRING,
		},
		role: {
			type: Sequelize.STRING,
			defaultValue: 'citizen'
		}
	});

	return User;
}
