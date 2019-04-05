import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

class RecipeForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderIngredients = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>
            Add Ingredient
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((ingredient, index) => (
          <li key={index}>
            <button
              type="button"
              title="Remove Ingredient"
              onClick={() => fields.remove(index)}
            >
              Remove Ingredient
            </button>
            <h4>Ingredient #{index + 1}</h4>
            <Field
              name={`${ingredient}.ingredient`}
              type="text"
              component={this.renderInput}
              placeholder=" asdf"
              label="Ingredient Name"
            />
          </li>
        ))}
      </ul>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="name"
          component={this.renderInput}
          label="Enter Recipe Name"
        />
        <FieldArray name="ingredients" component={this.renderIngredients} />
        <Field
          name="directions"
          component={this.renderInput}
          label="Enter Directions"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }

  return errors;
};

export default reduxForm({ form: 'recipeForm', validate })(RecipeForm);
