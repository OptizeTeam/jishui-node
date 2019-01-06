'use strict';

const status = require('http-status-codes'),
	path = require('path'),

	models = require(path.join(__dirname, '..', 'models'));

class Recipe {
	constructor(recipe) {
		this.id = recipe.id;
		this.name = recipe.name;
		this.description = recipe.description;
	}

	construct(recipe) {
		this.id = recipe.id;
		this.name = recipe.name;
		this.description = recipe.description;
	}

	get getId() {
		return this.id;
	}

	get getName() {
		return this.name;
	}

	get getDescription() {
		return this.description;
	}

	create() {
		return new Promise((resolve, reject) => {
			models.recipe.create({
				name: this.getName,
				description: this.getDescription
			}).then((recipe) => {
				this.construct(recipe);

				return resolve({
					id: this.getId
				});
			}).catch(reject);
		});
	};

	findByPk() {
		return new Promise((resolve, reject) => {
			models.recipe.findByPk(this.getId).then(recipe => {
				if (null === recipe)
					return reject({
						status: status.NOT_FOUND,
						errors: [{
							message: 'Przepis o podanym identyfikatorze nie istnieje.'
						}]
					});

				return resolve(recipe);
			}).catch(reject);
		});
	}

	read() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(recipe => {
				this.construct(recipe);

				return resolve(this);
			}).catch(reject);
		});
	}

	update() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(recipe => recipe.update({
				name: this.getName,
				description: this.getDescription
			})).then(() => resolve()).catch(reject);
		});
	};

	delete() {
		return new Promise((resolve, reject) => {
			this.findByPk().then(recipe => {
				return recipe.destroy();
			}).then(() => resolve()).catch(reject);
		});
	}

	static list() {
		return new Promise((resolve, reject) => {
			models.recipe.findAll({
				order: [['name', 'asc']]
			}).then(recipes => {
				const recipesResponse = [];

				recipes.forEach(recipe => {
					recipesResponse.push({
						id: recipe.id,
						name: recipe.name
					});
				});

				return resolve(recipesResponse);
			}).catch(reject);
		});
	}
}

module.exports = Recipe;
