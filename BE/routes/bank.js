const middlewareController = require('../controller/middlewareController');
const bankController = require('../controller/bankController');
const router = require('express').Router();

router.get('/', bankController.getAllBank);
router.post('/', bankController.addBank);
router.get('/:id', bankController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, bankController.deleteBank);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, bankController.updateBank);
module.exports = router