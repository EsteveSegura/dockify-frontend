import React from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { withRouter } from "react-router-dom";
import config from '../../config';


class Login extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               user: '',
               password: '',
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleChange(event) {
          switch (event.target.id) {
               case 'user':
                    this.setState({ user: event.target.value })
                    break;
               case 'password':
                    this.setState({ password: event.target.value })
                    break;
          }
     }

     async handleSubmit(event) {
          event.preventDefault();
          let response = await axios.post(config.HOST+'api/login/', {
               user: this.state.user,
               password: this.state.password
          })

          if (response.data.message == "BAD_AUTH") {
               alert('User & password wrong')
               this.setState({ user: '', password: '' })
          } else {
               jsCookie.set('token', response.data.token, { expires: 1 })
               window.location.reload(false);
               this.props.history.push("/");
          }
     }

     render() {
          return (
               <div className="from-field col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form onSubmit={this.handleSubmit}>
                         <div className="form-group">
                              <label for="user">User</label>
                              <input type="text" value={this.state.user} className="form-control" id="user" placeholder="User" onChange={this.handleChange} />
                         </div>
                         <div className="form-group">
                              <label for="password">Password</label>
                              <input type="password" value={this.state.password} className="form-control" id="password" placeholder="Password" onChange={this.handleChange} />
                         </div>
                         <button type="submit" className="btn space-btn btn-primary">LogIn</button>
                    </form>
               </div>
          )
     }
}

export default withRouter(Login)