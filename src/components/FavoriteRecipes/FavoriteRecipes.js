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

      console.log(getAllRecipes)
      this.setState({
        recipeHitsArray: getAllRecipes.data,
      })
    } catch (e) {
      // toast.error(e.response.data.payload);
    }
  };

  handleDeleteByRecipe = (user) => {
    let newArray = this.state.recipeHitsArray.filter((recipe) => recipe._id !== user._id);

    this.setState({
      recipeHitsArray: newArray,
    })

  }
  deleteFaveRecipe = async(id) => {
      try {
          let deletedRecipe = await Axios.delete(`/api/favorite-recipes/delete-recipe/${id}`);
          console.log(deletedRecipe);
          this.handleDeleteByRecipe(deletedRecipe.data.payload);
          //toast message card for success
          // toast.success(`${deletedRecipe.data.message}`);
      } catch (e) {
          // toast message card for error
          toast.error(`${e.response.data.message}`);
          console.log(`${e.response.data.message}`)
      };
  }
  
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
            <FavoriteRecipesList 
              recipeHitsArray={this.state.recipeHitsArray}
              deleteFaveRecipe={this.deleteFaveRecipe}
            />
            </div>
        </div>
      </div>
    )
  }
};

export default Recipe;



