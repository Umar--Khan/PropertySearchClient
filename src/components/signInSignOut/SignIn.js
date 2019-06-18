import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { saveCurrentUser } from "../../actions/userActions";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: "Invalid Email"
  };

  componentDidUpdate() {
    if (this.props.token) {
      localStorage.setItem("token", this.props.token);
    }
  }

  handleOnChange = e => {
    const { value, type } = e.target;

    this.setState({ [type]: value });
  };

  updateUser = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    this.signInUser(email, password);
  };

  signInUser = (email, password) => {
    const apiUrl = "http://localhost:3001/api";

    return fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        user: { email: email, password: password }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.user) {
          this.props.saveCurrentUser(data.user);
          localStorage.setItem("token", data.user.token);
          this.props.history.push("/");
        } else if (data.errors) {
          this.setState(
            { errors: `Email ${data.errors.email}` },
            () =>
              (document.querySelector("#email_inline").className =
                "validate invalid")
          );
        }
      });
  };

  render() {
    return (
      <div className="container valign-wrapper" style={{ minHeight: "40rem" }}>
        <div className="row">
          <div className="col l6 m6 s12">
            <div className="center">
              <h4>Sign In</h4>
            </div>
            <form className="col s12 l12 m12" onSubmit={this.updateUser}>
              <div className="input-field col s12">
                <input
                  id="email_inline"
                  type="email"
                  className="validate"
                  onChange={this.handleOnChange}
                />
                <label htmlFor="email_inline">Email</label>
                <span
                  className="helper-text"
                  data-error={this.state.errors}
                  data-success="Correct"
                />
              </div>

              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  onChange={this.handleOnChange}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="center">
                <button
                  type="submit"
                  className="waves-effect waves-light btn"
                  id="create_account"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="col l6 s12 m6">
            <div className="center">
              <h4 style={{ minHeight: "3rem" }}>New to MoveRight?</h4>
              <h5 style={{ minHeight: "3rem" }}>
                Create a account so you can:
              </h5>
              <ul>
                <li style={{ minHeight: "3rem" }}>
                  <i className="material-icons">save</i> Save Properties
                </li>
                <li style={{ minHeight: "3rem" }}>
                  <i className="material-icons">search</i>Create & save your own
                  search areas
                </li>
                <li style={{ minHeight: "3rem" }}>
                  <i className="material-icons">bubble_chart</i>Let us recommend
                  you some properties
                </li>
              </ul>
            </div>
            <div className="center">
              <Link to={"/signup"}>
                <button className="waves-effect waves-light btn">
                  Create a Account
                </button>
              </Link>
            </div>
          </div>
        </div>
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
)(SignIn);
