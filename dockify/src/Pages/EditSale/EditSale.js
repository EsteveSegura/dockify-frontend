import React from 'react';
import axios from 'axios';

import FormEditSale from '../../Components/formEditSale/FormEditSale';

class EditProduct extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               sale: {}
          }

          this.getData = this.getData.bind(this);
     }

     async componentWillMount() {
          let data = await this.getData()
          this.setState({
               sale: data
          });
          setTimeout(() => {
               console.log(this.state)
          }, 1000);
     }
     async getData() {
          let response = await axios.get(`http://localhost:3001/api/sale/${this.props.match.params.saleId}`, {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          });
          return response.data[0]
     }

     render() {
          return (
               <div className="container">
                    <div className="row">
                         <p>sad</p>
                         <FormEditSale
                              idSale = {this.props.match.params.saleId}
                              idClient = {this.state.sale.idClient}
                              isPaid = {this.state.sale.isPaid}
                              isShipped = {this.state.sale.isShipped}
                              discount = {this.state.sale.discount}
                              shipCost = {this.state.sale.shipCost}
                              productsCost = {this.state.sale.productsCost}
                              shipDate = {this.state.sale.shipDate}
                              idProduct = {this.state.sale.idProduct}
                              address = {this.state.sale.address}
                         />
                    </div>
               </div>
          );
     }
}

export default EditProduct