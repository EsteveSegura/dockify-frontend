import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

class CardSales extends React.Component {
     constructor(props) {
          super(props);

          this.state = {
               client: {},
               products: []
          }

          this.getInfoClient = this.getInfoClient.bind(this);
          this.displayProducts = this.displayProducts.bind(this);
          this.getInfoProducts = this.getInfoProducts.bind(this);
     }

     async getInfoClient() {
          await axios.get(`http://localhost:3001/api/client/${this.props.idClient}`, {
               headers: {
                    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
               }
          }).then((response) => {
               this.setState({
                    client: response.data[0]
               });
          }, (error) => {
               console.log(error)
          });
     }

     async getInfoProducts() {
          this.props.idProduct.map(async (product) => {
               await axios.get(`http://localhost:3001/api/product/${product}`, {
                    headers: {
                         "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzUzMzQ0NTB9.sy10tqPv2n4VKGvUSw88iN3kglVY3wzm1vunXtEAC2Q"
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

     displayProducts(){
          let data = {
               namesInline:'',
               names:[],
               pictures:[]
          }
          this.state.products.map((product) => {
               data.names.push(product.internalName)
               data.pictures.push(product.picturePath)
               data.namesInline = data.namesInline + product.internalName +', '
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
                              <h5 className="card-title"><strong>{this.props.publicName}</strong></h5>
                              <ul className="text-left card-list">
                                   <li><strong>Comprador:</strong> {this.state.client.name}</li>
                                   <li><strong>¿Pagado?:</strong> {this.props.isPaid == true ? 'Si' : 'No'}</li>
                                   <li><strong>¿Enviado?:</strong> {this.props.isShipped == true ? 'Si' : 'No'}</li>
                                   <li><strong>Descuento:</strong> {this.props.discount}%</li>
                                   <li><strong>Coste Pedido:</strong> {this.props.shipCost}€</li>
                                   <li><strong>Coste Envio:</strong> {this.props.productsCost}€</li>
                                   <li><strong>Fecha Envio:</strong> {this.props.shipDate}</li>
                                   <li><strong>Productos:</strong> {this.displayProducts().namesInline}</li>
                                   <li><strong>Dirección:</strong> {this.props.address}</li>
                                   <li><strong>Total:</strong> {this.props.productsCost + this.props.shipCost}€</li>
                                   {this.displayProducts().pictures.map((picturePath) =>{
                                       return <img src={'http://localhost:3001/'+picturePath} width={50}  alt="..." />                                        
                                   })}
                              </ul>
                              <Link to={'/edit/sale/' + this.props.saleId} className="btn btn-primary">Edit</Link>
                         </div>
                    </div>
               </div>
          );
     }
}

export default CardSales;

/*



<img src={'http://localhost:3001/'+this.props.picturePath} class="card-img-top" alt="..." />

address : String,
idClient : String,*
shipCost : Number,*
productsCost : Number,*
isShipped : {type: Boolean, default: false},*
discount : {type : Number, default: 0},*
isPaid : {type: Boolean, default: false},*
idProduct : [String],*
shipDate : {type: Date, default: Date.now()},
*/