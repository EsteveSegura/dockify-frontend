import React from 'react';
import axios from 'axios';

import FormEditClient from '../../Components/formEditClient/FormEditClient';

class EditClient extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               client: {}
          }

          this.getData = this.getData.bind(this);
     }

     async componentWillMount() {
          let data = await this.getData()
          this.setState({
               client: data
          });
     }

     async getData() {
          let response = await await axios.get(`http://localhost:3001/api/client/${this.props.match.params.clientId}`, {
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
                         <FormEditClient
                              clientId={this.props.match.params.clientId}
                              name={this.state.client.name}
                              socialNetwork={this.state.client.socialNetwork}
                              country={this.state.client.country}
                              address={this.state.client.address}
                         />
                    </div>
               </div>
          );
     }
}

export default EditClient