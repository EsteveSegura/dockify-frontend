import React from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';

import FormEditProduct from '../../Components/formEditProduct/FormEditProduct';
import config from '../../config';

class EditProduct extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               product: {}
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
               product: data
          });
     }

     async getData() {
          console.log(this.state.token)
          let response =  await axios.get(`${config.HOST}api/product/${this.props.match.params.productId}`, {
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
                         <FormEditProduct
                              productId={this.props.match.params.productId}
                              internalName={this.state.product.internalName}
                              publicName={this.state.product.publicName}
                              description={this.state.product.description}
                              quantity={this.state.product.quantity}
                              price={this.state.product.price}
                              productPicture={this.state.product.productPicture}
                         />
                    </div>
               </div>
          );
     }
}

export default EditProduct