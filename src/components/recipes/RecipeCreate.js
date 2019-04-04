import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

class RecipeCreate extends React.Component {
  handleSubmit(values) {
    console.log('jsdifaj', values);
  }

  render() {
    return (
      <div>
        <h4>Create a new recipe!</h4>
        <Formik
          initialValues={{
            recipeTitle: '',
            recipeIngredients: [],
            recipeDirections: '',
          }}
          validate={values => {
            let errors = {};
            if (!values.recipeTitle) {
              errors.recipeTitle = 'A title is required!';
            }
            if (!values.recipeIngredients) {
              errors.recipeIngredients = 'Ingredients are required!';
            }
            if (!values.recipeDirections) {
              errors.recipeDirections =
                'How do you expect us to cook this without the directions!?';
            }
          }}
          onSubmit={values => this.handleSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <Field
                type="text"
                placeholder="Recipe Title"
                name="recipeTitle"
              />
              <FieldArray
                name="recipeIngredients"
                render={arrayHelpers => (
                  <div>
                    {values.recipeIngredients &&
                    values.recipeIngredients.length > 0 ? (
                      values.recipeIngredients.map((ingredient, index) => (
                        <div key={index}>
                          <Field
                            name={`recipeIngredients.${index}`}
                            placeholder="Ingredient"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')}
                          >
                            Add Another Ingredient
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove Ingredient
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add Ingredient
                      </button>
                    )}
                  </div>
                )}
              />
              <Field
                component="textarea"
                placeholder="Recipe Directions"
                name="recipeDirections"
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default RecipeCreate;
