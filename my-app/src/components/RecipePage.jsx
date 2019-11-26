import React, { Component } from 'react';
import Recipe from './../models/Recipe';
import { Container, Media, Row, Col } from 'react-bootstrap';

const fetch = require("node-fetch");

var url = "http://ec2-18-218-75-228.us-east-2.compute.amazonaws.com:8000";

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

class RecipePage extends Component {
state= {
recipeid: 0

 }


render() {

    return( 
    <Col xs={12} sm={6} md={5} lg={5} xl={4}>
    <Row><h2 className="details" id="customs">Recipes</h2></Row>
      <Row>
      <table class = "table table-striped">
<thead>
</thead>
<tbody>

</tbody>
<tfoot>
<tr>
<td>
<h1> POOOP </h1>
<h3> {console.log(getRecipe(this.state.recipeid))} </h3>
</td>
</tr>
</tfoot>
</table>
      </Row>
    </Col>
    );

   }

}

export default RecipePage