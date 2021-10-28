import React, { Component } from 'react';
import axios from "axios";

// import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./Recipe.css";
import { Button, /*Card, CardImg, CardText, CardBody, CardTitle*/ } from 'reactstrap';

export class Recipe extends Component {
  
  state = {
    recipeSearch: "",
    recipeHitsArray: [],
    nextPage: "", 
    totalRecipes: 0,
  }

  async componentDidMount(event) {
    try {
      // event.preventDefault();
      this.setState ({
        recipeHitsArray: this.state.recipeHitsArray,
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
  // this function was created to isolate just the id portion of the URI as opposed to using the href self link that exposes my api id and key
  // we use this in the handlesearchrecipes to create a new array with just the recipe object and the isolated recipe id, we will need this to get our endpoint for recipe
  getRecipeID = (string) => {
    const recipeURI = string.split("_");
    // console.log(recipeURI[1]);
    return recipeURI[1]
  };

  getCloakedURL =  (nextEndpoint) => {
    let appIdStartIndex = nextEndpoint.indexOf("app_id");
    let appIDEndIndex = appIdStartIndex + 16;
    let appID = nextEndpoint.slice(appIdStartIndex, appIDEndIndex);
    nextEndpoint = nextEndpoint.replace(appID, "");
  
    let appKeyStartIndex = nextEndpoint.indexOf("&app_key");
    let appKeyEndIndex = appKeyStartIndex + 41;
    let appKey = nextEndpoint.slice(appKeyStartIndex, appKeyEndIndex);
    nextEndpoint = nextEndpoint.replace(appKey, "");

    return nextEndpoint;
  }
  
  //create function just forgiving back data

  handleSearchRecipesDynamic = async(returnedData) => {
    
    let justRecipesNoHREFS = this.state.recipeHitsArray;

    for (let i = 0; i < returnedData.data.hits.length; i++) {
      let recipeUriId = await this.getRecipeID(returnedData.data.hits[i].recipe.uri);

      justRecipesNoHREFS.unshift({recipe: returnedData.data.hits[i].recipe, recipeUriId: recipeUriId, });
    };

    let nextPageURL = await this.getCloakedURL(returnedData.data._links.next.href);
    
    
    // this will return an array of objects whose only property is a recipe object that does not expose sensitive information
    this.setState({
      recipeHitsArray: justRecipesNoHREFS,
      totalRecipes: returnedData.data.to,
      nextPage: nextPageURL, 
    })
  };

  handleSearchRecipesOnSubmit = async (recipeSearched) => {
    try {
      let recipeData = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
      );
      
      this.handleSearchRecipesDynamic(recipeData);
  
    } catch (e) {
      return e;
    }
  };

  handleSearchRecipesOnNext = async () => {
    try {
      let recipeData = await axios.get(
          `${this.state.nextPage}app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`
        );
      
      this.handleSearchRecipesDynamic(recipeData)
          
    } catch (e) {
      return e;
    }
  };

  onSubmit = async (event) => {             
    try {
      await this.handleSearchRecipesOnSubmit(this.state.recipeSearch);
    } catch (e) {
      alert("enter valid entry")
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
          <Button className="search-recipe-button" onClick={this.onSubmit} color="danger">Search</Button> 
          {/* <button  onClick={this.onSubmit}>Submit</button> */}
        </div>
  
        {/* we need something for the landing page, like three suggestion meals */}
        {/* <div>
          <Card>
            <CardImg  />
            <CardBody>
              <CardTitle>

              </CardTitle>
              <Button/>
            </CardBody>
          </Card> 
        </div> */}

        <div className="page-nav-div">
          
          <div>
          {this.state.totalRecipes ? 
            (<div className="recipe-range">
              Total Results {this.state.totalRecipes} of 120
            </div>
            ) : (
              ""
            )
          }
          </div>
          <Button 
            onClick={this.handleSearchRecipesOnNext}
            hidden={this.state.totalRecipes < 1 || this.state.totalRecipes >= 120 ? (true):(false)}
          >
            More recipes...
          </Button>

        </div>
        
        <div
          style={{
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap"
          }}
        > 
          <div 
            hidden={this.state.totalRecipes <= 20 || this.state.totalRecipes >= 120 ? (true):(false)}
          >Newest to Oldest results</div>
          <div style={{
            width: 1500,
            margin: "0 auto",
            marginBottom: "100px",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap"
          }}><RecipeList recipeHitsArray={this.state.recipeHitsArray}/></div>
          
        </div>
        
        
      </div>
    )
  }
}

export default Recipe;



