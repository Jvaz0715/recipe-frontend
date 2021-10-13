import axios from "axios";

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "deploy CLOUD ADDRESS",
  timeout: 50000,
});

export default Axios;

/* 
we are creating an axios instance. We use the .create documentation. our NODE_ENV is in ,/env.

our NODE_ENV will dictate if we are in development mode (what we want to be on) or production mode (what a user will see when app is ran).

*/