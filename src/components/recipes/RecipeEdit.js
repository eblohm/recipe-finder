import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe, editRecipe } from '../../actions';
import RecipeForm from './RecipeForm';

class RecipeEdit extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editRecipe(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.recipe) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit this recipe</h3>
        <RecipeForm
          initialValues={_.pick(
            this.props.recipe,
            'name',
            'ingredients',
            'directions'
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { recipe: state.recipes[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchRecipe, editRecipe }
)(RecipeEdit);
