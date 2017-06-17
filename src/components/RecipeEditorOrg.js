import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../css/RecipeEditor.css'

class RecipeEditor extends Component {

    state = {
        title: this.props.title || '',
        description: this.props.description || '',
        imageUrl: this.props.imageUrl || '',
        ingredients: this.props.ingredients || [],
        instructions: this.props.instructions || []
    }

    onIngredientChange = (e, index) => {
        const ingredients = [...this.state.ingredients]

        ingredients[index] = e.target.value

        this.setState({ ingredients })
    }

    onInstructionChange = (e, index) => {
        const instructions = [...this.state.instructions]

        instructions[index] = e.target.value

        this.setState({ instructions })
    }

    addIngredient = () => {
        const ingredients = [...this.state.ingredients]

        ingredients.push('')

        this.setState({ ingredients })
    }

    addInstruction = () => {
        const instructions = [...this.state.instructions]

        instructions.push('')

        this.setState({ instructions })
    }

    saveRecipe = () => {
        const recipe = {...this.state}
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
        return (
            <div className="RecipeEditor">
                <div className="form-input">
                    <label htmlFor="">title</label>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={e => this.setState({title: e.target.value})}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">description</label>
                    <input
                        type="text"
                        value={this.state.description}
                        onChange={e => this.setState({description: e.target.value})}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">image url</label>
                    <input
                        type="text"
                        value={this.state.imageUrl}
                        onChange={e => this.setState({imageUrl: e.target.value})}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">ingredients</label>
                    <ul className="ingredients">
                        {this.state.ingredients.map((ingredient, index) => (
                            <li key={ingredient}>
                                <input
                                    type="text"
                                    onChange={e => this.onIngredientChange(e, index)}
                                    value={ingredient}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={this.addIngredient}>Add ingredient</button>
                </div>
                <div className="form-input">
                    <label htmlFor="">instructions</label>
                    <ul className="instructions">
                        {this.state.instructions.map((instruction, index) => (
                            <li key={instruction}>
                                <input
                                    type="text"
                                    onChange={e => this.onInstructionChange(e, index)}
                                    value={instruction}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={this.addInstruction}>Add instruction</button>
                </div>
                <button onClick={this.saveRecipe}>Save Recipe</button>
            </div>
        )
    }
}

export default withRouter(RecipeEditor)
