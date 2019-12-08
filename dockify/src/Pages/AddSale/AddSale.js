import React from 'react';

import FormAddSale from '../../Components/formAddSale/FormAddSale'

class AddSale extends React.Component{
     constructor(props){
          super(props);
     }

     render(){
          return(
               <div className="container main-section">
                    <div className="row">
                         <FormAddSale />
                    </div>
               </div>
          );
     }
}

export default AddSale