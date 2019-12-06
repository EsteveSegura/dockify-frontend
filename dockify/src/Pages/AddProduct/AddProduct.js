import React from 'react';

import FormAddProduct from '../../Components/formAddProduct/FormAddProduct'

class AddProduct extends React.Component{
     constructor(props){
          super(props);
     }

     render(){
          return(
               <div className="container main-section">
                    <div className="row">
                         <FormAddProduct />
                    </div>
               </div>
          );
     }
}

export default AddProduct