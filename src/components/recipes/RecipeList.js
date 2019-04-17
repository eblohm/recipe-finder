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
      <div className="recipe" key={recipe.name}>
        <Link to={`/recipes/${recipe.id}`} className="recipe--link">
          <h3 className="recipe--link__name recipe--name">{recipe.name}</h3>
          <p className="recipe--link__description recipe--description">
            {recipe.description}
          </p>
        </Link>
        <hr className="recipe--divider" />
      </div>
    ));
  }

  render() {
    // If nothing has been searched
    if (this.props.foundRecipes === undefined) {
      return (
        <div className="recipe-list">
          <h3 className="recipe-list--response">
            No recipes currently available.
          </h3>
          <hr className="recipe-list--divider" />
        </div>
      );
    }

    // If nothing has been searched, show all recipes available
    if (this.props.foundRecipes.length === 0) {
      return (
        <div className="recipe-list">
          <h3 className="recipe-list--response">Showing all recipes:</h3>
          <hr className="recipe-list--divider" />
          {this.showRecipes(this.props.recipes)}
        </div>
      );
    }

    // If something has been searched, show recipes with the ingredients
    return (
      <div className="recipe-list">
        <h3 className="recipe-list--response">Found the following recipes:</h3>
        <hr className="recipe-list--divider" />
        {this.showRecipes(this.props.foundRecipes)}
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
