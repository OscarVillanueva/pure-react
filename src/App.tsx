import React from 'react';

// Styles
import 'styles/styles.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Home from 'pages/Home';
import RedditList from 'pages/RedditList'
import Counter from 'pages/Counter';
import Todo from 'pages/Todo';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path = "/"
          component = { Home }
        />
        <Route
          exact
          path = "/reddit"
          component = { RedditList }
        />
        <Route
          exact
          path = "/counter"
          component = { Counter }
        />
        <Route
          exact
          path = "/todolist"
          component = { Todo }
        />
      </Switch>
    </Router>
  );
}
 
export default App;