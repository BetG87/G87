const tramsactionController = require('../controller/transactiontController');
const middlewareController = require('../controller/middlewareController');

const router = require('express').Router();

router.get('/', tramsactionController.getAllTransaction);
router.post('/', tramsactionController.addTransaction);
router.get('/:id', tramsactionController.getById);
router.get('/user/:id', tramsactionController.getByUserId);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, tramsactionController.deleteTransaction);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, tramsactionController.updateTransaction);
module.exports = router