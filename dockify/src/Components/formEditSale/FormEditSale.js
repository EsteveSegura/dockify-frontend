import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class FormEditProduct extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               productId: '',
               internalName: '',
               publicName: '',
               description: '',
               quantity: '',
               price: '',
               productPicture: '',
               productPictureFile: '',
               dataIsEdited: false,
               secureDelete: 0
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleDelete = this.handleDelete.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
     }

     componentWillReceiveProps(nextProps) {
          console.log(nextProps)
          this.setState({
               productId: this.props.productId,
               internalName: nextProps.internalName,
               publicName: nextProps.publicName,
               description: nextProps.description,
               quantity: nextProps.quantity,
               price: nextProps.price,
          });
          console.log(this.props)
     }

     handleChange(event) {
          this.setState({ dataIsEdited: true })
          switch (event.target.id) {
               case 'internalName':
                    this.setState({ internalName: event.target.value })
                    break;
               case 'publicName':
                    this.setState({ publicName: event.target.value })
                    break;
               case 'description':
                    this.setState({ description: event.target.value })
                    break;
               case 'quantity':
                    this.setState({ quantity: event.target.value })
                    break;
               case 'price':
                    this.setState({ price: event.target.value })
                    break;
               case 'productPicture':
                    this.setState({ productPicture: event.target.value })
                    break;
          }
          console.log(this.state)
     }

     handleSubmit(event) {
          event.preventDefault();
          if(this.state.dataIsEdited) {
               axios.put(`http://localhost:3001/api/sale/${this.props.saleId}`, this.state, {
                    headers: {
                         "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
                    }
               })
          }
          this.props.history.push("/");
     }

     handleDelete() {
          console.log(this.state.secureDelete)
          this.setState({secureDelete : this.state.secureDelete+1})
          if(this.state.secureDelete >= 1){
               axios.delete(`http://localhost:3001/api/product/${this.state.saleId}`, {
                    headers: {
                         "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
                    }
               })
               this.props.history.push("/");
          }else{
               alert('To delete this element click one more time. Secure mesure')
          }
     }

     render() {
          return (
               <div className="from-field col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form onSubmit={this.handleSubmit}>
                         <div className="form-group">
                              <label for="internalName">Nombre interno</label>
                              <input type="text" value={this.state.internalName} className="form-control" id="internalName" placeholder="Nombre" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="publicName">Nombre Publico</label>
                              <input type="text" value={this.state.publicName} className="form-control" id="publicName" placeholder="Nombre" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="quantity">Cantidad</label>
                              <input type="text" value={this.state.quantity} className="form-control" id="quantity" placeholder="Nombre" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="price">Precio</label>
                              <input type="text" value={this.state.price} className="form-control" id="price" placeholder="Nombre" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="description">Descripción</label>
                              <textarea className="form-control" value={this.state.description} id="description" rows="3" placeholder="Descripción" onChange={this.handleChange}></textarea>
                         </div>
                         <button type="submit" className="btn space-btn btn-primary">Editar</button>
                         <button type="button" onClick={this.handleDelete} className="btn btn-danger">Eliminar</button>
                    </form>
               </div>
          );
     }
}

export default withRouter(FormEditProduct)