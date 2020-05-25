import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IndexPage from './pages/index';
import UserPage from './pages/user';
import NotFoundPage from './pages/404';

import './scss/global.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route exact path="/user">
          <UserPage />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
