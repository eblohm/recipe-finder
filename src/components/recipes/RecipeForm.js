import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

class RecipeForm extends Component {
  renderError({ error, touched, submitFailed }) {
    if (touched && error) {
      return (
        <div className="recipe-form--error">
          <div className="recipe-form--error__content">{error}</div>
        </div>
      );
    }

    if (
      submitFailed &&
      error &&
      error === 'At least one ingredient must be added!'
    ) {
      return (
        <div className="recipe-form--error">
          <div className="recipe-form--error__content">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `recipe-form--${input.name} ${
      meta.error && meta.touched ? 'error' : ''
    }`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderDirections = ({ input, label, meta }) => {
    const className = `recipe-form--${input.name} ${
      meta.error && meta.touched ? 'error' : ''
    }`;

    return (
      <div className={className}>
        <label>{label}</label>
        <textarea {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderIngredient = ({ input, label, meta }) => {
    const className = `recipe-form--ingredient recipe-form--ingredient${
      label === 'Amount of Ingredient' ? '__amount' : ''
    } ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderIngredients = ({ fields, meta }) => {
    return (
      <div className="recipe-form--ingredients">
        {fields.map((ingredient, index) => (
          <div className="recipe-form--ingredients__single" key={index}>
            <h4 className="recipe-form--ingredients__label">
              Ingredient #{index + 1}
            </h4>
            <div className="recipe-form--single-ingredient">
              <Field
                name={`${ingredient}.ingredient`}
                type="text"
                component={this.renderIngredient}
                label="Ingredient Name"
              />
              <Field
                name={`${ingredient}.amount`}
                type="text"
                component={this.renderIngredient}
                label="Amount of Ingredient"
              />
              <button
                type="button"
                title="Remove Ingredient"
                onClick={() => fields.remove(index)}
                className="recipe-form--ingredient__remove recipe--button__remove"
              >
                Remove Ingredient
              </button>
            </div>
          </div>
        ))}
        <div className="recipe-form--ingredients__add">
          <button
            type="button"
            className="recipe-form--ingredients__add recipe--button__add"
            onClick={() => fields.push({})}
          >
            Add Ingredient
          </button>
          {this.renderError(meta)}
          {console.log(meta)}
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="recipe-form"
      >
        <Field
          name="name"
          component={this.renderInput}
          label="Enter Recipe Name"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description of the Recipe"
        />
        <FieldArray name="ingredients" component={this.renderIngredients} />
        <Field
          name="directions"
          component={this.renderDirections}
          label="Enter Directions"
        />
        <button className="recipe-form--submit recipe--button__submit">
          Submit
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }

  if (!formValues.ingredients || !formValues.ingredients.length) {
    errors.ingredients = { _error: 'At least one ingredient must be added!' };
  } else {
    const ingredientsArrayErrors = [];

    formValues.ingredients.forEach((ingredient, ingredientIndex) => {
      const ingredientErrors = {};
      if (!ingredient || !ingredient.ingredient) {
        ingredientErrors.ingredient =
          'You must enter a name for this ingredient.';

        ingredientsArrayErrors[ingredientIndex] = ingredientErrors;
      }

      if (!ingredient || !ingredient.amount) {
        ingredientErrors.amount =
          'You must specify how much of this ingredient.';

        ingredientsArrayErrors[ingredientIndex] = ingredientErrors;
      }
    });

    if (ingredientsArrayErrors.length) {
      errors.ingredients = ingredientsArrayErrors;
    }
  }

  if (!formValues.directions) {
    errors.directions = 'How do you expect to cook this without directions?';
  }

  return errors;
};

export default reduxForm({ form: 'recipeForm', validate })(RecipeForm);
