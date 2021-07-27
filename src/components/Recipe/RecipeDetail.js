import React, { Component } from 'react';
import axios from "axios";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import "./RecipeDetail.css";

export class RecipeDetail extends Component {
    state = {
    dishName: "",
    dishImg: "",
    recipeID: this.props.location.recipeID, // We set this from our "to" in recipe.js <Link/> we need this id to complete our axios get request
    recipeURL: "",   
    };

    // Will mount our function as soon as user opens up page
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

            // check console to see what data returns as singleRecipeEndpoint
            console.log("this is the data returned from getRecipe() in RecipeDetail.js, you should see all the data that could be used in the DOM")
            console.log(singleRecipeEndpoint)
            
            window.localStorage.setItem("dishName", singleRecipeEndpoint.data.recipe.label)
            
            window.localStorage.setItem("dishImg", singleRecipeEndpoint.data.recipe.image)
            
            window.localStorage.setItem("recipeURL", singleRecipeEndpoint.data.recipe.url)

            window.localStorage.setItem("recipeID", this.state.recipeID);

            

            this.setState({
                dishName: singleRecipeEndpoint.data.recipe.label,
                dishImg: singleRecipeEndpoint.data.recipe.image,
                recipeURL: singleRecipeEndpoint.data.recipe.url,
            });
            console.log("this is the getrecipe setstate")
            console.log(this.state.recipeID)
            
        
        } catch(e) {
           console.log(e)
        }
    };

    handleAddtoFavorite = async (event) => {
        try {
            //will serve as second argment in our axios.post(url, userinputobj)
            let faveRecipeObj = {
                dishName: window.localStorage.getItem("dishName"),
                dishImg: window.localStorage.getItem("dishImg"),
                recipeURL: window.localStorage.getItem("recipeURL"),
                recipeID: window.localStorage.getItem("recipeID"),      
            };
            console.log('faveRecipeObj')
            console.log(faveRecipeObj)
            let success = await Axios.post("/api/favorite-recipes/add-recipe", faveRecipeObj);
            console.log(success);
            //toast message card for success
            toast.success(`${success.data.message}`);
        } catch (e) {
            // toast message card for error
            toast.error(`${e.response.data.message}`);
            console.log(`${e.response.data.message}`)
        };
    };

    render() {
        return (
            <div className="recipe-detail-body">
                
                    
                    <img className="recipe-image" src={window.localStorage.getItem("dishImg")} alt={window.localStorage.getItem("dishName")}/>
            

                    <div>
                        
                        <h1 className="recipe-name-text">{window.localStorage.getItem("dishName")}</h1>
                        <button 
                            className="favorite-button"
                            onClick={this.handleAddtoFavorite}
                        >
                            add to favorites
                        </button>
           
                    </div>
                    
                    <div>
                        <a href={window.localStorage.getItem("recipeURL")} target="_blank" rel="noreferrer">Click Here for recipe</a>
                    </div>
            </div>
        )
    }
}

export default RecipeDetail;

// We are going to export RecipeDetail that will be used in our Main Router