import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import ActionButton from '../../Components/actionButton/ActionButton';
import CardSales from '../../Components/cardSales/CardSales'
class Sales extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               sales : []
          }

          this.goAddSale = this.goAddSale.bind(this);
     }

     goAddSale() {
          this.props.history.push('/add/sale');
     }

     componentDidMount() {
          axios.get('http://localhost:3001/api/sales/', {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then((response) => {
               this.setState({
                    sales: response.data
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
                              text="Add new sale"
                              type="primary"
                              callback={this.goAddSale}
                         />
                    </div>
               </div>
               <div className="row">
                    {this.state.sales.map(sale => (

                         <CardSales 
                              saleId = {sale._id}
                              idClient = {sale.idClient}
                              isPaid = {sale.isPaid}
                              isShipped = {sale.isShipped}
                              discount = {sale.discount}
                              shipCost = {sale.shipCost}
                              productsCost = {sale.productsCost}
                              shipDate = {sale.shipDate}
                              idProduct = {sale.idProduct}
                              address = {sale.address}
                         />
                    ))}
               </div>
          </div>


          )
     }

}

export default withRouter(Sales)