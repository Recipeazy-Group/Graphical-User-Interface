import React, { Component } from 'react';
import Navigation from './Navigation';
import Exercise from './../models/Exercise';
import Workout from './../models/Workout';
import Recipe from './../models/Recipe';
import { Container, Media, Row, Col, Carousel } from 'react-bootstrap';

import {ExerciseCard, ExerciseList} from './ExerciseCard';
import './WorkoutPage.css';
import {Rating} from './Rating';
import {Comment} from './../models/Comment';
import {ReviewForm} from './reviews/reviewForm';
import {Link} from 'react-router-dom';
import {WorkoutRepository} from './../api/WorkoutRepository';

const fetch = require("node-fetch");

var url = "http://ec2-3-16-180-137.us-east-2.compute.amazonaws.com:8080";

//Add User favorite
async function addUserFavorite(email, id) {
	let ok = true;	
	const data = {
		Email: email,
		RecipeId: id
	}

	const init = {
		method: 'POST',
    		body: JSON.stringify(data),
		headers: {
      			'Content-Type': 'application/json'
    		}
	}

	const response = await fetch(url + '/UserFavorite/new', init)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

//Get all recipe info by RecipeId
async function getRecipe(id) {
	let ok = true;	
	const response = await fetch(url + '/Recipe/RecipeId?RecipeId=' + id)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

//Get account by email
async function getSteps(id) {
	let ok = true;
	const response = await fetch(url + '/Steps/RecipeId?RecipeId=' + id)
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not connect');
			} else return response.json();
		}).catch(error => { ok = false; console.log(error); });
	if (ok) return response;
	else return null;
}

export class WorkoutPage extends React.Component{
    workoutRepository = new WorkoutRepository;
    state = {
        recipe: new Recipe(
            "Jimbo's Fried Frog Legs",
            1001,
            ["https://via.placeholder.com/150", "https://via.placeholder.com/300" ],
            [
                "4 Frog legs", "1 tbsp Paprika", "2 tsp black pepper", "3 tbsp Cayenne", "1 oz Oil"
            ],
            [
                "1. season frog legs with paprika, black pepper, and cayenne",
                "2. Pour oil in bottom of skillet at medium heat",
                "3. Fry Frog legs in skillet until inner temp reaches 150 F"
            ],
            "Easy",
            0
        ),
        recname:'',
        ingredients: [],
        wrkt: [],
        test: [],
        steps: [],
        beginClk: false,
        pauseClk: false,
        btnCol: {background: 'dodgerblue', maxWidth: '50%'},
        btnWord: "Start",
        rating: 0,
        difficulty: 1,
        accountId: 0,
        ingrdnam:['Frog Legs', 'Paprika', ' black pepper', 'Cayenne', 'Oil']

    }

    newRating = (rat) => {
        let workoutId = +this.props.match.params.workoutId;
        this.setState({
            rating: rat
        })
    }

    newDifficulty = (dif) => {
        let workoutId = +this.props.match.params.workoutId;
        if(dif == 1){
            this.setState({
                difficulty: "Easy"
            })
        }
        else if(dif == 2){
            this.setState({
                difficulty: "Medium"
            })
        }
        else if(dif == 3){
            this.setState({
                difficulty: "Difficult"
            })
        }
    }


    render(){
        return(
        <body>
            <Navigation />
           
            <Container style={{margin:'1em 0'}}>               {/* Outer Container */}

              <Row >
                <Col md={2}>                               {/* Left Side */}
                    <Row>

                    </Row>
                </Col>                                {/* Left Side Close */}
                <Col md={10} style={{background:'dark', display:'block', marginBottom:'2em'}}>                                 {/* Right Side */}
                    <Container>
                        <Row style={{display:'block'}}>
                            <h1>{this.state.recipe.name}</h1>
                            <Rating value = {this.state.rating} />
                            <label for='rating' style={{display:'inline', marginLeft:'1em', marginBottom:'1em'}}><span class="badge badge-success">Rate Taste:</span></label>
                            <select className="form-control"
                            onChange={e => this.newRating(e.target.value)}
                            style={{display:'inline', width:'4em', marginLeft:'1em'}}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            </select>
                            


                        </Row>
                        <Row style={{display:'block'}}>
                            <h4 style={{display:'inline'}}>{this.state.recipe.difficulty}</h4>
                        <label for='rating' style={{display:'inline', marginLeft:'1em', marginBottom:'1em'}}><span class="badge badge-success">Rate Difficulty:</span></label>
                            <select className="form-control"
                            onChange={e => this.newDifficulty(e.target.value)}
                            style={{display:'inline', width:'10em', marginLeft:'1em'}}>
                            <option value={1}>Easy</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Hard</option>
                            </select>
                        </Row>
                        <Row style={{display:'block', marginBottom:'2em'}}>
                            <button id = "addAccount" class = "btn btn-block btn-success" 
                            onClick = {e => addUserFavorite(this.state.accountId, this.state.recipe.description)}
                            style={{marginTop:'0.5em'}}>
                            Add to Favorites</button>
                        </Row>
                        
                        {this.state.recipe.ingredients.map((ex) => 
                            <Row>
                            <div class="dropdown">
                            <button class="dropbtn btn-dark btn-md">{ex}</button>
                                <div class="dropdown-content">
                                    
                                </div>
                            </div>
                            </Row>
                            
                            
                                    )}
                        
                        <Row> </Row>
                    </Container>
                </Col>                                {/* Right Side Close */}
              </Row>
                {this.state.steps.map((ex) =>
                <Row>
                    <Col md={2} style={{position:'relative', marginBottom:'3em'}}>
                        <div className = "form">
                            <label><input className = "checks" type="checkbox" value=""/></label>
                        </div>
                    </Col>
                    <Col md={10}>
                        <h4>{ex}</h4>
                        <br></br>
                    </Col>
                </Row>

                )}
            </Container>                              {/* Outer Container Close */}


        </body>);
    }



    componentDidMount() {
        let workoutId = +this.props.match.params.recipeId;
        
            getRecipe(workoutId)
                .then(wrkt => {
                    var temp=[]
                    for(let i=1;i<wrkt.length;i++){
                      temp.push(wrkt[i].IngredientInfo)
                    }

                    var rec = new Recipe(wrkt[0].RecipeName, this.props.location.state.recipeId, '', temp, '', '', '')
                    this.setState({ recname: wrkt[0].RecipeName,
                                    recipe: rec,
                                    ingredients: temp,
                                    accountId: this.props.location.state.accountId})
                  });
            getSteps(workoutId)
                  .then(rec =>{
                      var temp =[]
                      for(let i=0; i<rec.length;i++){
                          temp.push(rec[i].Step)
                      }
                    this.setState({
                        steps: temp
                    })
                  })
        
    }
}

export default WorkoutPage;