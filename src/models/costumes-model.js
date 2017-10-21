const faker = require('faker')
const uuid = require('uuid/v4')
const fs = require('fs')
const costumesDb = 'db/costumes-database.json'
const tagsDb = 'db/tags-database.json'

// FUNCTIONS TO CREATE RANDOM DATA
function _randomTags(num) {
  // Internal function to generate tags *only* if none exist
  // We'll generate a minumum of 3 tags
  if (!num || num < 3) num = 3

  const tags = []
  // Generate prescribed number of tags
  for (let i = 1; i <= num; i++) {
    let tag = {
      id: uuid(),
      name: faker.commerce.department(),
      color: faker.internet.color()
    }
    tags.push(tag)
  }
  return tags
}

function randomCostumes(num) {
  // Outward facing function to generate random costumes
  if (!num || num < 1) {
    let status = 400
    let message = `Rumplestiltskin is ready, but he needs to know how many costumes to sew!`
    return { errors: { status, message } }
  }
  if (num > 100) {
    let status = 400
    let message = `Whoa! That's a lot of costumes, Rapunzel! How about we keep it to 100 or less?`
    return { errors: { status, message }}
  }

  // Get existing tags, or generate new ones
  const tags = JSON.parse(fs.readFileSync(tagsDb, 'utf-8'))
  if (tags.length < 3) {
    // If less than 3 tags, generate 5 additional tags and add them to database
    let newTags = _randomTags(5)
    // Add new tags to existing tags
    Array.prototype.push.apply(tags, newTags)
    // Write tags back to file
    fs.writeFileSync(tagsDb, JSON.stringify(tags))
  }

  // Get existing costumes
  const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8')) || []
  const newCostumes = []

  // Create random costumes
  for (let i = 1; i <= num; i++) {
    // Assign 3 random tag ids (or less if duplicated)
    let costumeTags = []
    for (let i = 1; i <= 3; i++) {
      let randomTagId = tags[Math.floor(Math.random() * tags.length)].id
      if (!costumeTags.find(element => element === randomTagId)) {
        costumeTags.push(randomTagId)
      }
    }
    // Build costume using random values
    let costume = {
      id: uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      description: `${faker.commerce.productAdjective()} costume made of ${faker.commerce.productMaterial()} fabric.`,
      tags: costumeTags
    }
    costumes.push(costume)
    newCostumes.push(costume)
  }
  // Write back to costumes database file
  fs.writeFileSync(costumesDb, JSON.stringify(costumes))
  return newCostumes
}

// FUNCTIONS FOR COSTUMES
function getAllCostumes() {
  const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8'))
  const allTags = JSON.parse(fs.readFileSync(tagsDb, 'utf-8'))
  // Replace tag ids with full tag info
  costumes.forEach(costume => {
    for (let i = 0; i < costume.tags.length; i++) {
      costume.tags[i] = allTags.find(element => element.id === costume.tags[i])
    }
  })
  return costumes
}

function getCostume(id) {
  const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8'))
  let costume = costumes.find(costume => costume.id === id)
  
  let response
  if (!costume) {
    let status = 404
    let message = `No threads here! Couldn't find a costume with an ID matching ${id}.`
    response = { errors: { status, message } }
  } else {
    // Replace tag ids with full tag info
    const allTags = JSON.parse(fs.readFileSync(tagsDb, 'utf-8'))
    for (let i = 0; i < costume.tags.length; i++) {
      costume.tags[i] = allTags.find(element => element.id === costume.tags[i])
    }
    response = costume
  }

  return response
}

function createCostume(body) {
  const { name, price, description, tags } = body

  let response
  if (!name || !price) {
    let status = 400
    let message = `You can't have a costume without a name and a price.`
    response = { errors: { status, message } }
  } else {
    const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8'))
    const costume = { id: uuid(), name, price, description, tags }
    costumes.push(costume)
    response = costume
    fs.writeFileSync(costumesDb, JSON.stringify(costumes))
  }

  return response
}

function updateCostume(id, body) {
  const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8'))
  const costume = costumes.find(costume => costume.id === id)

  let response
  if (!costume) {
    let status = 404
    let message = `No threads here! Couldn't find a costume with an ID matching ${id}.`
    response = { errors: { status, message } }
  } else {
    const { name, price, description, tags } = body
    if (!name && !price && !description && !tags) {
      let status = 400
      let message = `Some costume detail(s) to change must be provided - none were!`
      response = { errors: { status, message } }
    } else {
      if (name) costume.name = name
      if (price) costume.price = price
      if (description) costume.description = description
      if (tags) costume.tags = tags

      response = costume
      fs.writeFileSync(costumesDb, JSON.stringify(costumes))
    }
  }

  return response
}

function deleteCostume(id) {
  const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8'))  
  const costume = costumes.find(costume => costume.id === id)
  
  let response
  if (!costume) {
    let status = 404
    let message = `No threads here! Couldn't find a costume with an ID matching ${id}.`
    response = { errors: { status, message } }
  } else {
    const index = costumes.indexOf(costume)
    response = costumes.splice(index, 1)[0]
    fs.writeFileSync(costumesDb, JSON.stringify(costumes))
  }

  return response
}

// FUNCTIONS FOR TAGS
function getCostumeTags() {
  const costumes = JSON.parse(fs.readFileSync(costumesDb, 'utf-8'))
  const tags = JSON.parse(fs.readFileSync(tagsDb, 'utf-8'))
  return
}

function getCostumeTag() {

}

function createCostumeTag() {

}

function updateCostumeTag() {

}

function deleteCostumeTag() {

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