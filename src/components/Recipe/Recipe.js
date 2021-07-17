import React, { Component } from 'react';
import axios from "axios";

// import { Link } from "react-router-dom";

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
  // this function was created to isolate just the id portion of the URI as opposed to using the href self link that exposes my api id and key
  // we use this in the handlesearchrecipes to create a new array with just the recipe object and the isolated recipe id, we will need this to get our endpoint for recipe
  getRecipeID = (string) => {
    const recipeURI = string.split("_");
    // console.log(recipeURI[1]);
    return recipeURI[1]
}
  
  handleSearchRecipes = async (recipeSearched) => {
    try {
      let recipeData = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
      );

          
      // because our data.hits also exposes our api keys in the _link.href property, we need to loop through the hits array of objects and only return the RECIPE property

      let justRecipesNoHREFS = [];

      for (let i = 0; i < recipeData.data.hits.length; i++) {
        let recipeUriId = this.getRecipeID(recipeData.data.hits[i].recipe.uri)
        justRecipesNoHREFS.push({recipe: recipeData.data.hits[i].recipe, recipeUriId: recipeUriId});
      }
      
      //this will return an array of objects whose only property is a recipe object that does not expose sensitive information
      return justRecipesNoHREFS;
      

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
