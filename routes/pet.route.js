const express = require('express');
const router = express.Router();

const controller = require('../controllers/pet.controller');

router.get('/', controller.getAll);

router.get('/breeds', controller.getAllPetBreeds);

router.get('/:id', controller.get);

router.post('/', controller.createNewPet);

router.put('/:id', controller.updatePet);

module.exports = router;