import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchRecipe, deleteRecipe } from '../../actions';

class RecipeDelete extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => {
            this.props.deleteRecipe(id);
          }}
          className="recipe--button__delete"
        >
          Delete Recipe
        </button>
        <Link to="/" className="recipe--button__cancel">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.recipe) {
      return 'Are you sure you want to delete this recipe?';
    }

    return `Are you sure you want to delete ${this.props.recipe.name}?`;
  }

  render() {
    return (
      <Modal
        title="Delete Recipe"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { recipe: state.recipes[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchRecipe, deleteRecipe }
)(RecipeDelete);
