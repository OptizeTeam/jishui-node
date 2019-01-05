'use strict';

module.exports = (sequelize, DataTypes) => {
	const recipe = sequelize.define('recipe', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		}
	});

	return recipe;
};
