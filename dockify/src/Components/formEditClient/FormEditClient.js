import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class FormEditClient extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               clientId: '',
               name: '',
               socialNetwork: '',
               country: '',
               address: '',
               dataIsEdited: false,
               secureDelete: 0
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleDelete = this.handleDelete.bind(this);
     }

     componentWillReceiveProps(nextProps) {
          this.setState({
               clientId: this.props.idClient,
               name: nextProps.name,
               socialNetwork: nextProps.socialNetwork,
               country: nextProps.country,
               address: nextProps.address
          });
     }

     handleChange(event) {
          this.setState({ dataIsEdited: true })
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
     }

     handleSubmit(event) {
          event.preventDefault();
          if (this.state.dataIsEdited) {
               axios.put(`http://localhost:3001/api/client/${this.props.clientId}`, this.state, {
                    headers: {
                         "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
                    }
               })
          }
          this.props.history.push("/");
     }

     handleDelete() {
          console.log(this.state.secureDelete)
          this.setState({ secureDelete: this.state.secureDelete + 1 })
          if (this.state.secureDelete >= 1) {
               axios.delete(`http://localhost:3001/api/client/${this.props.clientId}`, {
                    headers: {
                         "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
                    }
               })
               this.props.history.push("/");
          } else {
               alert('To delete this element click one more time. Secure mesure')
          }
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
                              <textarea className="form-control" id="address" rows="3" placeholder="Dirección" value={this.state.address} onChange={this.handleChange}></textarea>
                         </div>
                         <button type="submit" className="btn space-btn btn-primary">Editar</button>
                         <button type="button" onClick={this.handleDelete} className="btn btn-danger">Eliminar</button>
                    </form>
               </div>
          );
     }
}

export default withRouter(FormEditClient)