import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div id="searchBar">
        <form className="form-a">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="form-group">
                <label htmlFor="Type">Keyword</label>
                <input
                  type="text"
                  className="form-control form-control-lg form-control-a"
                  placeholder="Keyword"
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="bedrooms"
                >
                  <option>No min</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="form-group">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="propertyType"
                >
                  <option>All</option>
                  <option>Houses</option>
                  <option>Flats</option>
                  <option>Farm/Land</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="form-group">
                <label htmlFor="price">Min Price</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="price"
                >
                  <option>No Min</option>
                  <option>$50,000</option>
                  <option>$100,000</option>
                  <option>$150,000</option>
                  <option>$200,000</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="form-group">
                <label htmlFor="price">Max Price</label>
                <select
                  className="form-control form-control-lg form-control-a"
                  id="price"
                >
                  <option>No Max</option>
                  <option>$50,000</option>
                  <option>$100,000</option>
                  <option>$150,000</option>
                  <option>$200,000</option>
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <button type="submit" className="btn btn-b">
                Search For Rent
              </button>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-b">
                Search For Sale
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
