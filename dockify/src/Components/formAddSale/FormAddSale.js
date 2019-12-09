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
               shipCost: '9',
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
          this.removeProducts = this.removeProducts.bind(this)
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
               case 'isPaid':
                    if (event.target.value == "true") {
                         this.setState({ isPaid: true });
                    } else {
                         this.setState({ isPaid: false });
                    }
                    break;
               case 'isShipped':
                    if (event.target.value == "true") {
                         this.setState({ isShipped: true });
                    } else {
                         this.setState({ isShipped: false });
                    }
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
          console.log(this.state.isPaid)
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

          this.setState({ idClient: event.target.id, idClientShow: '', suggestClient: [], clientSelected: event.target.innerHTML, address: selectedClient[0].address })
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

     removeProducts(event) {
          event.preventDefault()
          this.setState({ productsSelected: [] })
     }

     render() {
          return (
               <React.Fragment>
                    <div className="from-field mr-4 col-xl-3 col-lg-12 col-md-12 col-sm-12">
                         <form>
                              <div className="form-group">
                                   <label for="idClientShow">Buscar Cliente</label>
                                   <input type="text" autoComplete="off" value={this.state.idClientShow} className="form-control" id="idClientShow" placeholder="Nombre interno" onChange={this.handleChange} />

                              </div>
                              <div className="mt-3 mb-3">
                                   {this.state.suggestClient.map(sugest => {
                                        return (<div className="badge-search" id={sugest._id} onClick={this.setClientId}>
                                             {sugest.name}
                                        </div>)
                                   })}
                              </div>
                              <div>
                              </div>
                              <div className="form-group">
                                   <label for="idProductShow">Buscar Productos</label>
                                   <input type="text" autoComplete="off" value={this.state.idProductShow} className="form-control" id="idProductShow" placeholder="Producto" onChange={this.handleChange} />
                              </div>
                              {this.state.suggestProducts.map(sugest => {
                                   return (<div id={sugest._id} className="badge-search mb-2" onClick={this.setProducts}>
                                        {sugest.internalName}
                                   </div>)
                              })}
                              <div className="mt-3">
                                   <button className="btn btn-primary " onClick={this.removeProducts}>Remove Products</button>
                              </div>

                         </form>
                    </div>
                    <div className="from-field col-xl-8 col-lg-12 col-md-12 col-sm-12">

                         <form onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                   <label for="shipCost">Cliente</label>
                                   <input type="text" value={this.state.clientSelected} className="form-control" id="shipCost" placeholder="Cantidad" onChange={this.handleChange} disabled />
                              </div>
                              <div className="form-group">
                                   <div className="txt-input">Productos seleccionados</div>
                                   {this.state.productsSelected.map((product) => {
                                        return <div className="badge-search">{product.name}</div>
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
                                   <label for="isPaid">¿Esta pagado?</label>
                                   <div className="isPaid">
                                        <div className="form-check form-check-inline">
                                             <input className="form-check-input" type="radio" name="isPaid" id="isPaid" value="true" checked={this.state.isPaid} onChange={this.handleChange} />
                                             <label className="form-check-label" for="inlineRadio1">Si</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                             <input className="form-check-input" type="radio" name="isPaid" id="isPaid" value="false" checked={!this.state.isPaid} onChange={this.handleChange} />
                                             <label className="form-check-label" for="inlineRadio2">No</label>
                                        </div>
                                   </div>
                              </div>
                              <div className="form-group">
                                   <label for="shipDate">Fecha de envio</label>
                                   <input type="date" value={this.state.shipDate} className="form-control" id="shipDate" placeholder="Cantidad" onChange={this.handleChange} />
                              </div>
                              <div className="form-group">
                                   <label for="isShipped">¿Esta enviado?</label>
                                   <div className="isShipped">
                                        <div className="form-check form-check-inline">
                                             <input className="form-check-input" type="radio" name="isShipped" id="isShipped" value="true" checked={this.state.isShipped} onChange={this.handleChange} />
                                             <label className="form-check-label" for="inlineRadio1">Si</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                             <input className="form-check-input" type="radio" name="isShipped" id="isShipped" value="false" checked={!this.state.isShipped} onChange={this.handleChange} />
                                             <label className="form-check-label" for="inlineRadio2">No</label>
                                        </div>
                                   </div>
                              </div>
                              <div className="form-group">
                                   <label for="address">dirección</label>
                                   <textarea className="form-control" value={this.state.address} id="address" rows="3" placeholder="Descripción" onChange={this.handleChange}></textarea>
                              </div>

                              <button type="submit" className="btn btn-primary">Enviar</button>
                         </form>
                    </div>
               </React.Fragment>
          );
     }


}

export default withRouter(FormAddProducts)