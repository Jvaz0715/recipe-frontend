import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";

const PrivateRoute = ({ component: Component, handleUserLogout, ...rest }) => {
    
    return (
      <Route
        {...rest}
        render={(routerProps) =>
          //we use our imported function to check if user is authorized
          checkIfUserIsAuth() ? (
            //if user is authorized we use spread operator and get routerProps
            <Component {...routerProps} handleUserLogout={handleUserLogout} />
          ) : (
            // we use react-router-dom Redirect property to redirect to the login page if trying to hard code /movie url without logging in
            <Redirect to="/login" />
          )
        }
      />
    );
};
  
export default PrivateRoute;

/* 

Because we need to differentiate who may access specific pages such as /movie (we want people to have to sign up to use our app), we create a private route that will only function if a user is properly logged in.

*/
