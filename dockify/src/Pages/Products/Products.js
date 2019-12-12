import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ActionButton from '../../Components/actionButton/ActionButton';

import CardProduct from '../../Components/cardProduct/CardProduct';
import jsCookie from 'js-cookie';

class Products extends React.Component{
     constructor(props){
          super(props)
          this.state = {
               products: []
          };
          this.goAddProduct = this.goAddProduct.bind(this)
     }

     goAddProduct(){
          this.props.history.push("/add/product");
     }

     async componentWillMount() {
          if (jsCookie.get('token')) {
               this.setState({ token: 'bearer ' + jsCookie.get('token') })
          } else {
               this.setState({ token: null })
          }
     }

     componentDidMount(){
          axios.get('http://localhost:3001/api/products/', {
               headers: {
                    "authorization": this.state.token
               }
          }).then((response) => {
               this.setState({
                    products: response.data
               });
               console.log(this.state)
          }, (error) => {
               console.log(error)
          });
     }

     render(){
          return(
               <div className="container main-section">
                    <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <ActionButton 
                                   text="Add new product"
                                   type="primary"
                                   callback={this.goAddProduct}
                              />
                         </div>
                    </div>
                    <div className="row">
                         {this.state.products.map((product) => (
                              <CardProduct 
                              picturePath = {product.picturePath}
                              publicName = {product.publicName}
                              internalName = {product.internalName}
                              quantity = {product.quantity}
                              price = {product.price}
                              description = {product.description}
                              productId = {product._id}
                              />
                         ))}
                    </div>
               </div>
          );
     }


}

export default withRouter(Products)