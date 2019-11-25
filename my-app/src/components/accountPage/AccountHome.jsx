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

var url = "http://ec2-18-218-75-228.us-east-2.compute.amazonaws.com:8000";

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

//Get list of recipes containing a specific ingredient
async function getRecipesByIngredient(ingred) {
	let ok = true;
	const response = await fetch(url + '/RecipesByIngredient/' + ingred)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		}).then(response => response.json())
		.catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}


function refreshPage() {
  window.location.reload(false);
}


//Get all recipe info by RecipeId
async function getRecipe(id) {
	const response = await fetch(url + '/Recipe/' + id)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			}
		})
		.catch(error => { console.log(error); });
	return response;
}


function WorkoutButtons(props){
  return <>
  {props.workout.map((wrkt) =>

    <Link className="btn btn-info btn-m btn-dark m-1" to={{
        pathname: `/recipepage/${wrkt[0]}`,
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
      workouts: [],
      favorites: [],
      addOption: "Add",
      ningred: '',
      nrecipe: ''
    }
  }


  componentDidMount() {

    console.log("here is the passed in accountId: "+this.props.location.state.accountId)

    this.repo.getFavorites(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.recipe_id])
        }
        this.setState({workouts: temp })
      }
    );
    this.repo.getFavorites(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.recipe_id, workout.recipe_name])
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
                <Col xs={12} sm={6} md={5} lg={5} xl={4}>                                 {/* Recipe Search */}
                
                  <Row><h2 className="details" id="customs">Recipe Search</h2></Row>
                  <hr />

                  <input type="text" className='form-control' name="search"
                  id="search" placeholder="Recipe search" style={{maxWidth:'70%'}}
                  onChange={e => this.setState({ningred: e.target.value})}></input>
                    <br></br>
                  {<Link
                    style={{maxWidth: '70%', borderTop: '2em', borderBottom:'2em'}} 
                    className="btn btn-block btn-success"
                    onClick = {e => getRecipesByIngredient(this.state.ningred), refreshPage}> 
                    to={{
                      pathname: `/recipepage/:recipeId`,
                      state: {
                      "accountId": this.props.location.state.accountId 
                      }
                      //passin not real account right now
                    }}>
                   
                    Enter</Link> }
              

                </Col>
                <Col xs ={12} sm={6} md={5} lg={5} xl={4}>
                  <Row><h2 className="details" id="customs">Favorites</h2></Row>
                  <Row>
                   <WorkoutButtons accountId={this.props.location.state.accountId} workout={this.state.favorites}/>
                  </Row> 
                </Col>
                <Col xs={12} sm={6} md={5} lg={5} xl={4}>
                <Row><h2 className="details" id="customs">Ingredients</h2></Row>
                  <Row>
      <table class = "table table-striped">
      <thead>
      </thead>
      <tbody>
                        {/* This is where you will map ingredients in tr tags*/}
      </tbody>
      <tfoot>
        <tr>
          <td>
          <input type="text" className='form-control' name="name"
                  id="name" placeholder="Ingredient name" style={{maxWidth:'70%'}}
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
