import React, { Component } from "react";
import { connect } from "react-redux";

import { updatePageNumber } from "../../actions/searchActions";

class Pagination extends Component {
  handleChange = e => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const { value } = e.target;
    this.props.updatePageNumber(value);
  };

  handleMaxPage = () => {
    console.log(this.props.maxResultsNumber);
    if (this.props.data) {
      const max = Math.ceil(
        this.props.data.count / this.props.maxResultsNumber
      );

      return max;
    }
  };

  checkLength = e => {
    const max = Math.ceil(
      parseInt(this.props.data.count) / parseInt(this.props.maxResultsNumber)
    );

    if (e.target.value > max) {
      e.target.value = max;
    }
  };

  firstPage = () => {
    this.props.updatePageNumber("1");
  };

  lastPage = () => {
    const max = Math.ceil(
      parseInt(this.props.data.count) / parseInt(this.props.maxResultsNumber)
    );
    this.props.updatePageNumber(`${max}`);
  };

  nextPage = () => {
    let next = parseInt(this.props.pageNumber);
    this.props.updatePageNumber(`${next + 1}`);
  };

  previousPage = () => {
    let previous = parseInt(this.props.pageNumber);
    this.props.updatePageNumber(`${previous - 1}`);
  };

  render() {
    if (this.props.data.results) {
      console.log(this.props.data.results[0]);
    }
    return (
      <>
        {this.props.data && (
          <div className="container center">
            <div className="row center-align">
              <div className="col l2 m2 offset-l1">
                <a href="#" className="black-text" onClick={this.firstPage}>
                  <i className="material-icons prefix">first_page</i>
                </a>
              </div>
              <div className="col l2 m2 s2">
                <a href="#" className="black-text" onClick={this.previousPage}>
                  <i className="material-icons prefix">navigate_before</i>
                </a>
              </div>

              <div className="input-field col s2 l2 m2" style={{ margin: "0" }}>
                <i className="material-icons prefix">find_in_page</i>
                <input
                  id="icon_telephone"
                  type="number"
                  className="validate center"
                  min="1"
                  //   defaultValue="1"
                  onChange={this.handleChange}
                  max={this.handleMaxPage()}
                  onInput={this.checkLength}
                  value={this.props.pageNumber}
                />
              </div>

              <div className="col l2 m2 s2">
                <a href="#" className="black-text" onClick={this.nextPage}>
                  <i className="material-icons prefix">navigate_next</i>
                </a>
              </div>
              <div className="col l2 m2 s2">
                <a href="#" className="black-text" onClick={this.lastPage}>
                  <i className="material-icons prefix">last_page</i>
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.search.data,
  pageNumber: state.search.pageNumber,
  maxResultsNumber: state.search.maxResultsNumber
});

export default connect(
  mapStateToProps,
  { updatePageNumber }
)(Pagination);
