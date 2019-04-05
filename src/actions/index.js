import recipes from '../apis/recipes';
import history from '../history';

import {
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
} from './types';

export const createRecipe = formValues => async dispatch => {
  const response = await recipes.post('/recipes', { ...formValues });

  dispatch({ type: CREATE_RECIPE, payload: response.data });
  history.push('/');
};

export const fetchRecipes = () => async dispatch => {
  const response = await recipes.get('/recipes');

  dispatch({ type: FETCH_RECIPES, payload: response.data });
};

export const fetchRecipe = id => async dispatch => {
  const response = await recipes.get(`/recipes/${id}`);

  dispatch({ type: FETCH_RECIPE, payload: response.data });
};

export const editRecipe = (id, formValues) => async dispatch => {
  const response = await recipes.patch(`/recipes/${id}`, formValues);

  dispatch({ type: EDIT_RECIPE, payload: response.data });
  history.push('/');
};

export const deleteRecipe = id => async dispatch => {
  await recipes.delete(`/recipes/${id}`);

  dispatch({ type: DELETE_RECIPE, payload: id });
  history.push('/');
};
