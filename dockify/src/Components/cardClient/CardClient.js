import React from 'react';

import { Link } from "react-router-dom";

class Card extends React.Component {
     render() {
          return (
               <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card card-product" >
                         <div className="card-body">
                              <h5 className="card-title"><strong>{this.props.name}</strong></h5>
                              <ul className="text-left card-list">
                                   <li><strong>redSocial:</strong> {this.props.socialNetwork}</li>
                                   <li><strong>Pais:</strong> {this.props.country}</li>
                                   <li><strong>Dirección:</strong> {this.props.address}</li>
                              </ul>
                              <Link to={'/edit/client/' + this.props.clientId} className="btn btn-primary">Edit</Link>
                         </div>
                    </div>
               </div>
          );
     }
}

export default Card;