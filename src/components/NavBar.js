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
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper grey lighten-3">
            <div className="container">
              <Link to={"/"} className="brand-logo teal-text text-lighten-1">
                <i className="material-icons">home</i>MoveRight
              </Link>
              <a href="/" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons grey-text text-darken-3">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link
                    className={textColorClass}
                    to={"/property-for-rent/search"}
                  >
                    Rent
                  </Link>
                </li>
                <li>
                  <Link
                    className={textColorClass}
                    to={"/property-for-sale/search"}
                  >
                    Buy
                  </Link>
                </li>
                <li>
                  <Link
                    className={textColorClass}
                    to={"/property-for-sale/search"}
                  >
                    New Homes
                  </Link>
                </li>
                <li>
                  {this.props.currentUser ? (
                    <Link className={textColorClass} to={"/account"}>
                      <i className="material-icons right">face</i>
                      My MoveRight
                    </Link>
                  ) : (
                    <Link className={textColorClass} to={"/signin"}>
                      <i className="material-icons right">person_pin</i>Sign In
                    </Link>
                  )}
                </li>
                {this.props.currentUser && (
                  <li onClick={this.signOut}>
                    <a className={textColorClass} href="#">
                      <i className="material-icons right">exit_to_app</i>
                      Sign Out
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link className={textColorClass} to={"/property-for-rent/search"}>
              Rent
            </Link>
          </li>
          <li>
            <Link className={textColorClass} to={"/property-for-sale/search"}>
              Buy
            </Link>
          </li>
          <li>
            <Link className={textColorClass} to={"/property-for-sale/search"}>
              New Homes
            </Link>
          </li>
          <li>
            {this.props.currentUser ? (
              <Link className={textColorClass} to={"/account"}>
                <i className="material-icons right">face</i>
                My MoveRight
              </Link>
            ) : (
              <Link className={textColorClass} to={"/signin"}>
                <i className="material-icons right">person_pin</i>Sign In
              </Link>
            )}
          </li>
          {this.props.currentUser && (
            <li onClick={this.signOut}>
              <a className={textColorClass} href="#">
                <i className="material-icons right">exit_to_app</i>
                Sign Out
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const textColorClass = "grey-text text-darken-3";

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveCurrentUser }
)(NavBar);
