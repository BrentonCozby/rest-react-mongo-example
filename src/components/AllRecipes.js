import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from './Card.js'
import '../css/AllRecipes.css'

class AllRecipes extends Component {

    state = {
        recipes: []
    }

    loadDefaults = () => {
        fetch('http://localhost:5000/api/resetToDefaults')
        .then(res => {
            return res.json()
        })
        .then(json => {
            console.log(json);
            this.setState({
                recipes: json
            })
            this.props.history.replace('/recipes')
        })
    }

    componentWillMount() {
        if(this.props.isDefaults) {
            this.loadDefaults()
        }
        else {
            this.getRecipes()
        }
    }

    getRecipes = () => {
        fetch('http://localhost:5000/api/getAllRecipes')
        .then(res => {
            return res.json()
        })
        .then(json => {
            console.log(json);
            this.setState({
                recipes: json
            })
        })
    }

    render() {
        const { recipes } = this.state
        return (
            <div className="AllRecipes">
                {recipes.length !== 0 && recipes.map(recipe => (
                    <Card
                        key={recipe._id}
                        _id={recipe._id}
                        getOneRecipe={this.props.getOneRecipe}
                        title={recipe.title}
                        imageUrl={recipe.imageUrl}
                    />
                ))}
            </div>
        )
    }
}

export default withRouter(AllRecipes)
