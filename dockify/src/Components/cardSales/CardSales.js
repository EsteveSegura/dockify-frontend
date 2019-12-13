import React from 'react';

import { Link } from 'react-router-dom';
import Slider from '../../Components/Slider/Slider';
import axios from 'axios';
import jsCookie from 'js-cookie';
import config from '../../config';

class CardSales extends React.Component {
     constructor(props) {
          super(props);
          console.log(this.props)
          this.state = {
               client: {},
               products: []
          }

          this.getInfoClient = this.getInfoClient.bind(this);
          this.displayProducts = this.displayProducts.bind(this);
          this.getInfoProducts = this.getInfoProducts.bind(this);
          this.formatDate = this.formatDate.bind(this);
     }

     async componentWillMount() {
          if (jsCookie.get('token')) {
               this.setState({ token: 'bearer ' + jsCookie.get('token') })
               console.log(jsCookie.get('token'))
          } else {
               this.setState({ token: null })
          }
     }

     async getInfoClient() {
          await axios.get(`${config.HOST}api/client/${this.props.idClient}`, {
               headers: {
                    "authorization": this.state.token
               }
          }).then((response) => {
               console.log(response)
               this.setState({
                    client: response.data[0]
               });
          }, (error) => {
               console.log(error)
          });
     }

     async getInfoProducts() {
          this.props.idProduct.map(async (product) => {
               await axios.get(`${config.HOST}api/product/${product}`, {
                    headers: {
                         "authorization": this.state.token
                    }
               }).then((response) => {
                    this.setState(prevState => ({
                         products: [...prevState.products, response.data[0]]
                    }))
               }, (error) => {
                    console.log(error)
               });
          })
     }

     formatDate(date) {
          let monthNames = [
               "Enero", "Febrero", "Maroz",
               "Abril", "Mayo", "Junio", "Julio",
               "Agosto", "Septiembre", "Octubre",
               "Noviembre", "Diciembre"
          ];

          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();

          return day + ' ' + monthNames[monthIndex] + ' ' + year;
     }

     displayProducts() {
          let data = {
               namesInline: '',
               names: [],
               pictures: []
          }
          this.state.products.map((product) => {
               data.names.push(product.internalName)
               data.pictures.push(product.picturePath)
               data.namesInline = data.namesInline + product.internalName + ', '
          })
          return data
     }

     async componentDidMount() {
          await this.getInfoProducts()
          await this.getInfoClient()
          this.displayProducts()
          setTimeout(() => {
               console.log(this.state)
          }, 2000);
     }

     render() {
          return (
               <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card card-client" >

                         <div className="card-body">
                              <Slider
                                   images={this.displayProducts().pictures}
                              />

                              <h5 className="card-title"><strong>{this.props.publicName}</strong></h5>
                              <ul className="text-left card-list">
                                   <li><strong>Comprador:</strong> {this.state.client.name}</li>
                                   <li><strong>¿Pagado?:</strong> {this.props.isPaid == true ? 'Si' : 'No'}</li>
                                   <li><strong>¿Enviado?:</strong> {this.props.isShipped == true ? 'Si' : 'No'}</li>
                                   <li><strong>Descuento:</strong> {this.props.discount}%</li>
                                   <li><strong>Coste Pedido:</strong> {this.props.shipCost}€</li>
                                   <li><strong>Coste Envio:</strong> {this.props.productsCost}€</li>
                                   <li><strong>Fecha Envio:</strong> {this.formatDate(new Date(this.props.shipDate))}</li>
                                   <li><strong>Productos:</strong> {this.displayProducts().namesInline}</li>
                                   <li><strong>Dirección:</strong> {this.props.address}</li>
                                   <li><strong>Total:</strong> {this.props.productsCost + this.props.shipCost}€</li>

                              </ul>
                              <Link to={'/edit/sale/' + this.props.saleId} className="btn btn-primary">Edit</Link>
                         </div>
                    </div>
               </div>
          );
     }
}

export default CardSales;
