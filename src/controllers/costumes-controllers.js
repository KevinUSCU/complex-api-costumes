const model = require('../models/costumes-model')

// COSTUME CONTROLLERS
function getAllCostumes(req, res, next) {
  const result = model.getAllCostumes()
  res.status(200).json({ data: result })
}

function getCostume(req, res, next) {
  const id = req.params.id
  const result = model.getCostume(id)

  if (result.errors) {
    return next(result.errors)
  }

  res.status(200).json({ data: result })
}

function createCostume(req, res, next) {
  const result = model.createCostume(req.body)

  if (result.errors) {
    return next(result.errors)
  }

  res.status(201).json({ data: result })
}

function updateCostume(req, res, next) {
  const id = req.params.id
  const body = req.body
  const result = model.updateCostume(id, body)

  if (result.errors) {
    return next(result.errors)
  }
  
  res.status(200).json({ data: result })
}

function deleteCostume(req, res, next) {
  const id = req.params.id
  const result = model.deleteCostume(id)
  console.log(result)
  if (result.errors) {
    return next(result.errors)
  }
  
  res.status(200).json({ data: result })
}

function randomCostumes(req, res, next) {
  let num = Number(req.params.number)
  const result = model.randomCostumes(num)

  if (result.errors) {
    return next(result.errors)
  }

  res.status(201).json(result)
}

// TAG CONTROLLERS
function getCostumeTags(req, res, next) {
  const result = model.getCostumeTags()
  res.status(200).json({ data: result })
}

function getCostumeTag(req, res, next) {
  const id = req.params.id
  const result = model.getCostume(id)

  if (result.errors) {
    return next(result.errors)
  }

  res.status(200).json({ data: result })
}

function createCostumeTag(req, res, next) {
  const result = model.createCostumeTag(req.body)

  if (result.errors) {
    return next(result.errors)
  }

  res.status(201).json({ data: result })
}

function updateCostumeTag(req, res, next) {
  const id = req.params.id
  const body = req.body
  const result = model.updateCostumeTag(id, body)

  if (result.errors) {
    return next(result.errors)
  }
  
  res.status(200).json({ data: result })
}

function deleteCostumeTag(req, res, next) {
  const id = req.params.id
  const result = model.deleteCostumeTag(id)
  console.log(result)
  if (result.errors) {
    return next(result.errors)
  }
  
  res.status(200).json({ data: result })
}

module.exports = {
  getAllCostumes,
  getCostume,
  createCostume,
  randomCostumes,
  updateCostume,
  deleteCostume,
  getCostumeTags,
  getCostumeTag,
  createCostumeTag,
  updateCostumeTag,
  deleteCostumeTag
}