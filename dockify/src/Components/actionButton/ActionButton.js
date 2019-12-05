import React from 'react';

class ActionButton extends React.Component{
     constructor(props){
          super(props);
     }



     render(){
          return(
               <button type="button" onClick={this.props.callback} className={"mt-3 btn btn-"+this.props.type}>{this.props.text}</button>
          );
     }
}

export default ActionButton