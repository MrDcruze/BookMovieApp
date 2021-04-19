import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './screens/home/Home';
import BookShow from './screens/bookshow/BookShow';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/book-show" component={BookShow} />
      </Switch>
    </Router>
  );
};

export default App;
