const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.post('/', equipmentController.createEquipment);
router.get('/', equipmentController.getAllEquipment);
router.get('/:id/history', equipmentController.getEquipmentHistory); 

module.exports = router;