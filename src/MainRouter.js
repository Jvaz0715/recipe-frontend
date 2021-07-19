import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// bring in the components that will need routes using react-router-dom
import Signup from "./components/Signup/Signup";
import Recipe from "./components/Recipe/Recipe";
import RecipeDetail from "./components/Recipe/RecipeDetail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (/*props will go here once we make private routes. props will be coming from App.js */) => {
    //in here we make a <Router> Which will encompass the routes, and later the private routes, to get to our componenets</Router>
    // Router comes in from react-router-dom
    return (
        <Router>
          <>  
            <Route
                exact path="/" component={Signup}
            />
             <Route
                exact path="/sign-up" component={Signup}
            />

            {/* we apply privateroute to our recipe page */}
            <PrivateRoute
                exact path="/recipe" component={Recipe}
            />

            {/* we apply privateroute to our recipeDetail page */}
            <PrivateRoute
                exact path="/recipe-detail/:recipeLabel" component={RecipeDetail}
            />
          </>
        </Router>   
    )
    
}

export default MainRouter;

// we will export MainRouter to App.js for use. Right now it doesnt make sense to have a mainrouter because we are making our links public for testing purposes;
    //however as we make our page an auth page, we will need to do our private router stuff here