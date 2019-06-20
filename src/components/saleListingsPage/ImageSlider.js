import React, { Component } from "react";
import M from "materialize-css";
import "./ImageSlider.css";

class ImageSlider extends Component {
  componentDidMount() {
    const options = { interval: 10000000000 };
    const elems = document.querySelectorAll(".slider");
    M.Slider.init(elems, options);
    const elems2 = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(elems2);
  }

  moveNext = e => {
    e.preventDefault();
    const elems = document.querySelector(".slider");
    const moveRight = M.Slider.getInstance(elems);
    moveRight.next(1);
  };

  movePrevious = e => {
    e.preventDefault();

    const elems = document.querySelector(".slider");
    const moveLeft = M.Slider.getInstance(elems);
    moveLeft.prev(1);
  };

  render() {
    return (
      <div className="row">
        <div className="slider">
          <ul className="slides">
            {this.props.images.map((pics, i) => {
              return (
                <li key={i}>
                  <img
                    src={pics.path}
                    alt={pics.caption}
                    className="materialboxed"
                  />
                </li>
              );
            })}
          </ul>
          <div className="col s12" style={{ pointerEvents: "all" }}>
            <a href="#" onClick={this.movePrevious}>
              <i className="material-icons medium">keyboard_arrow_left</i>
            </a>
            <a href="#" onClick={this.moveNext} style={{ float: "right" }}>
              <i className="material-icons medium">keyboard_arrow_right</i>
            </a>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default ImageSlider;
