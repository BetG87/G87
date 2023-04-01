const gameAccountController = require('../controller/gameAccountController');
const middlewareController = require('../controller/middlewareController');

const router = require('express').Router();

router.get('/', gameAccountController.getAllGameAccount);
router.post('/', gameAccountController.addBankAccount);
router.get('/:id', gameAccountController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, gameAccountController.deleteGameAccount);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, gameAccountController.updateGameAccount);
module.exports = router