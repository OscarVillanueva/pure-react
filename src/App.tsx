import React from 'react';

// Styles
import './styles/styles.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Home from './components/Home';
import RedditList from './components/RedditList'

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
      </Switch>
    </Router>
  );
}
 
export default App;