//Import the mongoose module
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost/recipes-app'
mongoose.connect(mongoDB)

//Get the default connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const Recipe = require('./recipe-schema.js')

module.exports.getOneRecipe = function(recipeId) {
    return new Promise((resolve, reject) => {
        Recipe.findById(recipeId, (err, recipe) => {
            if (err) throw err

            resolve(recipe)
        })
    })
}

module.exports.getAllRecipes = function() {
    return new Promise((resolve, reject) => {
        Recipe.find({}, (err, recipes) => {
            if (err) throw err

            resolve(recipes)
        })
    })
}

module.exports.saveNewRecipe = function(recipe) {
    const newRecipe = new Recipe(recipe)

    newRecipe.save(err => {
        if (err) throw err

        console.log('Recipe Saved!\n')
        console.log(recipe, '\n')
    })
}

module.exports.updateRecipe = function(recipeId, recipe) {
    Recipe.findByIdAndUpdate(recipeId, recipe, (err, recipe) => {
        if (err)  throw err

        console.log('Recipe Updated!\n')
        console.log(recipe, '\n')
    })
}

module.exports.deleteRecipe = function(recipeId) {
    Recipe.findByIdAndRemove(recipeId, err => {
        if (err) throw err

        console.log('Recipe deleted!')
    })
}
