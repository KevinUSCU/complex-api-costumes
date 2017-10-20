const faker = require('faker')
const uuid = require('uuid/v4')
const fs = require('fs')
const costumesDb = '../../db/costumes-database.json'
const tagsDb = '../../db/tags-database.json'

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
      description: `${faker.commerce.productAdjective()} costume made of ${faker.commerce.productMaterial()}.`,
      tags: costumeTags
    }
    costumes.push(costume)
    newCostumes.push(costume)
  }
  // Write back to costumes database file
  fs.writeFileSync(costumesDb, JSON.stringify(costumes))
  return newCostumes
}

// function getAll() {
//   return trolls
// }

// function getTroll(id) {
//   const troll = trolls.find(troll => troll.id === id)
  
//   let response
//   if (!troll) {
//     let status = 404
//     let message = `Sneaky trolls... could not find a troll with id of ${id}.`
//     response = { errors: { status, message } }
//   } else {
//     response = troll
//   }

//   return response
// }

// function create(body) {
//   const { name, type, color, numBridges } = body

//   let response
//   if (!name || !type || !color || !numBridges) {
//     let status = 400
//     let message = `You can't have a troll without a name, type, color, and the number of bridges they watch over!`
//     response = { errors: { status, message } }
//   } else {
//     const troll = { id: uuid(), name, type, color, numBridges }
//     troll.push(troll)
//     response = troll
//   }

//   return response
// }

// function update(id, body) {
//   const troll = trolls.find(troll => troll.id === id)
// console.log(troll)
//   let response
//   if (!troll) {
//     let status = 404
//     let message = `Sneaky trolls... could not find a troll with id of ${id}.`
//     response = { errors: { status, message } }
//   } else {
//     const { name, type, color, numBridges } = body
//     if (!name && !type && !color && !numBridges) {
//       let status = 400
//       let message = `Some troll detail(s) to change must be provided - none were!`
//       response = { errors: { status, message } }
//     } else {
//       if (name) troll.name = name
//       if (type) troll.type = type
//       if (color) troll.color = color
//       if (numBridges) troll.numBridges = numBridges
//       response = troll
//     }
//   }

//   return response
// }

// function del(id) {
//   const troll = trolls.find(troll => troll.id === id)
  
//   let response
//   if (!troll) {
//     let status = 404
//     let message = `Sneaky trolls... could not find a troll with id of ${id}.`
//     response = { errors: { status, message } }
//   } else {
//     const index = trolls.indexOf(troll)
//     response = trolls.splice(index, 1)[0]
//   }

//   return response
// }

// module.exports = {
//   getAll,
//   getTroll,
//   create,
//   update,
//   del,
//   randomTrolls
// }