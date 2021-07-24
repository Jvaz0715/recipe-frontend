import React, { Component } from 'react';
import axios from "axios";
import "./Recipe.css";

export class RecipeDetail extends Component {
    state = {
    dishName: "",
    dishImg: "",
    recipeID: this.props.location.recipeID, // We set this from our "to" in recipe.js <Link/> we need this id to complete our axios get request
    recipeURL: "",   
    };

    // Why do componentDidMount()? TEST:
    async componentDidMount() {
        try {
            await this.getRecipe();
            
        } catch(e){
            console.log(e)
       }
    };

    getRecipe = async () => {
        try {
             
            let singleRecipeEndpoint = await axios.get(`https://api.edamam.com/api/recipes/v2/${this.state.recipeID}?type=public&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`);
            window.localStorage.setItem("dishName", singleRecipeEndpoint.data.recipe.label)
            
            window.localStorage.setItem("dishImg", singleRecipeEndpoint.data.recipe.image)
            
            window.localStorage.setItem("recipeURL", singleRecipeEndpoint.data.recipe.url)
            this.setState({
                dishName: singleRecipeEndpoint.data.recipe.label,
                dishImg: singleRecipeEndpoint.data.recipe.image,
                recipeURL: singleRecipeEndpoint.data.recipe.url,
            });

            
        
        } catch(e) {
           console.log(e)
        }
    };


    render() {
        // console.log(this.props.location.recipeID)
        return (
            
            <div style={{display: "flex", flexDirection:"column"}}>
                <div>
                    <img src={window.localStorage.getItem("dishImg")} alt={window.localStorage.getItem("dishName")}/>
                </div>
                <div>
                    <div>
                    <h1>{window.localStorage.getItem("dishName")}</h1>
                    <button className="favorite-button">
                        Add to favorites
                    </button>
                    </div>
                    
                    <a href={window.localStorage.getItem("recipeURL")} target="_blank" rel="noreferrer">Click Here for recipe</a>
                </div>
                
    
            </div>
        )
    }
}

export default RecipeDetail;

// We are going to export RecipeDetail that will be used in our Main Router