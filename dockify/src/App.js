import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Nav from './Components/nav/Nav';
import Sales from './Pages/Sales/Sales';
import Clients from './Pages/Clients/Clients';
import Products from './Pages/Products/Products';
import AddClient from './Pages/AddClient/AddClient';
import AddSale from './Pages/AddSale/AddSale';
import AddProduct from './Pages/AddProduct/AddProduct';
import EditClient from './Pages/EditClient/EditClient';
import EditProduct from './Pages/EditProduct/EditProduct';
import EditSale from './Pages/EditSale/EditSale';

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
        <Route exact path="/sales">
          <Sales />
        </Route>
        <Route exact path="/add/sale">
          <AddSale />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/add/product">
          <AddProduct />
        </Route>
        <Route exact path="/edit/product/:productId">
          {(props) => <EditProduct {...props} />}
        </Route>
        <Route exact path="/edit/sale/:saleId">
          {(props) => <EditSale {...props} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;