import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import RecipeCreate from './recipes/RecipeCreate';
import RecipeEdit from './recipes/RecipeEdit';
import RecipeDelete from './recipes/RecipeDelete';
import RecipeShow from './recipes/RecipeShow';
import RecipeSearch from './recipes/RecipeSearch';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={RecipeSearch} />
            <Route path="/recipes/new" exact component={RecipeCreate} />
            <Route path="/recipes/edit/:id" exact component={RecipeEdit} />
            <Route path="/recipes/delete/:id" exact component={RecipeDelete} />
            <Route path="/recipes/:id" exact component={RecipeShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
