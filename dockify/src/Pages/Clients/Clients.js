import React from 'react';
import Bootstrap from '../CommonFiles/style.css';
import Style from '../CommonFiles/bootstrap.min.css';
import axios from 'axios';

import Card from '../../Components/cardClient/CardClient'

class Clients extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               clients: []
          };
     }

     componentDidMount() {
          axios.get('http://localhost:3001/api/clients/', {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then((response) => {
               let clients = response.data
               this.setState({
                    clients: response.data
               });
               console.log(response.data)
          }, (error) => {
               //Handle ERROR
          });
     }

     render() {
          return (
               <div>
                    <div className="container main-section">
                         <div className="row">
                              {this.state.clients.map(client => (
                                   <Card
                                        name = {client.name}
                                        socialNetwork = {client.socialNetwork}
                                        country = {client.country}
                                        address = {client.address}
                                   />
                              ))}
                         </div>
                    </div>

               </div>
          );
     }
}

export default Clients
