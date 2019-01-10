'use strict';

const express = require('express'),
	path = require('path'),

	Recipe = require(path.join(__dirname, '..', 'modules', 'recipe')),
	RecipeValidator = require(path.join(__dirname, '..', 'validators', 'recipe')),

	router = express.Router();

router.post('/', (req, res, next) => {
	new RecipeValidator(req, [
		'name',
		'ingredients'
	]).validate().then(() => {
		return new Recipe(req.body).create();
	}).then(recipe => {
		res.json(recipe);
	}).catch(err => {
		next(err);
	});
});

router.get('/list', (req, res, next) => {
	Recipe.list().then(recipes => {
		res.json(recipes);
	}).catch(err => {
		next(err);
	});
});

router.delete('/:id', (req, res, next) => {
	new RecipeValidator(req, [
		'id'
	]).validate().then(() => {
		return new Recipe(req.params).delete();
	}).then(() => {
		res.status(204).end();
	}).catch(err => {
		next(err);
	});
});

router.get('/:id', (req, res, next) => {
	new RecipeValidator(req, [
		'id'
	]).validate().then(() => {
		return new Recipe(req.params).read();
	}).then(recipe => {
		res.json(recipe);
	}).catch(err => {
		next(err);
	});
});

router.put('/:id', (req, res, next) => {
	new RecipeValidator(req, [
		'id',
		'name',
		'ingredients'
	]).validate().then(() => {
		return new Recipe({
			id: req.params.id,
			name: req.body.name,
			ingredients: req.body.ingredients,
			description: req.body.description
		}).update();
	}).then(() => {
		res.status(204).end();
	}).catch(err => {
		next(err);
	});
});

module.exports = router;
