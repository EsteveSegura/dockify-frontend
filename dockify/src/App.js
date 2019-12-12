import React from 'react';
import './App.css';
import jsCookie from 'js-cookie';

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
import Login from './Pages/Login/Login';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: 'none'
    }
  }
  

  componentWillMount() {
    if (jsCookie.get('token')) {
      this.setState({ token: jsCookie.get('token') })
    } else {
      this.setState({ token: null })
    }
  }

  render() {
    return (
      <Router>
        <Nav title="Dockify" />
        <Switch>
          <Route exact path="/" component={() => this.state.token != null ? <Clients /> : <Login />} />
          <Route exact path="/products" component={() => this.state.token != null ? <Products /> : <Login />} />
          <Route exact path="/sales" component={() => this.state.token != null ? <Sales /> : <Login />} />
          <Route exact path="/add/client" component={() => this.state.token != null ? <AddClient /> : <Login />} />
          <Route exact path="/add/product" component={() => this.state.token != null ? <AddProduct /> : <Login />} />
          <Route exact path="/add/sale" component={() => this.state.token != null ? <AddSale /> : <Login />} />
          <Route exact path="/edit/client/:clientId" component={(props) => this.state.token != null ? <EditClient {...props} /> : <Login />} />
          <Route exact path="/edit/product/:productId" component={(props) => this.state.token != null ? <EditProduct {...props} /> : <Login />} />
          <Route exact path="/edit/sale/:saleId" component={(props) => this.state.token != null ? <EditSale {...props} /> : <Login />} />
          <Route exact path="/login" component={<Login />} />
        </Switch>
      </Router>
    );
  }
}

export default App;