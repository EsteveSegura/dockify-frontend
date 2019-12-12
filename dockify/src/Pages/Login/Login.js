import React from 'react';

import FromLogin from '../../Components/formLogin/FormLogin';

class Login extends React.Component {
     constructor(props) {
          super(props);

     }

     render() {
          return (
               <div className="container main-section">
                    <div className="row">
                         <FromLogin />
                    </div>
               </div>
          )
     }
}

export default Login