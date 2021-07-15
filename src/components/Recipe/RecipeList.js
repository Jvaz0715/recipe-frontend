// import React, { Component } from 'react';
// import { Link } from "react-router-dom";


function RecipeList(props) {
    // console.log("props array")
    // console.log(props.recipeHitsArray)
    // console.log("this is the recipe object")
    // console.log(props.recipeHitsArray[0].recipe)

    // for (let i = 0; i < props.recipeHitsArray.length; i++) {
    //     // console.log("this is the recipename")
    //     console.log(props.recipeHitsArray[i].recipe.label)
    //     console.log(i)
    // }
    // console.log("this is the recipe name")
    // console.log(props.recipeHitsArray[0].recipe.label)
    // console.log("this is the recipe image url")
    // console.log(props.recipeHitsArray[0].recipe.image)

    // return null;
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