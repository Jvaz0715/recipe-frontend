import React, { Component } from "react";
import { isEmpty, /*isEmail*/ } from "validator"; 
// we use validator for validation of inputs

import jwtDecode from "jwt-decode";
// we use this to decode our jwt tokens
import { toast } from "react-toastify";
//for success or error message cards
import Axios from "../utils/Axios";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";
import setAxiosAuthToken from "../utils/setAxiosAuthToken";

import "./Login.css";
export class Login extends Component {
  state = {
    email: "",
    emailError: "",
    emailOnFocus: false,
    password: "",
    passwordError: "",
    passwordOnFocus: false,
    canSubmit: true,
  };
  // using our imported checkIfUserIsAuth function, we check to see if a user is logged in
  // if they are logged in, we take them to the /movie page
  componentDidMount() {
    let isAuth = checkIfUserIsAuth();

    if (isAuth) {
      this.props.history.push("/recipe");
    }
  }

  //checks for inputfields not being empty and indeed being valid
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              emailError: "",
            });
          }
        }

        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };
  //we use componenetDidUpdate to avoid putting our submit toggle in the handleonchange
  // if in handleonchange, the button would be true because without anything typed into our input fields, we technically dont have error messages.
  //component will run if update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.canSubmit === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0
        ) {
          this.setState({
            canSubmit: false,
          });
        } else {
          this.setState({
            canSubmit: true,
          });
        }
      }
    }
  };


  //this toggles if an input field is clicked on
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };


  //handleOnSubmit serves as our click function for login button
  handleOnSubmit = async (event) => {
    //prevents the page from continuously refreshing
    event.preventDefault();

    
    try {
      //referencing our backend, we see what key/value pairs we need 
      let result = await Axios.post("/api/user/login", {
        email: this.state.email,
        password: this.state.password,
      });
      // we declare a jwtToken that is yet to be decoded
      let jwtToken = result.data.payload;

      // console.log(jwtToken);

      setAxiosAuthToken(jwtToken)
      //we decode the above token
      let decodedToken = jwtDecode(jwtToken);
      // console.log(decodedToken);

      //we pass decoded token to our userlogin function
      this.props.handleUserLogin(decodedToken);
      // we set the jwt token to localstorage for use in our browser
      window.localStorage.setItem("jwtToken", jwtToken);
      //we provide a toast message card
      toast.success("Login success!");
      //if login is successful, we take the user to the /movie url
      this.props.history.push("/recipe");
    } catch (e) {
      //we create error message cards for a 429 error or any other error
      if (e.response.status === 429) {
        toast.error(e.response.data);
      } else {
        toast.error(e.response.data.payload);
      }
    }
  };

  render() {
    const { email, emailError, password, passwordError, canSubmit } =
      this.state;

    //console.log(this.props);

    return (
      <div className="container">
        <div className="form-text"><p>Login</p></div>

        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  autoFocus
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onFocus={this.handleInputOnFocus}
                  onChange={this.handleOnChange}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={canSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
