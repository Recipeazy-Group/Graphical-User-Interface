import React, { Component } from 'react';
import Navigation from '../Navigation';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './AccountHome.css';
import Account from '../../models/Account';
import { HomeRepository } from '../../api/HomeRepository';
import Timeline from './Timeline';
import { Link } from 'react-router-dom';
import { Form, Modal} from 'react-bootstrap';

function FormOptions(props){
  return <>
  {props.opts.map((opt) => <option value={opt}>{opt}</option>)  }
    </>
}

function WorkoutButtons(props){

  return <>
  {props.workout.map((wrkt) =>

    <Link className="btn btn-info btn-m m-1" to={{
        pathname: `/workoutpage/${wrkt[0]}`,
        state: {
          "accountId": props.accountId
        }
      }}>

      <h5>{wrkt[1]}</h5>

        {wrkt[2]}
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
      history: [],
      addOption: "Add"
    }
  }

  componentDidMount() {

    console.log("here is the passed in accountId: "+this.props.location.state.accountId)

    this.repo.getProfilePic(this.props.location.state.accountId).then(pic => this.setState({avatar:pic[0].avatar}));
    this.repo.getBio(this.props.location.state.accountId).then(info => this.setState({bio: info[0].user_bio }));
    this.repo.getWorkouts(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.workout_id, workout.workout_name, workout.workout_desc])
        }
        this.setState({workouts: temp })
      }
    );
    this.repo.getFavorites(this.props.location.state.accountId).then(wrkts => {
        var temp=[]
        for(let workout of wrkts){
          temp.push([workout.workout_id, workout.workout_name, workout.workout_desc])
        }
        this.setState({favorites: temp })
      }
    );

    // this.repo.getFriends(this.props.userID).then(buddies => {
    //   this.setState({buddies})
    // });

  }

  render() {
    return (
        <>
            <Navigation/>

            <Container id="enclosed" style={{maxWidth: '100%', marginTop: '1em', marginLeft: '1em'}}>               {/* Outer Container */}

              <Row>

                <Col xs={12} sm={6} md={4} lg={4} xl={3}>                      {/* Left Side */}

                  <Row>                                   {/* Row 1 */}
                     <img
                        style={{maxWidth: '100%', height: 'auto'}}
                        className="mr-3"
                        src={this.state.avatar}
                        alt="Profile"
                      />
                  </Row>
                  <Row>
                      <h3 className="details">Bio</h3>
                  </Row>
                  <Row>
                    <p align="left">
                      {this.state.bio}
                    </p>
                  </Row>
                </Col>                                                          {/* Left Side Close */}


                <Col xs={12} sm={6} md={5} lg={5} xl={4}>                                 {/* Center Timeline */}
                  <Row>
                    {<Link
                    style={{maxWidth: '100%', borderTop: '2em', borderBottom:'2em'}} 
                    className="btn btn-success btn-lg" 
                    to={{
                      pathname: '/workoutgen',
                      state: {
                        "accountId": this.props.location.state.accountId
                      }
                    }}>
                    Recipe Search</Link>  }
                  </Row>
                  
                  <Row><h2 className="details" id="customs">Recents</h2></Row>
                  <Row>
                  <WorkoutButtons accountId={this.props.location.state.accountId} workout={this.state.workouts}/>
                  </Row>
                </Col>
                <Col xs ={12} sm={6} md={5} lg={5} xl={4}>
                  <Row><h2 className="details" id="customs">Favorites</h2></Row>
                  <Row>
                    <WorkoutButtons accountId={this.props.location.state.accountId} workout={this.state.favorites}/>
                  </Row> 
                </Col>

              </Row>
            </Container>                              {/* Outer Container Close */}


        </>
    );
  }
}

export default AccountHome;
