import React from 'react';

// Styles
import 'styles/styles.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Home from 'pages/Home';
import RedditList from 'pages/RedditList'
import Counter from 'pages/Counter';
import TodoList from 'pages/TodoList';

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
          component = { TodoList }
        />
      </Switch>
    </Router>
  );
}
 
export default App;