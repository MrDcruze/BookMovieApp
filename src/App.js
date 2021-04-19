import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/home/Home';
import BookShow from './screens/bookshow/BookShow';
import MovieDetails from './screens/details/Details';
import Confirmation from './screens/confirmation/Confirmation';

const App = () => {
  const baseUrl = 'http://localhost:3000/';
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/book-show"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/movie-details/:movieId"
          render={(props) => <MovieDetails {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/confirm/:movieId"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
