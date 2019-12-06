import React from 'react';

import FormAddClient from '../../Components/formAddClient/FormAddClient';

class AddClient extends React.Component {
     constructor(props) {
          super(props);
     }

     render() {
          return (
               <div className="container main-section">
                    <div className="row">
                         <FormAddClient />
                    </div>
               </div>
          );
     }
}

export default AddClient
