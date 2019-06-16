import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RentListings from "./components/RentListings";
import SaleListings from "./components/SaleListings";
import SignIn from "./components/signInSignOut/SignIn";
import SignUp from "./components/signInSignOut/SignUp";
import Account from "./components/Account";

import FavPropertiesList from "./components/AccountPage/FavPropertiesList";
import SingleProperty from "./components/saleListingsPage/SingleProperty";

import Footer from "./components/Footer";

import { connect } from "react-redux";
import { saveCurrentUser } from "./actions/userActions";

class App extends Component {
  componentDidMount() {
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    if (token) {
      return fetch(apiUrl + "/user", {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.user) {
            this.props.saveCurrentUser(data.user);
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <>
        <NavBar {...this.props} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/property-for-rent/search"
            component={RentListings}
          />
          <Route
            exact
            path="/property-for-sale/search"
            component={SaleListings}
          />
          <Route
            exact
            path="/property-for-sale/search/:id"
            component={SingleProperty}
          />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/account" component={FavPropertiesList} />
        </Switch>
        <Footer {...this.props} />
      </>
    );
  }
}

export default connect(
  null,
  { saveCurrentUser }
)(withRouter(App));
