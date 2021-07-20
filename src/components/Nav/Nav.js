import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Nav.css";

export class Nav extends Component {
    render() {
        return (
            <nav className="Navbar">
                <div className="h1-logo">
                    <h1>
                        <Link to="/">Recipe Finder App</Link>
                    </h1>
                </div>
                <div className="right-side-nav">
                    <ul>
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to="/recipe">
                                    Search for Recipes
                                </NavLink>
                            ) : (
                                ""
                            )}
                        </li>
        
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to="/profile">
                                    Welcome Back - {this.props.user.email}
                                </NavLink>
                            ) : (
                                <NavLink activeClassName="selected" to="/sign-up">
                                    Sign up
                                </NavLink>
                            )}
                        </li>
            
                        <li>
                            {this.props.user ? (
                                <NavLink
                                    activeStyle={{ borderBottom: "1px solid white" }}
                                    to="/login"
                                    onClick={this.props.handleUserLogout}
                                >
                                    Logout
                                </NavLink>
                            ) : (
                                <NavLink
                                    activeStyle={{ borderBottom: "1px solid white" }}
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default Nav;