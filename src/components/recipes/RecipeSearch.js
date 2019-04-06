import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../../actions';
import RecipeList from './RecipeList';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', foundRecipes: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const searchedList = this.state.value.split(', ');

    this.setState({
      foundRecipes: this.props.recipes.filter(recipe =>
        searchedList.every(searchItem =>
          recipe.ingredients.some(
            i =>
              i.ingredient.toLowerCase().trim() ===
              searchItem.toLowerCase().trim()
          )
        )
      ),
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            What ingredients do you have?
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <RecipeList foundRecipes={this.state.foundRecipes} />
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
)(RecipeSearch);
