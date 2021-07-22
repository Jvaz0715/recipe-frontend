import React from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Axios from "../utils/Axios";


function FavoriteRecipesList(props) {
   
    return props.recipeHitsArray.map((item) => {
        return (
            <div>
            <div
                key={item.recipeID}
                style={{ width: 300, height: 300, display: "flex", flexDirection:"column", margin: "30px"}}
            >
                <div>
                    <img src={item.dishImg} alt={item.dishName}/>
                </div>
                <div>
                    <a href={item.recipeURL}>
                       [{props.recipeHitsArray.indexOf(item) + 1}] {item.dishName} 
                    </a>
                    
                </div>  

            </div>
            </div>
        )
    })
}

export default FavoriteRecipesList;

// RecipeList is exported and will be used in the Recipe.js file. In Recipe.js we use RecipeList as a component
//anything from Recipe.js we want to now use in RecipeList can be used as a prop here
    // for Example