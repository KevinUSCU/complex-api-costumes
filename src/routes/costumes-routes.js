const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes-controllers')

// Routes for Costumes
router.get('/', ctrl.getAllCostumes)
router.get('/:id', ctrl.getCostume)
router.post('/', ctrl.createCostume)
router.post('/random/:number', ctrl.randomCostumes)
router.put('/:id', ctrl.updateCostume)
router.delete('/:id', ctrl.deleteCostume)

// Routes for Tags
router.get('/tags', ctrl.getCostumeTags)
router.get('/tags/:id', ctrl.getCostumeTag)
router.post('/tags', ctrl.createCostumeTag)
router.put('/tags/:id', ctrl.updateCostumeTag)
router.delete('/tags/:id', ctrl.deleteCostumeTag)

module.exports = router