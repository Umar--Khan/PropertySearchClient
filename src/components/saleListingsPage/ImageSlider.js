import React, { Component } from "react";
import M from "materialize-css";

class ImageSlider extends Component {
  componentDidMount() {
    const options = { indicators: false };
    const elems = document.querySelectorAll(".slider");
    let instances = M.Slider.init(elems);
  }
  render() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="slider">
          <ul className="slides">
            {this.props.images.map((pics, i) => {
              return (
                <li key={i}>
                  <img src={pics.path} alt={pics.caption} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ImageSlider;
