const middlewareController = require('../controller/middlewareController');
const userController = require('../controller/userController');

const router = require('express').Router();



//GET ALL USER

router.get('/', middlewareController.verifyTokenAndAdminAuth, userController.getAllUser);
router.get('/:id', middlewareController.verifyToken, userController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, userController.deletedUser);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, userController.updateUser);
router.post('/changepass', middlewareController.verifyTokenAndAdminAuth, userController.changePassword);
router.post('/usernameisexist', userController.usernameisexist);
router.post('/emailisexist', userController.emailisexist);
module.exports = router