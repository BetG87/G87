const middlewareController = require('../controller/middlewareController');
const linkGameController = require('../controller/linkgameController');
const router = require('express').Router();

router.get('/', linkGameController.getAllLinkGame);
router.post('/', linkGameController.addLinkGame);
router.get('/:id', linkGameController.getById);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, linkGameController.deleteLinkGame);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, linkGameController.updateLinkGame);
module.exports = router