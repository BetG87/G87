const qrController = require('../controller/qrController');
const router = require('express').Router();

router.get('/', qrController.getAllQr);
router.post('/', qrController.addQr);
router.get('/:id', qrController.getById);
router.post('/delete', qrController.deleteQr);
router.post('/update', qrController.updateQr);
router.get('/domain/:domain', qrController.getByDomain);
module.exports = router