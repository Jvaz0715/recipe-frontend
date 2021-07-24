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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tristique et egestas quis ipsum suspendisse. Gravida quis blandit turpis cursus in hac habitasse platea. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Adipiscing commodo elit at imperdiet dui. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Feugiat vivamus at augue eget arcu dictum varius. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Leo vel fringilla est ullamcorper. Non odio euismod lacinia at quis risus. Eget nunc scelerisque viverra mauris in aliquam sem fringilla. Tortor aliquam nulla facilisi cras fermentum odio eu.
                </p>
              </div>
              <p>New users <Link to="/sign-up">click here</Link></p>
              <p>Members <Link to="/login">click here</Link></p>
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