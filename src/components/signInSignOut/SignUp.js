import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { saveTokenUser, updateSignStatus } from "../../actions/userActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    errors: "Invalid Email"
  };

  handleOnChange = e => {
    const { value, type } = e.target;

    this.setState({ [type]: value });
  };

  updateUser = e => {
    e.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    this.createUser(email, password);
  };

  createUser = (email, password) => {
    const apiUrl = "http://localhost:3001/api";

    return fetch(apiUrl + "/users", {
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
          this.props.saveTokenUser(data.user.token);
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
      <div className="container">
        <div className="col s12">
          <h4 className="center">Sign Up</h4>
        </div>
        <div className="col s8 offset-s2">
          <form className="col s12" onSubmit={this.updateUser}>
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
            <button
              type="submit"
              className="waves-effect waves-light btn"
              id="create_account"
            >
              Sign Up
            </button>
          </form>
          <Link to={"/signup"}>
            <button
              className="waves-effect waves-light btn"
              id="already_account"
            >
              Already Have A Account?
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

export default connect(
  mapStateToProps,
  { saveTokenUser, updateSignStatus }
)(SignUp);
