import React from 'react';
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {ContactList} from "./components";
import store from './store';
import './App.css';

function App() {
  return (
      <Provider store={store}>
          <Router>
              <div className="App">

                  <Switch>
                      <Route exact path="/" component={ContactList} />
                  </Switch>
              </div>
          </Router>
      </Provider>

  );
}

export default App;
