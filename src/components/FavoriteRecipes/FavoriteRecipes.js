import React, { Component } from 'react';
// import axios from "axios";

// import { Link } from "react-router-dom";

import FavoriteRecipesList from "./FavoriteRecipesList";
import "./Recipe.css";

export class Recipe extends Component {
  
  state = {
    recipeSearch: "",
    recipeHitsArray: [],
    nextPage: "", 
    totalRecipes: 0,
  }

  // async componentDidMount() {
  //   try {
  //     // this.setState({
  //     //   recipeNamesArray: this.state.recipeHitsArray,
  //     // })
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }


  render() {
    return (
      <div className="recipeBody">
        
        <div
          style={{
            width: 1500,
            margin: "0 auto",
          
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap"
          }}
        > 
          <div style={{
            width: 1500,
            margin: "0 auto",
            marginBottom: "100px",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap"
          }}><FavoriteRecipesList recipeHitsArray={this.state.recipeHitsArray}/></div>
          
        </div>
        
        
      </div>
    )
  }
}

export default Recipe;



