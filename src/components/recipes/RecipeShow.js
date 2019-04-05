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
      return <div>Loading...</div>;
    }

    const { name, ingredients, directions } = this.props.recipe;
    return (
      <div>
        <h3>{name}</h3>
        <h4>Ingredients Needed:</h4>
        {ingredients.map(({ ingredient }) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
        <h4>Directions:</h4>
        <p>{directions}</p>
        <Link to={`/recipes/edit/${this.props.recipe.id}`} className="edit">
          Edit Recipe
        </Link>
        <Link to={`/recipes/delete/${this.props.recipe.id}`} className="delete">
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
