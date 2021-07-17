// import React, { Component } from 'react';
// import { Link } from "react-router-dom";


function RecipeList(props) {
    
    return props.recipeHitsArray.map((item) => {
        return (
            <div
                key={props.recipeHitsArray.indexOf(item)}
                style={{ width: 300, height: 300, display: "flex", flexDirection:"column", margin: "30px"}}
            >
                <div>
                    <img src={item.recipe.image} alt={item.recipe.label}/>
                </div>
                <div>
                    {item.recipe.label}
                </div>

            </div>
        )
    })
}

export default RecipeList;


//how to get the image
// props.recipeHitsArray[0].recipe.image