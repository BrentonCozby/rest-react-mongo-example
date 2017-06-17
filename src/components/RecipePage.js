import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../css/RecipePage.css'

class RecipePage extends Component {

    goToRecipeEditor = () => {
        this.props.history.push('/recipe-editor/' + this.props.recipe._id)
    }

    deleteRecipe = () => {
        fetch(`http://localhost:5000/api/deleteRecipe/${this.props.recipe._id}`, {
            method: 'DELETE'
        })
        .then(res => {
            return res.json()
        })
        .then(json => {
            console.log(json);
            this.props.history.push('/recipes')
        })
    }

    render () {
        const {
            title,
            imageUrl,
            description,
            ingredients,
            instructions
        } = this.props.recipe

        return (
            <div className="RecipePage">
                <button onClick={this.deleteRecipe}>Delete Recipe</button>
                <button onClick={this.goToRecipeEditor}>Edit Recipe</button>
                <h2 className="title">{title}</h2>
                <img src={imageUrl} alt={title} />
                <p className="description">{description}</p>
                <h4>Ingredients</h4>
                <ul className="ingredients">
                    {ingredients && ingredients.map(ingredient => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
                <h4>Instructions</h4>
                <ol className="instructions">
                    {instructions && instructions.map(instruction => (
                        <li key={instruction}>{instruction}</li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default withRouter(RecipePage)
