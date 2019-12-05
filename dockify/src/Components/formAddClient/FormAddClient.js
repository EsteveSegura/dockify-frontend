import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class FormAddClient extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               name: '',
               socialNetwork: '',
               country: '',
               address: ''
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);

     }



     handleChange(event) {
          switch (event.target.id) {
               case 'name':
                    this.setState({ name: event.target.value })
                    break;
               case 'socialNetwork':
                    this.setState({ socialNetwork: event.target.value })
                    break;
               case 'country':
                    this.setState({ country: event.target.value })
                    break;
               case 'address':
                    this.setState({ address: event.target.value })
                    break;
          }
          console.log(this.state)
     }

     handleSubmit(event) {
          axios.post('http://localhost:3001/api/client/', this.state ,{ 
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then(function (response) {
                    console.log(response);
               })
               .catch(function (error) {
                    console.log(error);
               });

          event.preventDefault();
          this.props.history.push("/");
     }

     render() {
          return (
               <div className="from-field col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form onSubmit={this.handleSubmit}>
                         <div className="form-group">
                              <label for="name">Nombre</label>
                              <input type="text" value={this.state.name} className="form-control" id="name" placeholder="Nombre" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="socialNetwork">Red Social</label>
                              <input type="text" value={this.state.socialNetwork} className="form-control" id="socialNetwork" placeholder="Red Social" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="country">Pais</label>
                              <input type="text" value={this.state.country} className="form-control" id="country" placeholder="Pais" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="address">Example textarea</label>
                              <textarea className="form-control" value={this.state.address} id="address" rows="3" placeholder="Dirección" onChange={this.handleChange}></textarea>
                         </div>
                         <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
               </div>
          );
     }
}

export default withRouter(FormAddClient)