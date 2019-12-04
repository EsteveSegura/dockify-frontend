import React from 'react';

import { Link } from "react-router-dom";


function Nav(props) {
     return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <a className="navbar-brand" href="#">{props.title}</a>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                         <li className="nav-item active">
                              <Link className="nav-link" to="/">Home</Link>
                         </li>
                         <li className="nav-item">
                              <Link className="nav-link" to="/add/client">Añadir Cliente</Link>
                         </li>
                    </ul>
               </div>
          </nav>
     );
}

export default Nav