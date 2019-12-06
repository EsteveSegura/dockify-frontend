import React from 'react';
import axios from 'axios';

import FormEditProduct from '../../Components/formEditProduct/FormEditProduct';

class EditProduct extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               product: {}
          }

          this.getData = this.getData.bind(this);
     }

     async componentWillMount() {
          let data = await this.getData()
          this.setState({
               product: data
          });
     }

     async getData() {
          let response = await await axios.get(`http://localhost:3001/api/product/${this.props.match.params.productId}`, {
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
               <h1>{this.props.match.params.productId}</h1>
                    </div>
               </div>
          );
     }
}

export default EditProduct