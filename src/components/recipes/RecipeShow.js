import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipe } from '../../actions';

class RecipeShow extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
  }

  render() {
    if (!this.props.recipe) {
      return <div className="loading">Loading...</div>;
    }

    const { name, description, ingredients, directions } = this.props.recipe;

    return (
      <div className="recipe single-recipe">
        <h3 className="recipe--name">{name}</h3>
        <p className="recipe--description">{description}</p>
        <h4 className="recipe--ingredients">Ingredients Needed:</h4>
        {ingredients.map(({ ingredient, amount }) => (
          <div className="recipe--ingredients__item" key={ingredient}>
            {amount} {ingredient}
          </div>
        ))}
        <h4 className="recipe--directions">Directions:</h4>
        <p className="recipe--directions__content">{directions}</p>
        <Link
          to={`/recipes/edit/${this.props.recipe.id}`}
          className="recipe--link__edit"
        >
          Edit Recipe
        </Link>
        <Link
          to={`/recipes/delete/${this.props.recipe.id}`}
          className="recipe--link__delete"
        >
          Delete Recipe
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { recipe: state.recipes[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchRecipe }
)(RecipeShow);
