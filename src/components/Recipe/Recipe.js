import React, { Component } from 'react';
import axios from "axios";
import "./Recipe.css";

export class Recipe extends Component {
  
  state = {
    recipeSearch: "",
    recipeNamesArray: [],
  }

  async componentDidMount() {
    try {
      this.setState({
        recipeNamesArray: this.state.recipeNamesArray,
      })
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
      // console.log("loop through and return each recipe");
      let returnRecipeNames = []
      for (let i = 0; i < 20; i ++) {
        // console.log(recipeResults.data.hits[i].recipe.label)
        // console.log(recipeResults.data.hits[i]);
        returnRecipeNames.push(recipeResults.data.hits[i].recipe.label)
      }
      
      this.setState({
        recipeNamesArray: returnRecipeNames,
      })
      console.log(this.state.recipeNamesArray)
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

        <div>
          {this.state.recipeNamesArray ? (
            <div>
              
                {this.state.recipeNamesArray.map((item) => {
                  return (  
                    <div key={this.state.recipeNamesArray.indexOf(this.state.recipeNamesArray[item])}>{this.state.recipeNamesArray[item]} </div>
                  )
                })}
             
            </div>
          ) : (
            ""
        )}
        </div>
        
      </div>
    )
  }
}

export default Recipe;
