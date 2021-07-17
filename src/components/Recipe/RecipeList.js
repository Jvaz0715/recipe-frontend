import React from 'react';
import { Link } from "react-router-dom";

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
                style={{ width: 300, height: 300, display: "flex", flexDirection:"column", margin: "30px"}}
            >
                {/* we are going to use Link here, and create the route/router in our main server. A link CANNOT be used without or outside a router  */}
                <Link
                    to={{
                        pathname: `/recipe-detail/${item.recipe.label}`
                    }}
                >
                    <div>
                        <img src={item.recipe.image} alt={item.recipe.label}/>
                    </div>
                    <div>
                        {item.recipe.label}
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