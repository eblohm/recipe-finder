/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../../actions';

class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = { activeRecipes: {} };
  }
  componentDidMount() {
    this.props.fetchRecipes();
  }

  getSearchedRecipes() {
    const searchedIngredients = 'VEGETABLE BROTH, noodles ';
    const searchedList = searchedIngredients.split(', ');

    this.props.recipes.map(recipe => {
      const foundRecipes = recipe.ingredients.filter(({ ingredient }) =>
        searchedList.includes(ingredient)
      );
      console.log(foundRecipes);
    });

    /*searchedList.forEach(searchedIngredient => {
      this.props.recipes.map(recipe => {
        if (
          recipe.ingredients.find(
            ({ ingredient }) =>
              ingredient.toLowerCase() ===
              searchedIngredient.toLowerCase().trim()
          ) !== undefined
        ) {
          foundRecipes.push(recipe);
          console.log(foundRecipes);
        }
      });
    });*/
  }

  renderList() {
    this.getSearchedRecipes();
    return this.props.recipes.map(recipe => {
      return (
        <div className="recipe" key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`} className="recipe--name">
            {recipe.name}
          </Link>
          <div className="recipe--directions">{recipe.directions}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Recipes</h2>
        <div className="ui recipe list">{this.renderList()}</div>
        <br />
        <br />
        <br />
        <h1>ACTIVE RECIPES</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: Object.values(state.recipes),
  };
};

export default connect(
  mapStateToProps,
  { fetchRecipes }
)(RecipeList);
