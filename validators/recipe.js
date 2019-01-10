'use strict';

const Ajv = require('ajv'),
	path = require('path'),

	genericValidator = require(path.join(__dirname, 'generic')),
	ingredientsSchema = require(path.join(__dirname, 'schemas', 'recipe', 'ingredients')),

	ajv = Ajv({
		allErrors: true
	}),
	validateIngredients = ajv.compile(ingredientsSchema);

class validator extends genericValidator {
	id() {
		this.req.checkParams('id', 'Identyfikator musi być liczbą.').isInt();
	}

	name() {
		this.req.checkBody('name', 'Nazwa nie może być pusta.').notEmpty()
		this.req.checkBody('name', 'Nazwa nie może mieć mniej niż 3 oraz więcej niż 255 znaków.').isLength({
			min: 3,
			max: 255
		});
	}

	ingredients() {
		this.req.checkBody('ingredients', 'Składniki muszą być tablicą.').isArray();
		this.req.checkBody('ingredients', 'Składniki są nieprawidłowo wypełnione.').custom(value => validateIngredients(value));
	}
}

module.exports = validator;
