import React, { Component } from 'react';


export class RecipeDetail extends Component {
//    fetchRecipe = async () => {
//        try {
//         console.log("this.props in recipe detail");
//         console.log(this.props)
//        } catch (e) {
//            console.log(e);
//        }
//    }


    

    render() {
        console.log(this.props.location.recipeID)
        return (
            
            <div>
                Hello, This will be the recipe page
            </div>
        )
    }
}

export default RecipeDetail;

// We are going to export RecipeDetail that will be used in our Main Router