import React from 'react';


const IngredientsPage = (props) => {


    return(
    <ul className= "list-group"> 
                         
    {
      props.recipe.map((x, index) => 

      <li key= {index} className= "list-group-item">)
      <span className= "badge badge-info float right">  
      { x.ingredients } 
       </span>
      </li>)

    }
    </ul>
    );

}

export default IngredientsPage;