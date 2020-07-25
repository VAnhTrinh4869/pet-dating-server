const express = require('express');
const router = express.Router();

const controller = require('../controllers/pet.controller');

router.get('/', controller.getAll);

router.get('/breeds', controller.getAllPetBreeds);

router.get('/others', controller.getOthersPet);

router.get('/:id', controller.get);

router.post('/', controller.createNewPet);

router.put('/setActive', controller.setActivePet);

router.put('/:id', controller.updatePet);

router.delete('/:id', controller.deletePet);

module.exports = router;