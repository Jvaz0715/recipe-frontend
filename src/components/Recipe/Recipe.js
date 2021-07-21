import React, { Component } from 'react';
import axios from "axios";

// import { Link } from "react-router-dom";

import RecipeList from "./RecipeList";
import "./Recipe.css";

export class Recipe extends Component {
  
  state = {
    recipeSearch: "",
    recipeHitsArray: [],
    nextPageEndpoint: "",
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
  };

  getRecipeNextPageCode =  (string) => {
    let _contIndex = string.indexOf("_cont");
    let _cont3Dindex = string.indexOf("%3D") + 3;
    const nextPageParams = string.slice(_contIndex, _cont3Dindex);

    return nextPageParams;
  }
  
  handleSearchRecipes = async (recipeSearched) => {
    try {
      let recipeData;
      if (!this.state.nextPageEndpoint) {
        recipeData = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
        );
      } else {
        recipeData = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}&type=public&${this.state.nextPageEndpoint}`
        );
      }
      
      // because our data.hits also exposes our api keys in the _link.href property, we need to loop through the hits array of objects and only return the RECIPE property

      let justRecipesNoHREFS = [];

      for (let i = 0; i < recipeData.data.hits.length; i++) {
        let recipeUriId = this.getRecipeID(recipeData.data.hits[i].recipe.uri);

        justRecipesNoHREFS.push({recipe: recipeData.data.hits[i].recipe, recipeUriId: recipeUriId, });
      };

      let nextEndpointParams = this.getRecipeNextPageCode(recipeData.data._links.next.href);
      //this will return an array of objects whose only property is a recipe object that does not expose sensitive information
      // console.log(justRecipesNoHREFS)
      this.setState({
        recipeHitsArray: justRecipesNoHREFS,
        nextPageEndpoint: nextEndpointParams,
      })
      return justRecipesNoHREFS;
    
      

    } catch (e) {
      return e;
    }
  };

  onSubmit = async (event) => {             
    try {
      console.log("this.state on each click")
      
      await this.handleSearchRecipes(this.state.recipeSearch);
      console.log(this.state)

    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="recipeBody">
        
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
          <button>previous page</button>
          <button onClick={this.onSubmit}>next page</button>
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
