import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Clients from './Pages/Clients/Clients';
import AddClient from './Pages/AddClient/AddClient';
import Nav from './Components/nav/Nav';

function App() {
  return (
    <Router>
      <Nav title="Merce Miniaturas" />
      <Switch>
        <Route exact path="/"> 
          <Clients />
        </Route>
        <Route exact path="/add/client"> 
          <AddClient />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
