import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Clients from './Pages/Clients/Clients';
import AddClient from './Pages/AddClient/AddClient';
import EditClient from './Pages/EditClient/EditClient';
import Nav from './Components/nav/Nav';

function App() {
  return (
    <Router>
      <Nav title="Dockify" />
      <Switch>
        <Route exact path="/"> 
          <Clients />
        </Route>
        <Route exact path="/add/client"> 
          <AddClient />
        </Route>
        <Route exact path="/edit/client/:clientId"> 
          {(props) => <EditClient {...props} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;