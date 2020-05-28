import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IndexPage from './pages/index';
import UserPage from './pages/user';
import ViewPage from './pages/view';
import NotFoundPage from './pages/404';
import MediaController from './components/media-controller';

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
        <Route exact path="/view">
          <ViewPage />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
      <MediaController />
    </Router>
  );
}

export default App;
