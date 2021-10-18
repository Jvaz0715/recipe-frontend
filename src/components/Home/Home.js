import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-body-div">
          <div className="home-images-container">
            <img src="https://www.freepnglogos.com/uploads/chef-png/chef-sitar-knoxville-authentic-indian-restaurant-29.png" alt="cartoon-chef"/>
          </div>
          <div className="home-app-description-container">
            <div className="description-div">
              <div className="description-text">
                <h1>Recipe Finder App</h1>
                <br/>
                <p>
                  Welcome to this recipe finder application powered by Edamame. To use our service, please sign up or log in below.
                </p>
              </div>
              <p>New users <Link to="/sign-up" className="home-links">click here</Link></p>
              <p>Members <Link to="/login" className="home-links">click here</Link></p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;

/*

This serves as our home page

*/