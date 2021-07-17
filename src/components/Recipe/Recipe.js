import React, { Component } from 'react';
import axios from "axios";

import { Link } from "react-router-dom";

import RecipeList from "./RecipeList";
import "./Recipe.css";

export class Recipe extends Component {
  
  state = {
    recipeSearch: "",
    recipeHitsArray: [],
  }

  async componentDidMount() {
    try {
      // this.setState({
      //   recipeNamesArray: this.state.recipeNamesArray,
      // })
    } catch(e) {
      console.log(e)
    }
  }
  
  handleOnChange = (event) => {
    this.setState({
      recipeSearch: event.target.value,
    });
  };
  
  handleSearchRecipes = async (recipeSearched) => {
    try {
      let recipeData = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
      );
      // recipeData.data.hits lets us target the array of recipes which contains 20 recipe objects REF: EDAMAM DOCUMENTATION
      return recipeData.data.hits;

    } catch (e) {
      return e;
    }
  };

  onSubmit = async (event) => {
    try {
      // onSubmit, we pass the state's recipeSearch input into the handleSearchRecipes helper function
      let recipeResults = await this.handleSearchRecipes(this.state.recipeSearch);
  
      // we then setState so that the recipeHitsArray is set to our search above
      //ATTN: the recipeResults should return an array of 20 recipe objects [{0},{1},{2}...{19}]
      this.setState({
        recipeHitsArray: recipeResults,
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        
        <div className="input-div">
          <input 
            className="recipe-search"
            type="text"
            name="recipe"
            onChange={this.handleOnChange}
          />
        <button className="search-recipe-button" onClick={this.onSubmit}>Submit</button>
        </div>
        <div
          style={{
            width: 1500,
            margin: "0 auto",
            marginBottom: "100px",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <RecipeList recipeHitsArray={this.state.recipeHitsArray}/>
        </div>
        
        
      </div>
    )
  }
}

export default Recipe;
