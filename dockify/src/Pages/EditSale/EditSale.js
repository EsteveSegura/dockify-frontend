import React from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';

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
          if (jsCookie.get('token')) {
               this.setState({ token: 'bearer ' + jsCookie.get('token') })
          } else {
               this.setState({ token: null })
          }

     }

     async componentDidMount(){
          let data = await this.getData()
          this.setState({
               sale: data
          });
     }

     async getData() {
          let response = await axios.get(`http://localhost:3001/api/sale/${this.props.match.params.saleId}`, {
               headers: {
                    "authorization": this.state.token
               }
          });

    

          return response.data[0]
     }

     render() {
          return (
               <div className="container">
                    <div className="row">
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