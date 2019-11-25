import React, {Component} from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Bootstrap from "react-bootstrap";
import './WorkoutGenerator.css';
import {Card, Form, Modal} from 'react-bootstrap';
import Navigation from './Navigation';
import axios from 'axios';

import {Exercise} from '../models/Exercise';
import {Workout} from '../models/Workout';

import { ExerciseCard, ExerciseList } from './ExerciseList';
import { WorkoutGeneratorRepository } from '../api/workoutGenRepo';

function FormOptions(props){
  return <>
  {props.opts.map((opt) => <option value={opt}>{opt}</option>)  }
    </>
}

class WorkoutGenerator extends Component {

  workoutGeneratorRepo = new WorkoutGeneratorRepository;

  constructor(props, context) {
    super(props, context);

    this.state = {
      category: ["lower body"],
      expertise: ["Expert"],
      length: [30],
      intensity: [3],
      exercisesGenerated: [],
      filteredExercises: [],
      //these are the exercise that have been kept
      chosenExercises:[],
      showAddExercise:false,
      showAddWorkout:false,
      customExerciseName:"Deadlift",
      customExerciseSets:1,
      customExerciseReps:1,
      customExerciseDuration:1,
      customExerciseDescription:"",
      workoutName:0,
      workoutIntensity:0,
      workoutExperience:0,
      workoutDuration:0,
      workoutDescription:0,
      createWorkoutID:0,
      exerciseOptions:[],
      custom_image_url:"https://via.placeholder.com/150"
    };
    this.handleCustomAdditionSubmit = this.handleCustomAdditionSubmit.bind(this);
    this.handleWorkoutSubmit = this.handleWorkoutSubmit.bind(this);
  }


  filterList = (event) => {
    let items = this.state.exerciseOptions;
    items = items.filter((item) => {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredExercises: items});
  }



  componentDidMount() {
  

    console.log("here is the passed in accountId: "+this.props.location.state.accountId)


    this.workoutGeneratorRepo.getExercises().then( 
      exercises =>
      {
        var temp=[]
        
        for(let i=0;i<exercises.length;i++){
          temp.push(exercises[i].exercise_name)
        }
        this.setState({ exerciseOptions: temp })
        
       
      }


    )
  }
  

  handleCustomAdditionSubmit(event) {
  

    this.workoutGeneratorRepo.getExercisePic(this.state.customExerciseName).then(image =>



        {
             this.setState(
               state => {state.exercisesGenerated.push(new Exercise(this.state.customExerciseName,
                 this.state.customExerciseDescription,
                image[0].exercise_image,
                 this.state.customExerciseDuration,
                 this.state.customExerciseSets,
                 this.state.customExerciseReps))
                 return state;
               })
        }
             );
               this.setState({ showAddExercise: false })

  }

  //WIP


  async handleWorkoutSubmit(event){

    event.preventDefault();

    const workout = {
      userID:   this.props.location.state.accountId,
      workoutDuration:    this.state.workoutDuration,
      workoutDesc:   this.state.workoutDescription,
      workoutName:    this.state.workoutName,
      intensity:   this.state.workoutIntensity,
      experience:    this.state.workoutExperience,
    };


    await this.workoutGeneratorRepo.addWorkout(workout).then(workout_id => this.setState({createWorkoutID: workout_id}))


    this.setState({category: [], expertise: [], length: [], intensity: [], showAddWorkout:false});

    this.props.history.push(
      {
        pathname: `/workoutpage/${this.state.createWorkoutID}`,
        state: {
          accountId: this.props.location.state.accountId,
        }
      })
  }

  


  render() {
    return (<> < Navigation accountId={this.props.location.state.accountId} />

    <ButtonToolbar bsPrefix="inline-flex">
      <div>
          <form>
                <input type="text" placeholder="Search" onChange={this.filterList}/>
          </form>
        </div>
        {/*
      <Button onClick={event => this.setState({ showAddExercise: true })} className="workgen" size="sm"  variant="outline-secondary">Add custom exercise</Button>
      <Button onClick={event => this.setState({ showAddWorkout: true })} className="m-4" size="lg" variant="outline-success" >Add to Workouts</Button> */}

    </ButtonToolbar>

 
    <hr></hr>
    <Modal show={this.state.showAddExercise} onHide={event => this.setState({ showAddExercise: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Add Custom Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Exercises</Form.Label>
                  <Form.Control as="select"
                    onChange={event =>  {this.setState({customExerciseName: event.currentTarget.value})}}>
                    <FormOptions opts={this.state.exerciseOptions}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Sets</Form.Label>
                  <Form.Control as="select"
                    onChange={event =>  {this.setState({customExerciseSets: event.currentTarget.value})}}>
                    <FormOptions opts={[1,2,3,4,5]}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Reps</Form.Label>
                  <Form.Control as="select" onChange={event =>  {this.setState({customExerciseReps: event.currentTarget.value})}}>
                    <FormOptions opts={[1,2,3,4,5]}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control as="select" onChange={event =>  {this.setState({customExerciseDuration: event.currentTarget.value})}}>
                    <FormOptions opts={[1,2,3,4,5]}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3" onChange={event =>  {this.setState({customExerciseDescription: event.currentTarget.value})}} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={event => this.setState({ showAddExercise: false })}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleCustomAdditionSubmit}>
                Add Exercise
              </Button>
            </Modal.Footer>
          </Modal>

    <h2>
        
      Match Recipes
      <br></br>

      <div>
            {
                this.state.filteredExercises.map(function(item) {
                    return <div key={item}>{item}</div>
                })
            }
     </div>

    </h2>
    <ExerciseList exercises={this.state.filteredExercises} onExerciseSelected=
       {(exerciseName) =>
         {

         this.setState(
           state => {state.chosenExercises.push(exerciseName)
             return state;
           })

           // alert(this.state.chosenExercises.toSource())

         }
       }

           />


           <Modal show={this.state.showAddWorkout} onHide={event => this.setState({ showAddWorkout: false })}>
                   <Modal.Header closeButton>
                     <Modal.Title>Add Workout</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>



                     <Form>
                       <Form.Group controlId="exampleForm.ControlInput1">
                         <Form.Label>Workout Name</Form.Label>
                         <Form.Control type="text" placeholder="2n semester workout" onChange={event =>  {this.setState({workoutName: event.currentTarget.value})}}/>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlSelect1">
                         <Form.Label>Intensity</Form.Label>
                         <Form.Control as="select" onChange={event =>  {this.setState({workoutIntensity: event.currentTarget.value})}}>
                           <FormOptions opts={[1,2,3,4,5]}/>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlSelect1">
                         <Form.Label>Experience Level</Form.Label>
                         <Form.Control as="select" onChange={event =>  {this.setState({workoutExperience: event.currentTarget.value})}}>
                           <FormOptions opts={[1,2,3,4,5]}/>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlSelect1">
                         <Form.Label>Duration</Form.Label>
                         <Form.Control as="select" onChange={event =>  {this.setState({workoutDuration: event.currentTarget.value})}}>
                           <FormOptions opts={[1,2,3,4,5]}/>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Workout Description</Form.Label>
                         <Form.Control as="textarea" rows="3" onChange={event =>  {this.setState({workoutDescription: event.currentTarget.value})}}/>
                       </Form.Group>
                     </Form>
                   </Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={event => this.setState({ showAddWorkout: false })}>
                       Cancel
                     </Button>
                     <Button variant="primary" onClick={this.handleWorkoutSubmit}>
                       Add Workout
                     </Button>
                   </Modal.Footer>
                 </Modal>
  </>);
  }
}

export default WorkoutGenerator;
