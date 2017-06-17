import React, {Component} from 'react'; // looks in node_modules
import logo from './logo.svg';
import './css/App.css';
import RecipePage from './components/RecipePage.js'
import RecipeEditor from './components/RecipeEditor.js'
import AllRecipes from './components/AllRecipes.js'
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom'

class App extends Component {

    state = {
        active: {}
    }

    getOneRecipe = (id) => {
        fetch('http://localhost:5000/api/getOneRecipe/' + id)
        .then(res => {
            return res.json()
        })
        .then(json => {
            this.setState({
                active: json
            })
        })
    }

    renderRecipes = (isDefaults) => {
        return (
            <AllRecipes isDefaults={isDefaults} getOneRecipe={this.getOneRecipe}/>
        )
    }

    renderRecipePage = () => {
        return (
            <RecipePage recipe={this.state.active} />
        )
    }

    renderRecipeEditor = (id) => {
        if(id === 'new') return (
            <RecipeEditor />
        )

        return (
            <RecipeEditor
                _id={this.state.active._id}
                title={this.state.active.title}
                description={this.state.active.description}
                imageUrl={this.state.active.imageUrl}
                ingredients={this.state.active.ingredients}
                instructions={this.state.active.instructions}
            />
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
                    <main>
                        <Link className="main-buttons" to="/recipes">All Recipes</Link>
                        <Link className="main-buttons" to="/recipe-editor/new">New Recipe</Link>
                        <Link className="main-buttons defaults" to="/defaults">Load Default Recipes</Link>
                        <Route exact path="/" component={this.renderRecipes} />
                        <Route exact path="/recipes" component={() => this.renderRecipes(false)} />
                        <Route exact path="/defaults" component={() => this.renderRecipes(true)} />
                        <Route exact path="/recipes/:id" component={this.renderRecipePage} />
                        <Route exact path="/recipe-editor/:id" component={({match}) => this.renderRecipeEditor(match.params.id)} />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
