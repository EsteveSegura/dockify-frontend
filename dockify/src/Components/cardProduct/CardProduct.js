import React from 'react';

import { Link } from "react-router-dom";

class CardProduct extends React.Component {
     render() {
          return (
               <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card card-client" >
                         <img src={'http://localhost:3001/'+this.props.picturePath} class="card-img-top" alt="..." />
                         <div className="card-body">
                              <h5 className="card-title"><strong>{this.props.publicName}</strong></h5>
                              <ul className="text-left card-list">
                                   <li><strong>nombre Interno:</strong> {this.props.internalName}</li>
                                   <li><strong>Cantidad:</strong> {this.props.quantity}</li>
                                   <li><strong>Precio:</strong> {this.props.price}</li>
                                   <li><strong>Descripción:</strong> {this.props.description}</li>
                              </ul>
                              <Link to={'/edit/product/' + this.props.productId} className="btn btn-primary">Edit</Link>
                         </div>
                    </div>
               </div>
          );
     }
}

export default CardProduct;