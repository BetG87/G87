const middlewareController = require('../controller/middlewareController');
const gameController = require('../controller/gameProducController');
const router = require('express').Router();

router.get('/', gameController.getAllGameProduct);
router.post('/', gameController.addGameProduct);
router.get('/:id', gameController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, gameController.deleteGameProduct);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, gameController.updateGameProduct);
module.exports = router