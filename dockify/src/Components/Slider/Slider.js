import React from 'react';

class Slider extends React.Component{
     constructor(props){
          super(props)
          this.state={
               baseUrl : 'http://localhost:3001',
               images:[]
          }

          this.nextSlide = this.nextSlide.bind(this)
     }

     componentWillReceiveProps(nextProps){
          console.log(nextProps)
          this.setState({images: nextProps.images})
     }

     componentDidMount(){
          setInterval(() => {
               this.nextSlide()
          }, 8000);
     }

     nextSlide(){
          let imagesArr = this.state.images;
          imagesArr.push(imagesArr.shift());
          this.setState({images : imagesArr})
     }

     render(){
          return(
                    <img src={this.state.baseUrl + this.state.images[0]} className="card-img-top" onClick={this.nextSlide}/>
          )
     }

}

export default Slider
