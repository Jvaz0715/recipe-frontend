import React, { Component } from 'react';
// import axios from "axios";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import FavoriteRecipesList from "./FavoriteRecipesList";

import "./Recipe.css";

export class Recipe extends Component {
  
  state = {
    recipeHitsArray: [],
  }

  async componentDidMount() {
    this.handleGetAllFaveRecipes();
  }
    
  handleGetAllFaveRecipes = async () => {
    try {
      let getAllRecipes = await Axios.get("/api/favorite-recipes/get-all-fave-recipes");
      this.setState({
        recipeHitsArray: getAllRecipes.data.recipes,
      })
    } catch (e) {
      toast.error(e.response.data.payload);
    }
  };

  
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
          }}>
            <FavoriteRecipesList recipeHitsArray={this.state.recipeHitsArray}/>
            </div>
          
        </div>
        
        
      </div>
    )
  }
}

export default Recipe;



