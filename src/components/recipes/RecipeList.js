import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../../actions';

class RecipeList extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderList() {
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
