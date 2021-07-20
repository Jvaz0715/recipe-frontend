import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Footer.css";

export class Footer extends Component {
    render() {
        return (
            <nav className="Footer">
                <div className="h1-logo">
                    {/* <h1>
                        <Link to="/">Edamam API Documentation</Link>
                    </h1> */}
                </div>
                <div className="right-side-nav">
                    <ul>
                        <li>
                            <a activeClassName="selected" href="https://developer.edamam.com/?gclid=Cj0KCQjw6NmHBhD2ARIsAI3hrM12yfymRj-OKp8o8rILKEzIPo5Pm5qP-SuRdtdjr_PRqEf1vWhPG-gaAlTyEALw_wcB">
                                Edamam API Documentation
                            </a>
                        </li>
        
                        <li>
                            © Copyright 2021
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default Footer;