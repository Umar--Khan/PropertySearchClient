import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <Link to={"/"}>
                  <h5 className="white-text">MoveRight</h5>
                </Link>
                <p className="grey-text text-lighten-4">
                  We've created a new tool to help you easily find the areas
                  that match your budget and needs.
                </p>
              </div>
              <div className="col l2 s12">
                <h5 className="white-text">Resources</h5>
                <ul>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Where can I live?
                    </a>
                  </li>
                  <li>
                    <a
                      className="grey-text text-lighten-3"
                      href="https://www.rightmove.co.uk/advice/buyer/mortgage-calculator/#mortgage-repayment"
                    >
                      Mortgage calculator
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Rent Advice
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Sell Advice
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l2 s12">
                <h5 className="white-text">MoveRight</h5>
                <ul>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Help
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l2 s12">
                <h5 className="white-text">Site Info</h5>
                <ul>
                  <li>
                    <a
                      className="grey-text text-lighten-3"
                      href="https://www.termsofusegenerator.net/live.php?token=Nnfq7ft8o0ahfeDJrj3WYhAEuS5Vb2Iv"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container left">© 2019 RightMove Copyright</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
