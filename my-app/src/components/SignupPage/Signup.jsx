import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Signup.css';
import {Addimg} from "./Addimg";
import Navigationunlog from './NavigationUnlog';
import {SignupRepository} from './../../api/SignupRepository';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';

const fetch = require("node-fetch");

var url = "http://ec2-3-16-180-137.us-east-2.compute.amazonaws.com:8080";


//Add User
async function addUser(firstName, lastName, email, pass) {
	let ok = true;
	const data = {
		FirstName: firstName,
		LastName: lastName, 
		Email: email,
		UserPassword: pass
	};

	const init = {
		method: 'POST',
    		body: JSON.stringify(data),
		headers: {
      			'Content-Type': 'application/json'
    		}
	}

	const response = await fetch(url + '/User/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

class Signup extends React.Component {
  signupRepository = new SignupRepository;
  state = {
    nname: '',
    nlname:'',
    npassword: '',
    nemail:'',
    imag: 'https://placehold.it/150x150',
    id: ''
  };


  newAcc = event =>{
    this.setState({
      id: this.state.nemail
    })
    addUser(this.state.nname,this.state.nlname,this.state.nemail,this.state.npassword)
  }

  render() {
    return (
      <div className="Signup">
        <header className="Signup-header">
        <title>Make an Account</title>
        </header>
        <body>
          <Navigationunlog></Navigationunlog>
          <div className="card">
            <div className="panel-heading">
              <h1>Sign Up</h1>
            </div>
            <div className="panel-body">
              <div className="form-group">
                  <label htmlFor="name"></label>
                  <input type="text" className='form-control' name="name"
                  id="name" placeholder="First name"
                  value={this.state.nname} onChange={e => this.setState({nname: e.target.value})}></input>
              </div>
              <div className="form-group">
                  <label htmlFor="name"></label>
                  <input type="text" className='form-control' name="name"
                  id="name" placeholder="Last name"
                  value={this.state.nlname} onChange={e => this.setState({nlname: e.target.value})}></input>
              </div>
              <div class="form-group">
                <label htmlFor="username"></label>
                <input type="email" className='form-control' name="Email" id="email" placeholder="Username"
                value={this.state.nemail} onChange={e => this.setState({nemail: e.target.value})}></input>
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input type="text" className='form-control' name="Password"
                id="password" type="password" placeholder="Password"
                value={this.state.npassword} onChange={e => this.setState({npassword: e.target.value})}></input>
              </div>
              <Link style={{marginTop:'1em'}} className="btn btn-success" 
              onClick={e=> this.newAcc()} to={{
                  pathname: `/`,
                  //return to login is easiest
                }}>
                <h3>Create Account</h3>
              </Link>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default Signup;
