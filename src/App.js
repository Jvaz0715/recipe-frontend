import React, { Component } from 'react';
import axios from "axios";
import "./App.css";

export class App extends Component {
  
  state = {
    recipeSearch: "",
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

      return recipeData;
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
      console.log("loop through and return each recipe");
      for (let i = 0; i < 20; i ++) {
        console.log(recipeResults.data.hits[i].recipe.label)
        console.log(recipeResults.data.hits[i]);
      }
      
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
        
      </div>
    )
  }
}

export default App;
