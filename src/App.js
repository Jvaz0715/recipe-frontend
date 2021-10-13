import React, { Component } from 'react';
import { ToastContainer } from "react-toastify"; //gives us our success or error message cards
import jwtDecode from "jwt-decode"; //helps decode token for use in functions

import MainRouter from "./MainRouter";

import setAxiosAuthToken from "./components/utils/setAxiosAuthToken";
import "./App.css";

export class App extends Component {
  
  state = {
    user: null,
    // we set a null user that will change on whetehr or not a authorized user is signed up or logged in
  };

  //if we have an active token on did mount, we are logged in, else we will be taken to the login page
  componentDidMount() {
    //we assign our token from localstorage to a variable getJwtToken
    let getJwtToken = window.localStorage.getItem("jwtToken");
    // if there is a token
    if (getJwtToken) {
      //we need current time to compare to exp time of token for proper auto logout
      //currentTime will be the time when browser is active
      const currentTime = Date.now() / 1000;
      //we use decode to decode the JwtToken we got from our localStorage
      let decodedJWTToken = jwtDecode(getJwtToken);
      //if the exp time is less than the currenttime, we run our logout function
      if (decodedJWTToken.exp < currentTime) {
        //logout
        this.handleUserLogout();
      } else {
        //else we we will be logged in
        //login
        this.handleUserLogin(decodedJWTToken);
      }
    }
  };
  
  //we use this function to check if user is TRUE, than we set an email for the user (login email)
  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
      },
    });
  };

  //we use this function to check if user is null or false, and if there is no user, there is no user.email that will validate being logged in,
  //we do this by REMOVING our jwtToken from localStorage
  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken");
    setAxiosAuthToken(null);
    this.setState({
      user: null,
    });
  };
  //we render from <mainrouter component to allow for the logged in or out functioanlity. MainRouter.js provides what we need for the mainrouter div below

  render() {
    return (
      <>
        <ToastContainer position="top-center" />

        <MainRouter 
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </>
    )
  }
}

export default App;
