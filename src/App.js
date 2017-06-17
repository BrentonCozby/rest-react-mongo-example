import React, {Component} from 'react'; // looks in node_modules
import logo from './logo.svg';
import './css/App.css';
import Card from './components/Card.js'
import { defaultRecipes } from './data.js'
import RecipePage from './components/RecipePage.js'
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom'

class App extends Component {

    state = {
        recipes: [],
        active: {}
    }

    componentWillMount() {
        this.getRecipes()
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

    getOneRecipe = (id) => {
        const recipe = this.state.recipes.find(recipe => {
            return recipe._id === id
        })
        this.setState({
            active: recipe
        })
    }

    saveNewRecipe = () => {
        fetch('http://localhost:5000/api/saveNewRecipe', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": "Medianoche",
                "description": "A Cuban sandwich with sweet bread",
                "imageUrl": "http://burgerbeast.com/wp-content/uploads/2014/05/Medianoche_ElCaribe.jpg",
                "ingredients": [
                    "4 sweet bread rolls",
                    "1/2 cup mayonnaise",
                    "1/4 cup prepared mustard",
                    "1 pound thinly sliced cooked ham",
                    "1 pound thinly sliced fully cooked pork",
                    "1 pound sliced Swiss cheese",
                    "1 cup dill pickle slices",
                    "2 tablespoons butter, melted"
                ],
                "instructions": [
                    "Split the sandwich rolls in half, and spread mustard and mayonnaise liberally onto the cut sides. On each sandwich, place and equal amount of Swiss cheese, ham and pork in exactly that order. Place a few pickles onto each one, and put the top of the roll onto the sandwich. Brush the tops with melted butter.",
                    "Press each sandwich in a sandwich press heated to medium-high heat. If a sandwich press is not available, use a large skillet over medium-high heat, and press the sandwiches down using a sturdy plate or skillet. Some indoor grills may be good for this also. Cook for 5 to 8 minutes, keeping sandwiches pressed. If using a skillet, you may want to flip them once for even browning. Slice diagonally and serve hot."
                ]
            })
        })
        .then(res => {
            return res.json()
        })
        .then(json => {
            console.log(json);
        })
    }

    renderRecipes = () => {
        const recipes = this.state.recipes
        return (
            <div className="cards-container">
                {recipes.length !== 0 && recipes.map(recipe => (
                    <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
                        <Card
                            _id={recipe._id}
                            getOneRecipe={this.getOneRecipe}
                            title={recipe.title}
                            imageUrl={recipe.imageUrl}
                        />
                    </Link>
                ))}
            </div>
        )
    }

    renderRecipePage = () => {
        return (
            <RecipePage recipe={this.state.active} />
        )
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <button onClick={this.saveNewRecipe}>Save New Recipe</button>
                    <Link to="/recipes">View All Recipes</Link>
                    <Route exact path="/recipes" component={this.renderRecipes} />
                    <Route exact path="/recipes/:id" component={this.renderRecipePage} />
                </div>
            </Router>
        );
    }
}

export default App;
