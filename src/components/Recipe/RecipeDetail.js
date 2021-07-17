import React, { Component } from 'react';
import axios from "axios";


export class RecipeDetail extends Component {
   async componentDidMount() {
       this.getRecipe();
   }

   getRecipe = async () => {
       try {
            
             let singleRecipeEndpoint = await axios.get(`https://api.edamam.com/api/recipes/v2/${this.props.location.recipeID}?type=public&app_id=${process.env.REACT_APP_RECIPE_APPID}&app_key=${process.env.REACT_APP_RECIPE_APIKEY}`);
             

             console.log(singleRecipeEndpoint.data.recipe)
        
        } catch(e) {
           console.log(e)
       }
   }


    render() {
        // console.log(this.props.location.recipeID)
        return (
            
            <div>
                Hello, This will be the recipe page
            </div>
        )
    }
}

export default RecipeDetail;

// We are going to export RecipeDetail that will be used in our Main Router