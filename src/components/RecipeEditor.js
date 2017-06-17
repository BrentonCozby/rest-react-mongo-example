import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import escape from 'escape-html'
import '../css/RecipeEditor.css'

class RecipeEditor extends Component {

    componentWillMount() {
        this.ingredients = []
        this.instructions = []

        if(this.props.ingredients) {
            this.ingredients =  this.props.ingredients.map(ingredient => {
                return { defaultValue: ingredient, el: null }
            })
        }

        if(this.props.instructions) {
            this.instructions =  this.props.instructions.map(instruction => {
                return { defaultValue: instruction, el: null }
            })
        }
    }

    addIngredient = () => {
        this.ingredients.push({defaultValue: '', el: null})

        this.ingredients = this.ingredients.map(ingredient => {
            return {
                defaultValue: (ingredient.el) ? ingredient.el.value : '',
                el: ingredient.el
            }
        })

        this.forceUpdate()
    }

    addInstruction = () => {
        this.instructions.push({defaultValue: '', el: null})

        this.instructions = this.instructions.map(instruction => {
            return {
                defaultValue: (instruction.el) ? instruction.el.value : '',
                el: instruction.el
            }
        })

        this.forceUpdate()
    }

    saveRecipe = () => {
        const recipe = {
            title: escape(this.title.value),
            description: escape(this.description.value),
            imageUrl: escape(this.imageUrl.value),
            ingredients: [],
            instructions: []
        }

        if(this.ingredients && this.ingredients.length) {
            recipe.ingredients = this.ingredients.map(ingredient => (
                escape(ingredient.el.value)
            ))
        }

        if(this.instructions && this.instructions.length) {
            recipe.instructions = this.instructions.map(instruction => (
                escape(instruction.el.value)
            ))
        }

        const endpoint = (this.props._id)
            ? `http://localhost:5000/api/updateRecipe/${this.props._id}`
            : 'http://localhost:5000/api/saveNewRecipe'
        const method = (this.props._id)
            ? 'PUT'
            : 'POST'

        fetch(endpoint, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
        .then(res => {
            return res.json()
        })
        .then(json => {
            console.log(json);
            this.props.history.push('/recipes')
        })
    }

    render() {
        const { title, description, imageUrl } = this.props
        return (
            <div className="RecipeEditor">
                <div className="form-input">
                    <label htmlFor="">title</label>
                    <input
                        type="text"
                        defaultValue={title}
                        ref={input => this.title = input}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">description</label>
                    <textarea
                        defaultValue={description}
                        ref={textarea => this.description = textarea}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">image url</label>
                    <input
                        type="text"
                        defaultValue={imageUrl}
                        ref={input => this.imageUrl = input}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">ingredients</label>
                    <ul className="ingredients">
                        {this.ingredients && this.ingredients.length !== 0 && this.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    defaultValue={ingredient.defaultValue}
                                    ref={input => this.ingredients[index].el = input}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={this.addIngredient}>+ Add ingredient</button>
                </div>
                <div className="form-input">
                    <label htmlFor="">instructions</label>
                    <ul className="instructions">
                        {this.instructions && this.instructions.length !== 0 && this.instructions.map((instruction, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    defaultValue={instruction.defaultValue}
                                    ref={input => this.instructions[index].el = input}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={this.addInstruction}>+ Add instruction</button>
                </div>
                <button onClick={this.saveRecipe}>Save Recipe</button>
            </div>
        )
    }
}

export default withRouter(RecipeEditor)
