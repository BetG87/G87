const bankAccountController = require('../controller/bankAccountController');
const middlewareController = require('../controller/middlewareController');

const router = require('express').Router();

router.get('/', bankAccountController.getAllBankAccount);
router.get('/admin', bankAccountController.getAllBankAccountAdmin);
router.post('/', bankAccountController.addBankAccount);
router.get('/:id', bankAccountController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, bankAccountController.deleteBankAccount);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, bankAccountController.updateBankAccount);
module.exports = router