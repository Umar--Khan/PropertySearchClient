import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { saveCurrentUser } from "../actions/userActions";

import M from "materialize-css";

class NavBar extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    const elems2 = document.querySelectorAll(".modal");
    M.Modal.init(elems2);
  }

  signOut = () => {
    this.props.saveCurrentUser("");
    localStorage.removeItem("token");
  };

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
                  <Link to={"/property-for-rent/search"}>Rent</Link>
                </li>
                <li>
                  <Link to={"/property-for-sale/search"}>Buy</Link>
                </li>
                <li>
                  {this.props.currentUser ? (
                    <Link to={"/account"}>
                      <i className="material-icons right">face</i>
                      My MoveRight
                    </Link>
                  ) : (
                    <Link to={"/signin"}>
                      <i className="material-icons right">person_pin</i>Sign In
                    </Link>
                  )}
                </li>
                {this.props.currentUser ? (
                  <li onClick={this.signOut}>
                    <a href="#">
                      <i className="material-icons right">exit_to_app</i>
                      Sign Out
                    </a>
                  </li>
                ) : (
                  <> </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to={"/property-for-rent/search"}>Rent</Link>
          </li>
          <li>
            <Link to={"/property-for-sale/search"}>Buy</Link>
          </li>
          <li>
            {this.props.currentUser ? (
              <Link to={"/account"}>
                <i className="material-icons right">face</i>
                Account
              </Link>
            ) : (
              <Link to={"/signin"}>
                <i className="material-icons right">person_pin</i>Sign In
              </Link>
            )}
          </li>
          {this.props.currentUser ? (
            <li onClick={this.signOut}>
              <a href="#">
                <i className="material-icons right">exit_to_app</i>
                Sign Out
              </a>
            </li>
          ) : (
            <> </>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveCurrentUser }
)(NavBar);
