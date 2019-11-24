import React, { Component } from 'react';
import Navigation from '../Navigation';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './AccountHome.css';
import Account from '../../models/Account';
import { HomeRepository } from '../../api/HomeRepository';
import Timeline from './Timeline';
import { Link } from 'react-router-dom';
import { Form, Modal} from 'react-bootstrap';

const fetch = require("node-fetch");

var url = "http://ec2-18-218-75-228.us-east-2.compute.amazonaws.com";

function FormOptions(props){
  return <>
  {props.opts.map((opt) => <option value={opt}>{opt}</option>)  }
    </>
}
//Add User ingredient
async function addUserIngredient(email, ingr) {
	let head = new Headers();
	head.append('Email', email);
	head.append('IngredientName', ingr);

	const init = {
		method: 'POST',
		headers: head
	}

	const response = await fetch(url + '/UserIngredient/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}

function refreshPage() {
  window.location.reload(false);
}

function RecipeButtons(props){

  return <>
  {props.recipe.map((wrkt) =>

    <Link className="btn btn-info btn-m btn-dark m-1" to={{
        pathname: `/workoutpage/${wrkt[0]}`,
        state: {
          "accountId": props.accountId
        }
      }}>

      <h5>{wrkt[1]}</h5>
    </Link>
)  }
    </>

}

class AccountHome extends Component {

  repo = new HomeRepository();
  currentAccount = new Account();

  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      bio: '',
      recipes: [],
      favorites: [],
      addOption: "Add",
      ningred: ''
    }
  }

  componentDidMount() {

    console.log("here is the passed in accountId: "+this.props.location.state.accountId)

    this.repo.getWorkouts(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.workout_id])
        }
        this.setState({workouts: temp })
      }
    );
    this.repo.getFavorites(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.workout_id, workout.workout_name])
        }
        this.setState({favorites: temp })
      }
    );
  }

  render() {
    return (
        <>
            <Navigation/>

            <Container id="enclosed" style={{maxWidth: '100%', marginTop: '1em', marginLeft: '1em'}}>               {/* Outer Container */}

              <Row>


                <Col xs={12} sm={6} md={5} lg={5} xl={4}>                                 {/* Center Timeline */}
                  <Row>
                    {<Link
                    style={{maxWidth: '100%'}} 
                    className="btn btn-success btn-lg" 
                    to={{
                      pathname: '/recipegen',
                      state: {
                        "accountId": this.props.location.state.accountId
                      }
                    }}>
                    Recipe Search</Link>  }
                  </Row>
                </Col>
                <Col xs ={12} sm={6} md={5} lg={5} xl={4}>
                  <Row><h2 className="details" id="customs">Favorites</h2></Row>
                  <Row>
                    <RecipeButtons accountId={this.props.location.state.accountId} recipe={this.state.favorites}/>
                  </Row> 
                </Col>
                <Col xs={12} sm={6} md={5} lg={5} xl={4}>
                <Row><h2 className="details" id="customs">Ingredients</h2></Row>
                  <Row>
                  <table class = "table table-striped">
      <thead>
      </thead>
      <tbody>
        
      </tbody>
      <tfoot>
        <tr>
          <td>
          <input type="text" className='form-control' name="name"
                  id="name" placeholder="Ingredient name"
                  value={this.state.nname} onChange={e => this.setState({ningred: e.target.value})}></input>
          </td>
        </tr>
      </tfoot>
    </table>
    <button id = "addAccount" class = "btn btn-block btn-success" 
            onClick = {e => addUserIngredient(this.state.accountId, this.state.ningred), refreshPage}>
            Add Ingredient</button>
                  </Row>
                </Col>

              </Row>
            </Container>                              {/* Outer Container Close */}


        </>
    );
  }
}

export default AccountHome;
