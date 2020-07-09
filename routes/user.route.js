const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.get('/', (req, res) => res.send('Hello'));

router.get('/getAll', controller.getAll);

router.get('/:id', controller.get);

router.post('/insert_new_user', controller.insertNewUser);

module.exports = router;