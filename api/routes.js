const express = require('express')
const router = express.Router()
const {
    getAllRecipes,
    resetToDefaults,
    saveNewRecipe,
    getOneRecipe,
    updateRecipe,
    deleteRecipe
} = require('./database/api.js')

router.get('/', (req, res) => {
    res.json({message: 'api home route works'})
})

router.get('/getAllRecipes', (req, res) => {
    getAllRecipes().then(recipes => {
        res.json(recipes)
    })
})

router.get('/resetToDefaults', (req, res) => {
    resetToDefaults().then(recipes => {
        res.json(recipes)
    })
})

router.get('/getOneRecipe/:id', (req, res) => {
    getOneRecipe(req.params.id).then(recipe => {
        res.json(recipe)
    })
})

router.post('/saveNewRecipe', (req, res) => {
    saveNewRecipe(req.body)
    res.json({recipe: req.body})
})

router.put('/updateRecipe/:id', (req, res) => {
    updateRecipe(req.params.id, req.body)
    res.json({recipe: req.body})
})

router.delete('/deleteRecipe/:id', (req, res) => {
    deleteRecipe(req.params.id)
    res.json({recipe: req.params.id})
})

module.exports.apiRouter = router
