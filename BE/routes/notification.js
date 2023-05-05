const middlewareController = require('../controller/middlewareController');
const notificationController = require('../controller/notificationController');
const router = require('express').Router();

router.get('/', notificationController.getAllNotification);
router.post('/', notificationController.addNotification);
router.get('/:id', notificationController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth,notificationController.deleteNotification);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, notificationController.updateNotification);
module.exports = router