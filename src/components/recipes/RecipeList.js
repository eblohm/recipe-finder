/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';

class RecipeList extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  showRecipes(recipes) {
    return recipes.map(recipe => (
      <li key={recipe.name}>
        <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
      </li>
    ));
  }

  render() {
    if (this.props.foundRecipes.length === 0) {
      return <div>{this.showRecipes(this.props.recipes)}</div>;
    }

    return <div>{this.showRecipes(this.props.foundRecipes)}</div>;
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
