import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <footer className="page-footer grey lighten-3">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <Link to={"/"}>
                  <h5 className={headingColorClass}>Our Mission</h5>
                </Link>
                <p className={textColorClass}>
                  We've created a new tool to help you easily find the areas
                  that match your budget and needs.
                </p>
              </div>
              <div className="col l2 s12">
                <h5 className={headingColorClass}>Resources</h5>
                <ul>
                  <li>
                    <a className={textColorClass} href="/">
                      Where can I live?
                    </a>
                  </li>
                  <li>
                    <a
                      className={textColorClass}
                      href="https://www.rightmove.co.uk/advice/buyer/mortgage-calculator/#mortgage-repayment"
                    >
                      Mortgage calculator
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Rent Advice
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Sell Advice
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l2 s12">
                <h5 className={headingColorClass}>MoveRight</h5>
                <ul>
                  <li>
                    <a className={textColorClass} href="/">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Help
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l2 s12">
                <h5 className={headingColorClass}>Site Info</h5>
                <ul>
                  <li>
                    <a
                      className={textColorClass}
                      href="https://www.termsofusegenerator.net/live.php?token=Nnfq7ft8o0ahfeDJrj3WYhAEuS5Vb2Iv"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a className={textColorClass} href="/">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className={`container left ${textColorClass}`}>
              © 2019 RightMove Copyright
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const textColorClass = "grey-text text-darken-3";
const headingColorClass = "teal-text text-lighten-1";

export default Footer;
