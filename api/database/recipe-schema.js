// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const recipeSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    ingredients: [String],
    instructions: [String]
})

// the schema is useless so far
// we need to create a model using it
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
