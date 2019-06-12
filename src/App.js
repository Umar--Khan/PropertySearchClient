import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RentListings from "./components/RentListings";
import SaleListings from "./components/SaleListings";
import SignIn from "./components/signInSignOut/SignIn";
import SignUp from "./components/signInSignOut/SignUp";

import Footer from "./components/Footer";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
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
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
        <Footer {...this.props} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

export default connect(
  mapStateToProps,
  null
)(withRouter(App));
