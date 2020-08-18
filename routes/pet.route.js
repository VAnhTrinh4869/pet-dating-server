const express = require('express');
const router = express.Router();

const controller = require('../controllers/pet.controller');

router.get('/', controller.getAll);

router.get('/breeds', controller.getAllPetBreeds);

router.get('/others', controller.getOthersPet);

router.get('/allOthers', controller.getAllOthersPet);

router.get('/topLike', controller.getTopLike);

router.get('/topMatch', controller.getTopMatch);

router.get('/isMatch', controller.isMatch);

router.get('/:id', controller.get);

router.get('/:id/allInfo', controller.getAllInfomation);

router.post('/', controller.createNewPet);

router.post('/report', controller.report);

router.post('/:id/pictures', controller.insertPictures);

router.put('/setActive', controller.setActivePet);

router.put('/updateMatch', controller.updateMatch);

router.put('/:id', controller.updatePet);

router.delete('/:id', controller.deletePet);

module.exports = router;