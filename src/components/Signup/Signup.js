import React, { Component } from "react";
// import jwtDecode from "jwt-decode";
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";
import "./Signup.css";

export class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: "",
        isButtonDisabled: true,
        // we use onFocus and set to false, refer to handleInputOnFocus
        firstNameOnFocus: false,
        lastNameOnFocus: false,
        emailOnFocus: false,
        usernameOnFocus: false,
        passwordOnFocus: false,
        confirmPasswordOnFocus: false,
    };
    
    // we need to bring in our authorization check
    // REF: the checkIfUserIsAuth.js that relies on the authToken we set up in the setAxiosAuthToken.js
    //to avoid coming back to sign up page if you are logged in, we use component didmount to check if tehre is an authorized user prop
    // if tehre is one, we take them to the /movie page
    //otherwise the user will see a signup page
    componentDidMount() {
        let isAuth = checkIfUserIsAuth();

        if (isAuth) {
            this.props.history.push("/recipe");
        }
    };

    handleOnChange = (event) => {
        // this makes our inputs dynamic, so we could use one handleOnChange for all our inputs, the second argument will have more complex auth functionality
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () => {
                // here we create our if statements to validate inputs
                //the helper functions will be coded afterwards
                if ( event.target.name === "firstName" || event.target.name === "lastName") {
                    this.handleFirstNameAndLastNameInput(event);
                }
          
                if (event.target.name === "email") {
                    this.handleEmailInput();
                }
          
                if (event.target.name === "username") {
                    this.handleUsernameInput();
                }
                  
                if (event.target.name === "password") {
                    this.handlePasswordInput();
                }
          
                if (event.target.name === "confirmPassword") {
                    this.handleConfirmPasswordInput();
                }
            }
        );
    };

    handleFirstNameAndLastNameInput = (event) => {
        //if there is actual input in the field, we proceed to the next auth step
        if(this.state[event.target.name].length > 0) {
            // if there is input, we check if the input for first or last name is isAlpha(only letters)
            if(isAlpha(this.state[event.target.name])) {
                // if the names are good, we dont need any errormessages in our state
                this.setState({
                    [`${event.target.name}Error`]: "",
                })
            } else {
                //if the names do not pass our tests, we make a dynamic errormessage, we also keep our button disabled so the user cannot even try to submit faulty information
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
                    isButtonDisabled: true,
                  }); 
            };

        } else {
            //if there is nothing in the first or last name inputs, we disable our button and send a message that these inputs cannot be empty
            this.setState({
                [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
                isButtonDisabled: true,
            });
        }
    };

    //we create this function  to validate username input
    handleUsernameInput = () => {
        if (this.state.username.length === 0) {
            this.setState({
                usernameError: "Username cannot be empty",
                isButtonDisabled: true,
            });
        } else {
            if (isAlphanumeric(this.state.username)) {
                this.setState({
                    usernameError: "",
                });
            } else {
                this.setState({
                    usernameError: "Username can only have alphabet and number",
                    isButtonDisabled: true,
                });
            }
        }
    };

    //we create this function  to validate proper email input
    handleEmailInput = () => {
        if (this.state.email.length === 0) {
            this.setState({
                emailError: "Email cannot be empty",
                isButtonDisabled: true,
            });
        } else {
            if (isEmail(this.state.email)) {
                this.setState({
                    emailError: "",
                });
            } else {
                this.setState({
                    emailError: "Please, enter a valid email!",
                    isButtonDisabled: true,
            });
            }
        }
    };
    
    //we create this function  to validate username input
    handleUsernameInput = () => {
        if (this.state.username.length === 0) {
            this.setState({
                usernameError: "Username cannot be empty",
                isButtonDisabled: true,
            });
        } else {
            if (isAlphanumeric(this.state.username)) {
                this.setState({
                    usernameError: "",
                });
            } else {
                this.setState({
                    usernameError: "Username can only have alphabet and number",
                    isButtonDisabled: true,
                });
            }
        }
    };

    //we create this function  to validate proper password input and that confirm and password match
    handlePasswordInput = () => {
        if (this.state.confirmPasswordOnFocus) {
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({
                    confirmPasswordError: "Password does not match",
                    isButtonDisabled: true,
                });
            } else {
                this.setState({
                    confirmPasswordError: "",
                });
            } 
        }

        if (this.state.password.length === 0) {
            this.setState({
                passwordError: "Password cannot be empty",
                isButtonDisabled: true,
            });
        } else {
            if (isStrongPassword(this.state.password)) {
                this.setState({
                    passwordError: "",
                });
            } else {
                this.setState({
                    passwordError: "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimum of 8 charactors long",
                    isButtonDisabled: true,
                });
            }
        }
    };
  
    //we create this function  to validate proper password input and that confirm and password match
    handleConfirmPasswordInput = () => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                confirmPasswordError: "Password does not match!",
                isButtonDisabled: true,
            });
        } else {
            this.setState({
                confirmPasswordError: "",
            });
        }
    };

    //handleonsubmit will be applied to our signup button
    handleOnSubmit = async (event) => {
        //this will prevent browser from refreshing and losing data
        event.preventDefault();

        try {
            //will serve as second argment in our axios.post(url, userinputobj)
            let userInputObj = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            };
        
            //get the .post url from back end to match, second argument will serve as the req.body, and we create a new user in our database
            let success = await Axios.post("/api/user/sign-up", userInputObj);
            console.log(success);
            //toast message card for success
            toast.success(`${success.data.message}`);
            this.props.history.push("/recipe");
        } catch (e) {
            //toast message card for error
            toast.error(`${e.response.data.message}`);
        }
    };

    //handleonblur will run if we click in an input field, do not type anything, and click off the input field
    handleOnBlur = (event) => {
        // console.log(event.target.name);
        // console.log("handle onBlur Triggered");

        if (this.state[event.target.name].length === 0) {
            this.setState({
                [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
            });
        }
    };

    /* compondentDidUpdate: if we know each input is being touched or focused on, we then make sure there are no errors, then we could make buttondisabled to false. we wnat to make sure each field was touched and that the inputs do not have an error message, we bring the button up*/
    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.isButtonDisabled);
         //if prevState.isButtonDisabled is true then we run function. Otherwise we will end up in an infinite loop, if at anypoint an errormessage is applied to any input field, this will set buttonDisabled to true
        if (prevState.isButtonDisabled === true) {
            if (
                this.state.firstNameOnFocus &&
                this.state.lastNameOnFocus &&
                this.state.emailOnFocus &&
                this.state.usernameOnFocus &&
                this.state.passwordOnFocus &&
                this.state.confirmPasswordOnFocus
            ) {
                if (
                    this.state.firstNameError.length === 0 &&
                    this.state.lastNameError.length === 0 &&
                    this.state.usernameError.length === 0 &&
                    this.state.emailError.length === 0 &&
                    this.state.passwordError.length === 0 &&
                    this.state.confirmPasswordError.length === 0 &&
                    //we also need to make sure the password and confirm password match
                    this.state.password === this.state.confirmPassword
                ) {
                    this.setState({
                        isButtonDisabled: false,
                    });
                }
            }
        }
    };

  //this will handle the toggle of being in an input field or not
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

    render() {
       
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            firstNameError,
            lastNameError,
            usernameError,
            emailError,
            passwordError,
            confirmPasswordError,
        } = this.state;
        //we bring in our state object in order to use it in our "html"
        
        return (
            <div className="container">
            <div className="form-text"><p>Sign up</p></div>
    
            <div className="form-div">
              <form className="form" onSubmit={this.handleOnSubmit}>
                <div className="form-group-inline">
                  <div className="inline-container">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      placeholder="First Name"
                      name="firstName"
                      onChange={this.handleOnChange}
                      autoFocus
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">
                      {firstNameError && firstNameError}
                    </div>
                  </div>
    
                  <div className="inline-container">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      placeholder="Last Name"
                      name="lastName"
                      onChange={this.handleOnChange}
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">
                      {lastNameError && lastNameError}
                    </div>
                  </div>
                </div>
    
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.handleOnChange}
                      name="email"
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">{emailError && emailError}</div>
                  </div>
                </div>
    
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      placeholder="Username"
                      onChange={this.handleOnChange}
                      name="username"
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">
                      {usernameError && usernameError}
                    </div>
                  </div>
                </div>
    
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      id="password"
                      value={password}
                      placeholder="Password"
                      onChange={this.handleOnChange}
                      name="password"
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">
                      {passwordError && passwordError}
                    </div>
                  </div>
                </div>
    
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="text"
                      id="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={this.handleOnChange}
                      name="confirmPassword"
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">
                      {confirmPasswordError && confirmPasswordError}
                    </div>
                  </div>
                </div>
    
                <div className="button-container">
                  <button type="submit" disabled={this.state.isButtonDisabled}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
    }
}

export default Signup;
