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

var url = "http://ec2-3-16-180-137.us-east-2.compute.amazonaws.com:8080";
var mlUrl = "http://ec2-3-16-180-137.us-east-2.compute.amazonaws.com:5050";
//Add User ingredient
async function addUserIngredient(email, ingr) {
	let ok = true;
	const data = {
		Email: email,
		IngredientName: ingr
	}

	const init = {
		method: 'POST',
    		body: JSON.stringify(data),
		headers: {
      			'Content-Type': 'application/json'
    		}
	}

	const response = await fetch(url + '/UserIngredient/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

//Get account by email
async function getAccount(email) {
	let ok = true;
	const response = await fetch(url + '/User/Email?Email=' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

//Get list of recipes containing a specific ingredient
async function getRecipesByIngredient(ingred) {
	let ok = true;
	const response = await fetch(url + '/RecipesByIngredient/IngredientName?IngredientName=' + ingred)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) {console.log(response); return response;}
	else return null;
}

//Get User Ingredients by email
async function getUserIngredients(email) {
	let ok = true;
	const response = await fetch(url + '/UserIngredients/Email?Email=' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

//Get users favorite recipes
async function getFavoritedRecipes(email) {
	let ok = true;
	const response = await fetch(url + '/UserFavorites/Email?Email=' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

//Get users recommendations
async function getRecommendedRecipes(email, numSuggestions) {
	let ok = true;
	const response = await fetch(mlUrl + '/suggestionAPI/recipes?userID=' + email + "&numSuggestions=" + numSuggestions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) {console.log(response); return response;}
	else return null;
}

//Get recipes containting all user ingredients
async function getRecipesForUser(email) {
	let ok = true;
	const response = await fetch(url + '/Recipes/' + encodeURI(email))
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}


function refreshPage() {
  window.location.reload(false);
}


class AccountHome extends Component {

  repo = new HomeRepository();
  currentAccount = new Account();

  constructor(props) {
    super(props);
    this.state = {
      fname: [],
      lname: '',
      workouts: [],
      favorites: [],
      addOption: "Add",
      ningred: [],
      nrecipeId: [],
      ingredname: '',
      recommend: [],
      fulling: [],
      useremail:''
    }
  }

  onIngredientsAdded(ingred) {
    this.setState(prevState => {
        prevState.workouts.push(ingred);
        return prevState;
    });
    addUserIngredient(this.props.location.state.accountId, ingred)
}

onSubmit() {
  getRecipesByIngredient(this.state.ingredname).then(ingrep => {
    var temp=[]
    for(let workout of ingrep){
      temp.push([workout.IngredientName, workout.recipeId])
    }
    this.setState({nrecipeId: ingrep })
  })
}


  componentDidMount() {

 

    getAccount(this.props.location.state.accountId).then(ac =>{
      this.setState({
        fname: ac[0].FirstName,
        lname: ac[0].LastName,
        useremail: this.props.location.state.accountId
      })
    })

    getUserIngredients(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.IngredientName])
        }
        this.setState({workouts: wrkts })
      }
    );
    getFavoritedRecipes(this.props.location.state.accountId).then(fav => {
        var temp=[]
        for(let rep of fav){
          temp.push([rep.RecipeId, rep.RecipeName])
        }
        this.setState({favorites: temp })
      }
    );
    getRecommendedRecipes(this.props.location.state.accountId, 5).then(rec =>{
      var temp=[]
        for(let rep of rec){
          temp.push([rep.ID, rep.title])
        }
        this.setState({recommend: temp})
    }
      );
      getRecipesForUser(this.props.location.state.accountId).then(rec =>{
        var temp=[]
          for(let rep of rec){
            temp.push([rep.RecipeId, rep.RecipeName])
          }
          this.setState({fulling: temp})
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
                
                  <Row><h2 className="details" id="customs"style={{marginLeft:'0.5em'}}>Recipe Search</h2></Row>
                  <hr />

                  <input type="text" className='form-control' name="search"
                  id="search" placeholder="Recipe search" style={{maxWidth:'70%'}}
                  onChange={e => this.setState({ingredname: e.target.value})}></input>
                    <br></br>
                
                  <Link
                    style={{maxWidth: '70%', borderTop: '2em', borderBottom:'2em'}} 
                    className="btn btn-block btn-success"
                    onClick = {e=> this.onSubmit()}>
                    Enter </Link>
                    <Row>
                    {this.state.nrecipeId.map((wrkt, i) =>
                    <Link className="btn btn-info btn-m btn-dark m-1" to={{
                        pathname: `/recipepage/${this.state.nrecipeId[i][1]}`,
                        state: {
                          "accountId": this.state.useremail,
                          "recipeId": this.state.nrecipeId[i][1]
                        }
                      }}>

                      <h5>{this.state.nrecipeId[i][0]}</h5>
                    </Link>
                    )  }
                   </Row>

                </Col>
                <Col xs ={12} sm={6} md={5} lg={5} xl={4}>
                  <Row><h2 className="details" id="customs">Favorites</h2></Row>
                  <Row>
                    
                    {this.state.favorites.map((wrkt, i) =>
                    <Link className="btn btn-info btn-m btn-dark m-1" to={{
                        pathname: `/recipepage/${this.state.favorites[i][0]}`,
                        state: {
                          "accountId": this.state.useremail,
                          "RecipeId": this.state.favorites[i][0]
                        }
                      }}>

                      <h5>{this.state.favorites[i][1]}</h5>
                    </Link>
                    )  }
                  </Row> 
                  <Row style={{marginTop:'1em'}}><h2 className="details" id="customs">Reccomendations</h2></Row>
                  <Row>
                    
                    {this.state.recommend.map((wrkt, i) =>
                    <Link className="btn btn-info btn-m btn-dark m-1" to={{
                        pathname: `/recipepage/${this.state.recommend[i][0]}`,
                        state: {
                          "accountId": this.state.useremail,
                          "recipeId": this.state.recommend[i][0]
                        }
                      }}>

                      <h5>{this.state.recommend[i][1]}</h5>
                    </Link>
                    )  }
                  </Row> 
                </Col>
                <Col xs={12} sm={6} md={5} lg={5} xl={4}>
                <Row><h2 className="details" id="customs" style={{marginBottom:'0.8em'}}>Ingredients</h2></Row>
                <Row>

      <table class = "table table-striped">
      <thead>
      </thead>
      <tbody>
      {this.state.workouts.map((item)=> 
        <tr>
          <td>                {/* This is where you will map ingredients in tr tags*/}
            {item.IngredientName}
          </td>
          </tr>)
          }
      </tbody>
      <tfoot>
      </tfoot>
    </table>
    <input type="text" className='form-control' name="name"
                  id="name" placeholder="Ingredient name" style={{maxWidth:'70%', marginBottom:'1em'}}
                  value={this.state.nname} onChange={e => this.setState({ ingredname: e.target.value }) }></input>
    <button id = "addAccount" class = "btn btn-block btn-success" 
            onClick = {e => this.onIngredientsAdded(this.state.ingredname)}>
            Add Ingredient</button>
                  </Row>
                  <Row style={{marginTop:'2em'}}>
                <h2 className="details">Pantry Search</h2>
              </Row>
              {this.state.fulling.map((wrkt, i) =>
              <Row>
                    <Link className="btn btn-info btn-m btn-dark m-1" to={{
                        pathname: `/recipepage/${this.state.fulling[i][0]}`,
                        state: {
                          "accountId": this.state.useremail,
                          "recipeId": this.state.fulling[i][0]
                        }
                      }}>

                      <h5>{this.state.fulling[i][1]}</h5>
                    </Link>
                    </Row>
                    )  }
                </Col>

              </Row>
            </Container>                              {/* Outer Container Close */}


        </>
    );
  }
}

export default AccountHome;
