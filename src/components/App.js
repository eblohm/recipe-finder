import React from 'react';
import { Router, Route } from 'react-router-dom';

import RecipeCreate from './recipes/RecipeCreate';
import RecipeEdit from './recipes/RecipeEdit';
import RecipeDelete from './recipes/RecipeDelete';
import RecipeList from './recipes/RecipeList';
import RecipeShow from './recipes/RecipeShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={RecipeList} />
          <Route path="/recipes/new" exact component={RecipeCreate} />
          <Route path="/recipes/edit/:id" exact component={RecipeEdit} />
          <Route path="/recipes/delete" exact component={RecipeDelete} />
          <Route path="/recipes/show" exact component={RecipeShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;
