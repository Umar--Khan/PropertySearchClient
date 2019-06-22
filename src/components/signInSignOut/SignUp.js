import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";

import { saveCurrentUser } from "../../actions/userActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    postcode: "",
    firstname: "",
    lastname: "",
    errors: "Invalid Email"
  };

  handleOnChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  updateUser = e => {
    e.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const postcode = this.state.postcode;

    this.createUser(email, password, firstname, lastname, postcode);
  };

  createUser = (email, password, firstname, lastname, postcode) => {
    const apiUrl = "http://localhost:3001/api";

    return fetch(apiUrl + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          postcode: postcode
        }
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

  handleGoogleSearchTerm = search => {
    this.setState({ postcode: search.formatted_address });
  };

  render() {
    return (
      <div
        className="container"
        style={{ marginTop: "5rem", minHeight: "51rem" }}
      >
        <div className="row">
          <div className="col l6 s12 m6">
            <h4 className="center">Sign Up</h4>
            <form className="col s12" onSubmit={this.updateUser}>
              <div className="input-field col s12">
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  onChange={this.handleOnChange}
                  required
                />
                <label htmlFor="firstname">Firstname</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  onChange={this.handleOnChange}
                  required
                />
                <label htmlFor="lastname">Lastname</label>
              </div>
              <div
                className="input-field col s12"
                style={{ marginBottom: "0rem" }}
              >
                <input
                  id="email_inline"
                  type="email"
                  name="email"
                  className="validate"
                  onChange={this.handleOnChange}
                  required
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
                  name="password"
                  className="validate"
                  onChange={this.handleOnChange}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <Autocomplete
                  style={{ width: "100%" }}
                  onPlaceSelected={place => {
                    this.handleGoogleSearchTerm(place);
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "gb" }}
                />
              </div>
              <div className="center">
                <button
                  type="submit"
                  className="waves-effect waves-light btn"
                  id="create_account"
                  style={{ marginTop: "1rem" }}
                >
                  Create a Account
                </button>
              </div>
            </form>
          </div>

          <div className="col l6 s12 m6">
            <div className="center" style={{ marginTop: "10rem" }}>
              <h5 style={{ minHeight: "3rem" }}>With a account you can:</h5>
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
              <Link to={"/signin"}>
                <button className="waves-light btn">
                  Already Have A Account?
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
)(SignUp);
