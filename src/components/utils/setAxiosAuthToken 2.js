import Axios from "./Axios";
// we bring in our Axios instance

//we createa a function that takes in our JWTToken, checks if one exists, we assign it to ou headers
const setAxiosAuthToken = (jwtToken) => {
    // if a jwt token exists, we set it as to our auth token in headers.common
    if (jwtToken) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    } else {
        // we want to account for when a token expires, or if a user logs out
        // we delete the token from our headers.common to not allow for users to stay logged in indefinitely
        delete Axios.defaults.headers.common["Authorization"];
    }
};

export default setAxiosAuthToken;

//we export setAxiosAuthToken to be used across various files in order to differentiate between a "authorized user" and a user that needs to signup or login

//we will use setAxiousAuthToken in the following:
    // -app.js
    // -Login.js
    // -checkIfUserIsAuth.js