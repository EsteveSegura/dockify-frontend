import React from 'react';
import axios from 'axios';
import ActionButton from '../../Components/actionButton/ActionButton';
import Card from '../../Components/cardClient/CardClient'
import { withRouter } from 'react-router-dom';

import bootstrap from '../CommonFiles/bootstrap.min.css'
import style from '../CommonFiles/style.css'

import jsCookie from 'js-cookie';

class Clients extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               clients: [],
          };

          this.goAddClient = this.goAddClient.bind(this)
     }

     goAddClient() {
          this.props.history.push("/add/client");
     }

     async componentWillMount() {
          if (jsCookie.get('token')) {
               this.setState({ token: 'bearer ' + jsCookie.get('token') })
               console.log(jsCookie.get('token'))
          } else {
               console.log('sad')
               this.setState({ token: null })
          }
     }
     
     async componentDidMount(){
          console.log(this.state.token)
          await axios.get('http://localhost:3001/api/clients/', {
               headers: {
                    "authorization": this.state.token
               }
          }).then((response) => {
               this.setState({
                    clients: response.data
               });
          }, (error) => {
               console.log(error)
          });
     }

     render() {
          return (
               <div className="container main-section">
                    <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <ActionButton
                                   text="Add new client"
                                   type="primary"
                                   callback={this.goAddClient}
                              />
                         </div>
                    </div>
                    <div className="row">
                         {this.state.clients.map(client => (
                              <Card
                                   clientId={client._id}
                                   name={client.name}
                                   socialNetwork={client.socialNetwork}
                                   country={client.country}
                                   address={client.address}
                              />
                         ))}
                    </div>
               </div>

          );
     }
}

export default withRouter(Clients)
