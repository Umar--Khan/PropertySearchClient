import React, { Component } from "react";

class OurServices extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="center">Our Services</h2>
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="center">
              <i className="material-icons" style={iconStyle}>
                phone
              </i>
              <p style={promoTextStyle}>Call our 24/7 helpline</p>
              <p className="light center">
                We provide all sort of help from your mortgage, to what property
                would best suit your needs. Our highly motivated teams will make
                sure that they find you the perfect property to meet your
                requirements, as well as providing you with all the services you
                will need when purchasing.
              </p>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="center">
              <i className="material-icons" style={iconStyle}>
                turned_in_not
              </i>
              <p style={promoTextStyle}>Save your favorite properties</p>
              <p className="light center">
                Login to save your favorite properties and let us recommend
                similar properties. Utilising the best professional marketing
                services possible, our expert negotiators will help you with a
                quick, hassle free sale.
              </p>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="center">
              <i className="material-icons" style={iconStyle}>
                attach_money
              </i>
              <p style={promoTextStyle}>Sell your property</p>
              <p className="light center">
                Our services are one of the best in the UK. We will handle
                everything for you. Utilising the best professional marketing
                services possible, our expert negotiators will help you with a
                quick, hassle free sale.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const iconStyle = {
  margin: "40px 0",
  color: "#ee6e73",
  fontSize: "7rem",
  display: "block"
};

const promoTextStyle = {
  fontSize: "1.7rem",
  fontWeight: "500",
  marginTop: "5px",
  marginBottom: "0"
};

export default OurServices;
