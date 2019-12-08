import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class FormAddProducts extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               idClient: '',
               idClientShow: '',
               isPaid: false,
               isShipped: false,
               discount: '0',
               shipCost: '0',
               productsCost: '0',
               shipDate: '',
               idProduct: [],
               idProductShow: '',
               address: '',
               clients: [],
               products: [],
               suggestClient: [],
               suggestProducts: [],
               productsSelected: [],
               clientSelected: 'Ningun cliente seleccionado'

          }

          this.handleChange = this.handleChange.bind(this)
          this.handleSubmit = this.handleSubmit.bind(this)
          this.getAllClients = this.getAllClients.bind(this)
          this.getAllProducts = this.getAllProducts.bind(this)
          this.filterAndFoundClient = this.filterAndFoundClient.bind(this)
          this.setClientId = this.setClientId.bind(this)
          this.setProducts = this.setProducts.bind(this)
     }

     handleChange(event) {
          switch (event.target.id) {
               case 'idClientShow':
                    this.setState({ idClientShow: event.target.value });
                    this.filterAndFoundClient();
                    break;
               case 'idProductShow':
                    this.setState({ idProductShow: event.target.value });
                    this.filterAndFoundProduct();
                    break;
               case 'shipCost':
                    this.setState({ shipCost: event.target.value });
                    break;
               case 'productsCost':
                    this.setState({ productsCost: event.target.value });
                    break;
               case 'shipDate':
                    this.setState({ shipDate: event.target.value });
                    break;
               case 'discount':
                    this.setState({ discount: event.target.value });
                    break;
               case 'address':
                    this.setState({ address: event.target.value });
                    break;

          }
          console.log(this.state)
     }

     handleSubmit(event) {
          axios.post('http://localhost:3001/api/sale/', this.state, {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then(function (response) {
               console.log(response);
          }).catch(function (error) {
               console.log(error);
          });

          event.preventDefault();
          this.props.history.push("/");
     }

     componentDidMount() {
          this.getAllClients()
          this.getAllProducts()
     }

     getAllClients() {
          axios.get('http://localhost:3001/api/clients/', {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then((response) => {
               this.setState({
                    clients: response.data
               });
          }, (error) => {
               console.log(error)
          });
     }

     getAllProducts() {
          axios.get('http://localhost:3001/api/products/', {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then((response) => {
               this.setState({
                    products: response.data
               });
          }, (error) => {
               console.log(error)
          });
     }

     filterAndFoundClient() {
          if (this.state.idClientShow != '') {
               let suggestions = this.state.clients.filter((found) => {
                    let nameToLowerCase = found.name.toLowerCase()
                    if (nameToLowerCase.startsWith(this.state.idClientShow)) {
                         return found
                    }
               })
               this.setState({ suggestClient: suggestions })
          }
     }

     filterAndFoundProduct() {
          if (this.state.idProductShow != '') {
               let suggestions = this.state.products.filter((found) => {
                    let nameToLowerCase = found.internalName.toLowerCase()
                    if (nameToLowerCase.startsWith(this.state.idProductShow)) {
                         return found
                    }
               })
               this.setState({ suggestProducts: suggestions })
          }
     }

     setClientId(event) {
          let selectedClient = this.state.suggestClient.filter((sugest) => {
               if (sugest._id == event.target.id) {
                    return sugest
               }
          })

          this.setState({ idClient: event.target.id, idClientShow: event.target.innerHTML, suggestClient: [], clientSelected: event.target.innerHTML, address: selectedClient[0].address })
     }

     setProducts(event) {
          let selectedProduct = this.state.suggestProducts.filter((sugest) => {
               if (sugest._id == event.target.id) {
                    return sugest
               }
          })
          let actualId = { id: event.target.id, name: event.target.innerHTML }
          this.setState(prevState => ({
               productsSelected: [...prevState.productsSelected, actualId],
               idProduct: [...prevState.idProduct, actualId.id],
               productsCost: parseInt(prevState.productsCost) + parseInt(selectedProduct[0].price),
               idProductShow: '',
               suggestProducts: []
          }))
     }

     render() {
          return (
               <div className="from-field col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form onSubmit={this.handleSubmit}>
                         <div className="form-group">
                              <label for="idClientShow">Buscar Cliente</label>
                              <input type="text" autocomplete="off" value={this.state.idClientShow} className="form-control" id="idClientShow" placeholder="Nombre interno" onChange={this.handleChange} />
                              {this.state.suggestClient.map(sugest => {
                                   return (<span id={sugest._id} onClick={this.setClientId}>
                                        {sugest.name}
                                   </span >)
                              })}
                         </div>
                         <div>
                              <span><strong>Cliente</strong></span><br />
                              <span class="badge badge-primary">{this.state.clientSelected}</span>
                         </div>
                         <div className="form-group">
                              <label for="idProductShow">Buscar Productos</label>
                              <input type="text" autocomplete="off" value={this.state.idProductShow} className="form-control" id="idProductShow" placeholder="Producto" onChange={this.handleChange} />
                              {this.state.suggestProducts.map(sugest => {
                                   return (<span id={sugest._id} onClick={this.setProducts}>
                                        {sugest.internalName}
                                   </span>)
                              })}
                         </div>
                         <div>
                              <span><strong>Productos seleccionados</strong></span><br />
                              {this.state.productsSelected.map((product) => {
                                   return <span class="badge badge-primary mr-4">{product.name}</span>
                              })}
                         </div>
                         <div className="form-group">
                              <label for="shipCost">Coste Envio</label>
                              <input type="number" value={this.state.shipCost} className="form-control" id="shipCost" placeholder="Cantidad" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="productsCost">Coste Pedido</label>
                              <input type="number" value={this.state.productsCost} className="form-control" id="productsCost" placeholder="Cantidad" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="discount">Descuento</label>
                              <input type="number" value={this.state.discount} className="form-control" id="discount" placeholder="Cantidad" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="shipDate">Fecha de envio</label>
                              <input type="date" value={this.state.shipDate} className="form-control" id="shipDate" placeholder="Cantidad" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="address">dirección</label>
                              <textarea className="form-control" value={this.state.address} id="address" rows="3" placeholder="Descripción" onChange={this.handleChange}></textarea>
                         </div>

                         <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
               </div>
          );
     }


}

export default withRouter(FormAddProducts)