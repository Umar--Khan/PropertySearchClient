import React, { Component } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";

class NavBar extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll(".sidenav");
    return M.Sidenav.init(elems);
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className="container">
              <Link to={"/"} className="brand-logo">
                <i className="material-icons">home</i>MoveRight
              </Link>
              <a href="/" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to={"/property-to-rent/search"}>Rent</Link>
                </li>
                <li>
                  <Link to={"/property-to-sell/search"}>Buy</Link>
                </li>
                <li>
                  <a href="badges.html">
                    <i className="material-icons right">person_pin</i>Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="sass.html">Rent</a>
          </li>
          <li>
            <a href="badges.html">Buy</a>
          </li>
          <li>
            <a href="collapsible.html">Contact Us</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
