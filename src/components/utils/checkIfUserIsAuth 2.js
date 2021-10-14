import jwtDecode from "jwt-decode";
// we need decode as the jwt token will be returned cloaked
import setAxiosAuthToken from "./setAxiosAuthToken";
// we bring in the setAxiosAuthToken function

//we create our checkIFUserIsAuth function that will use our imported setAxiosAuthToken within it

const checkIfUserIsAuth = () => {
    let getJwtToken = window.localStorage.getItem("jwtToken");
    //if a token exists, we check if it is expired or active
    if (getJwtToken) {
        const currentTime = Date.now() / 1000;
        let decodedToken = jwtDecode(getJwtToken);

        if (decodedToken.exp < currentTime) {
            //if our token is expired, we set the token to null which will bring user to the signup page
            setAxiosAuthToken(null);
            return false;
        } else {
            setAxiosAuthToken(getJwtToken);
            return true;
        }
    } else {
        return false;
    };
};

export default checkIfUserIsAuth;

/*

In order to use less code, we created one function that will check if a user is not only authorized, but actively has a token for login

our token will either be expired, or active.

we will use this function across various other components

*/