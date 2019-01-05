'use strict';

const path = require('path'),

	genericValidator = require(path.join(__dirname, 'generic'));

class validator extends genericValidator {
	id() {
		this.req.checkParams('id', 'Identyfikator musi być liczbą.').isInt();
	}

	name() {
		this.req.checkBody('name', 'Nazwa nie może być pusta.').notEmpty();
		this.req.checkBody('name', 'Nazwa nie może mieć mniej niż 3 oraz więcej niż 255 znaków.').isLength({
			min: 3,
			max: 255
		});
	}
}

module.exports = validator;
