import React from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';

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
          if (jsCookie.get('token')) {
               this.setState({ token: 'bearer ' + jsCookie.get('token') })
          } else {
               this.setState({ token: null })
          }


     }
     
     async componentDidMount(){
          let data = await this.getData()
          this.setState({
               client: data
          });
     }

     async getData() {
          let response = await axios.get(`http://localhost:3001/api/client/${this.props.match.params.clientId}`, {
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