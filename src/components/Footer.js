import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div id="footerPage">
        <section className="section-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="widget-a">
                  <div className="w-header-a">
                    <h3 className="w-title-a text-brand">MoveRight</h3>
                  </div>
                  <div className="w-body-a">
                    <p className="w-text-a color-text-a">
                      We are dedicated to our customers and our aim is to give
                      the best experience possible. You can contact us 24/7 for
                      anything.
                    </p>
                  </div>
                  <div className="w-footer-a">
                    <ul className="list-unstyled">
                      <li className="color-a">
                        <span className="color-text-a">Phone: </span> 020 7946
                        0888
                      </li>
                      <li className="color-a">
                        <span className="color-text-a">Email: </span>
                        contact@example.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 section-md-t3">
                <div className="widget-a">
                  <div className="w-header-a">
                    <h3 className="w-title-a text-brand">The Company</h3>
                  </div>
                  <div className="w-body-a">
                    <div className="w-body-a">
                      <ul className="list-unstyled">
                        <li className="item-list-a">
                          <i className="fa fa-angle-right" />{" "}
                          <a href="#">Site Map</a>
                        </li>
                        <li className="item-list-a">
                          <i className="fa fa-angle-right" />{" "}
                          <a href="#">Legal</a>
                        </li>
                        <li className="item-list-a">
                          <i className="fa fa-angle-right" />{" "}
                          <a href="#">Agent Admin</a>
                        </li>
                        <li className="item-list-a">
                          <i className="fa fa-angle-right" />{" "}
                          <a href="#">Careers</a>
                        </li>
                        <li className="item-list-a">
                          <i className="fa fa-angle-right" />{" "}
                          <a href="#">Affiliate</a>
                        </li>
                        <li className="item-list-a">
                          <i className="fa fa-angle-right" />{" "}
                          <a href="#">Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 section-md-t3">
                <div className="widget-a">
                  <div className="w-header-a">
                    <h3 className="w-title-a text-brand">Quick links</h3>
                  </div>
                  <div className="w-body-a">
                    <ul className="list-unstyled">
                      <li className="item-list-a">
                        <i className="fa fa-angle-right" />{" "}
                        <a href="https://www.rightmove.co.uk/advice/">
                          Property guides
                        </a>
                      </li>
                      <li className="item-list-a">
                        <i className="fa fa-angle-right" />{" "}
                        <a href="https://www.rightmove.co.uk/news/house-price-index/">
                          House Price Index
                        </a>
                      </li>
                      <li className="item-list-a">
                        <i className="fa fa-angle-right" />{" "}
                        <a href="https://www.rightmove.co.uk/cheap-flats-to-rent.html">
                          Cheap flats to rent
                        </a>
                      </li>
                      <li className="item-list-a">
                        <i className="fa fa-angle-right" />{" "}
                        <a href="https://www.rightmove.co.uk/advice/landlord/investor-newsletter/">
                          Property investment
                        </a>
                      </li>
                      <li className="item-list-a">
                        <i className="fa fa-angle-right" />{" "}
                        <a href="https://www.rightmove.co.uk/cheap-houses-for-sale.html">
                          Cheap houses for sale
                        </a>
                      </li>
                      <li className="item-list-a">
                        <i className="fa fa-angle-right" />{" "}
                        <a href="https://www.rightmove.co.uk/news/">
                          Property blog
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="nav-footer">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">About</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Search</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Profile</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>
                <div className="socials-a">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-pinterest-p" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-dribbble" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="copyright-footer">
                  <p className="copyright color-text-a">
                    &copy; Copyright
                    <span className="color-a"> MoveRight</span> All Rights
                    Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
