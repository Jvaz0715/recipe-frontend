import React, { Component } from 'react';
import axios from "axios";

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

      return recipeData.data.hits;
    } catch (e) {
      return e;
    }
  };

  onSubmit = async (event) => {
    try {
      let recipeResults = await this.handleSearchRecipes(this.state.recipeSearch);
      // console.log("everything we get back from edamam api")
      // console.log(recipeResults);
      // console.log("the data we will work with")
      // console.log(recipeResults.data);
      // console.log("hits will be the return array of recipes");
      // console.log(recipeResults.data.hits);
      // console.log("loop through and return each recipe");
  
      
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
