const middlewareController = require('../controller/middlewareController');
const statusController = require('../controller/statusController');
const router = require('express').Router();

router.get('/', statusController.getAllStatus);
router.post('/', statusController.addStatus);
router.get('/:id', statusController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth,statusController.deleteStatus);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, statusController.updateStatus);
module.exports = router