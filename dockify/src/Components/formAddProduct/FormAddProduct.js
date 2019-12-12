import React from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { withRouter } from "react-router-dom";

class FormAddProducts extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               internalName: '',
               publicName: '',
               description: '',
               quantity: '',
               price: '',
               productPicture: '',
               productPictureFile: ''
          }

          this.handleChange = this.handleChange.bind(this)
          this.handleSubmit = this.handleSubmit.bind(this)
     }

     async componentWillMount() {
          if (jsCookie.get('token')) {
               this.setState({ token: 'bearer ' + jsCookie.get('token') })
          } else {
               this.setState({ token: null })
          }
     }

     handleChange(event) {
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
                    this.setState({ productPictureFile: event.target.files[0] })
                    break;
          }
          console.log(this.state)
     }

     handleSubmit(event) {
          const fd = new FormData();
          fd.append('productPicture', this.state.productPictureFile)
          fd.append('internalName', this.state.internalName)
          fd.append('publicName', this.state.publicName)
          fd.append('description', this.state.description)
          fd.append('quantity', this.state.quantity)
          fd.append('price', this.state.price)
          axios.post('http://localhost:3001/api/product/', fd, {
               headers: {
                    "authorization": this.state.token
               }
          }).then(function (response) {
               console.log(response);
          }).catch(function (error) {
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
                              <label for="internalName">Nombre interno</label>
                              <input type="text" value={this.state.internalName} className="form-control" id="internalName" placeholder="Nombre interno" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="publicName">Nombre publico</label>
                              <input type="text" value={this.state.publicName} className="form-control" id="publicName" placeholder="Nombre publico" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="quantity">Cantidad</label>
                              <input type="number" value={this.state.quantity} className="form-control" id="quantity" placeholder="Cantidad" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="price">Precio</label>
                              <input type="number" value={this.state.price} className="form-control" id="price" placeholder="Cantidad" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="productPicture">Archivo</label>
                              <input type="file" value={this.state.productPicture} className="form-control" id="productPicture" placeholder="Archivo" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="description">Example textarea</label>
                              <textarea className="form-control" value={this.state.description} id="description" rows="3" placeholder="Descripción" onChange={this.handleChange}></textarea>
                         </div>
                         <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
               </div>
          );
     }


}

export default withRouter(FormAddProducts)