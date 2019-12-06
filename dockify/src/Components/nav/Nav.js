import React from 'react';

import { Link } from "react-router-dom";


function Nav(props) {
     return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <Link className="navbar-brand" to="/">{props.title}</Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                         <li className="nav-item active">
                              <Link className="nav-link" to="/">Clients</Link>
                         </li>
                         <li className="nav-item active">
                              <Link className="nav-link" to="/products">Products</Link>
                         </li>
                    </ul>
               </div>
          </nav>
     );
}

export default Nav