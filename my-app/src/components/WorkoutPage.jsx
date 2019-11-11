import React, { Component } from 'react';
import Navigation from './Navigation';
import Exercise from './../models/Exercise';
import Workout from './../models/Workout';
import Recipe from './../models/Recipe';
import { Container, Media, Row, Col } from 'react-bootstrap';
import {ExerciseCard, ExerciseList} from './ExerciseCard';
import './WorkoutPage.css';
import {Rating} from './Rating';
import {Comment} from './../models/Comment';
import {ReviewForm} from './reviews/reviewForm';
import {Link} from 'react-router-dom';
import {WorkoutRepository} from './../api/WorkoutRepository';

export class WorkoutPage extends React.Component{
    workoutRepository = new WorkoutRepository;
    state = {
        recipe: new Recipe(
            "Jimbo's Fried Frog Legs",
            "a fun food that embiggens you",
            "https://via.placeholder.com/150",
            [
                "Frog legs", "Paprika", "black pepper", "Cayenne", "Oil"
            ],
            [
                "1. season frog legs with paprika, black pepper, and cayenne",
                "2. Pour oil in bottom of skillet at medium heat",
                "3. Fry Frog legs in skillet until inner temp reaches 150 F"
            ],
            "Easy",
            5
        ),
        wrkt: [],
        beginClk: false,
        pauseClk: false,
        btnCol: {background: 'dodgerblue', maxWidth: '50%'},
        btnWord: "Start",
        rating: 3,
        comment: 'test',

    }

    onNewReview(rev){
        let workoutId = +this.props.match.params.workoutId;
        this.workoutRepository.updateComment(workoutId, rev);
        window.location.reload();
    }

    newRating = (rat) => {
        let workoutId = +this.props.match.params.workoutId;
        this.workoutRepository.updateRating(workoutId, rat);
        this.setState({
            rating: rat
        })
    }

    newDifficulty = (dif) => {
        let workoutId = +this.props.match.params.workoutId;
        this.workoutRepository.updateDifficulty(workoutId, dif);
        this.setState({
            difficulty: dif
        })
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
                <Col md={10} style={{background:'dark', display:'block'}}>                                 {/* Right Side */}
                    <Container>
                        <Row style={{display:'block', marginBottom:'2em'}}>
                        <img
                        style={{maxWidth: '100%', height: 'auto'}}
                        className="mr-3"
                        src={this.state.recipe.image}
                        alt="Profile"
                      />
                        </Row>
                        <Row style={{display:'block', marginBottom:'2em'}}>
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
                            
                            <label for='rating' style={{display:'inline', marginLeft:'1em', marginBottom:'1em'}}><span class="badge badge-success">Rate Difficulty:</span></label>
                            <select className="form-control"
                            onChange={e => this.newDifficulty(e.target.value)}
                            style={{display:'inline', width:'10em', marginLeft:'1em'}}>
                            <option value={1}>Easy</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Hard</option>
                            </select>


                        </Row>
                    </Container>
                </Col>                                {/* Right Side Close */}
              </Row>
                {this.state.recipe.steps.map((ex) =>
                <Row>
                    <Col md={2} style={{position:'relative', marginBottom:'3em'}}>
                        <div className = "form">
                            <label><input className = "checks" type="checkbox" value=""/></label>
                        </div>
                    </Col>
                    <Col md={10}>
                        <h4>{ex}</h4>
                    </Col>
                </Row>

                )}
            </Container>                              {/* Outer Container Close */}


        </body>);
    }



    /*componentDidMount() {
        let workoutId = +this.props.match.params.workoutId;
        if (workoutId) {
            this.workoutRepository.getWorkout(workoutId)
                .then(wrkt => {
                    var temp=[]
                    for(let i=0;i<wrkt.length;i++){
                      temp.push(new Exercise(wrkt[i].exercise_name, wrkt[i].exercise_desc,
                        wrkt[i].exercise_image, wrkt[i].default_length, wrkt[i].set_count, wrkt[i].rep_count))

                    }
                    var tempwork=new Workout(wrkt[0].workout_name, wrkt[0].workout_desc,
                        wrkt[0].category, wrkt[0].ExpLevel, wrkt[0].workout_length, wrkt[0].intensity,
                        temp, wrkt[0].rating, wrkt[0].comments
                        )
                    this.setState({ workout: tempwork,
                                    rating: tempwork.rating,
                                    comment: tempwork.comments})
                  });
        }
    }*/
}

export default WorkoutPage;
