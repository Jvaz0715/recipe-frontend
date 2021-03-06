import React from 'react';
import { Link } from "react-router-dom";
import "./Recipe.css";

// Using the props we passed into <RecipeList /> in Recipe.js,
// we map through the props.recipeHitsArray, and create individual "cards" that include:
    // -recipe image
    //-recipe name
    // -
function RecipeList(props) {
    
    return props.recipeHitsArray.map((item) => {
        return (
            <div
                key={props.recipeHitsArray.indexOf(item)}
                style={{ width: 300, height: 300, display: "flex", flexDirection:"column", margin: "30px", textDecoration: "none"} }
            >
                {/* we are going to use Link here, and create the route/router in our main server. A link CANNOT be used without or outside a router  */}
                <Link
                    style={{textDecoration:"none", color:"white"}}
                    to={{
                        pathname: `/recipe-detail/${item.recipe.label}`,
                        recipeID: props.recipeHitsArray[props.recipeHitsArray.indexOf(item)].recipeUriId,
                    }}
                >   
                    <div>
                        <img src={item.recipe.image} alt={item.recipe.label}/>
                    </div>
                    <div style={{ backgroundColor:"#9e2a2b"}}>
                        <p style={{ fontFamily:"georgia", fontSize:"16px", }}>[{props.recipeHitsArray.indexOf(item) + 1}] {item.recipe.label}</p>
                    </div>  

                </Link>

            </div>
        )
    })
}

export default RecipeList;

// RecipeList is exported and will be used in the Recipe.js file. In Recipe.js we use RecipeList as a component
//anything from Recipe.js we want to now use in RecipeList can be used as a prop here
    // for Example