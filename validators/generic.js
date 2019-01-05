'use strict';

const status = require('http-status-codes');

class validator {
	constructor(req, fields) {
		this.req = req;
		this.fields = fields;
	}

	validate() {
		return new Promise((resolve, reject) => {
			this.fields.forEach(field => {
				this[field]();
			});

			const validationErrors = this.req.validationErrors();

			if (validationErrors)
				return reject({
					status: status.BAD_REQUEST,
					errors: validationErrors.map(err => {
						return {
							field: err.param,
							message: err.msg
						}
					})
				});

			resolve();
		});
	}
}

module.exports = validator;
