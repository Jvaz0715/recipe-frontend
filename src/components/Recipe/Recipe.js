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
    recipeFrom: "",
    recipeTo: "",
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

  getRecipeNextPageCode =  (nextEndpoint) => {
    let appIdStartIndex = nextEndpoint.indexOf("app_id");
    let appIDEndIndex = appIdStartIndex + 16;
    let appID = nextEndpoint.slice(appIdStartIndex, appIDEndIndex);
    nextEndpoint = nextEndpoint.replace(appID, "");
    // console.log(“this is endpoint with replaced app_id”)
    // console.log(nextEndpoint)
  
    let appKeyStartIndex = nextEndpoint.indexOf("&app_key");
    let appKeyEndIndex = appKeyStartIndex + 41;
    let appKey = nextEndpoint.slice(appKeyStartIndex, appKeyEndIndex);
    nextEndpoint = nextEndpoint.replace(appKey, "");
  // console.log(“this is endpoint with everything cloaked”)
  // console.log(nextEndpoint);
    return nextEndpoint;
  }
  
  //create function just forgiving back data

  handleSearchRecipesDynamic = async(dataReturn) => {
    
    let justRecipesNoHREFS = [];

    for (let i = 0; i < dataReturn.data.hits.length; i++) {
      let recipeUriId = await this.getRecipeID(dataReturn.data.hits[i].recipe.uri);

      justRecipesNoHREFS.push({recipe: dataReturn.data.hits[i].recipe, recipeUriId: recipeUriId, });
    };

    let nextEndpointParams = await this.getRecipeNextPageCode(dataReturn.data._links.next.href);

    
    //this will return an array of objects whose only property is a recipe object that does not expose sensitive information
    // console.log(justRecipesNoHREFS)
    this.setState({
      recipeHitsArray: justRecipesNoHREFS,
      nextPageEndpoint: nextEndpointParams,
      recipeFrom: dataReturn.data.from,
      recipeTo: dataReturn.data.to,
    })
    console.log("this is from handle search dynamic")
    console.log(this.state)
  }

  handleSearchRecipesOnSubmit = async (recipeSearched) => {
    try {
      let recipeData = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
        );
       
  
      this.handleSearchRecipesDynamic(recipeData)
      
    } catch (e) {
      return e;
    }
  };

  handleSearchRecipesOnNext = async (recipeSearched) => {
    try {
      let recipeData;

      if(this.state.nextPageEndpoint) {
        recipeData = await axios.get(
          `${this.state.nextPageEndpoint}app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
        );
      };
      this.handleSearchRecipesDynamic(recipeData)
      
    } catch (e) {
      return e;
    }
  };

  onSubmit = async (event) => {             
    try {
      console.log("this.state on each click")
      
      await this.handleSearchRecipesOnSubmit(this.state.recipeSearch);
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

        <div className="page-nav-div">
          
          <button>previous page</button>
          
          <div>
          {this.state.recipeFrom && this.state.recipeTo ? 
            (<div className="recipe-range">
              {this.state.recipeFrom} to {this.state.recipeTo}
            </div>
            ) : (
              ""
            )
          }
          </div>
            
          <button onClick={this.handleSearchRecipesOnNext}>next page</button>

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
