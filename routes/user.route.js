const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.get('/currentUser', controller.getCurrentUser);

router.get('/:id', controller.get);

router.put('/', controller.updateUser);

router.get('/getDrawer', controller.getDrawer)

module.exports = router;