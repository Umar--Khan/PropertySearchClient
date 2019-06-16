import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";

const singleProperty = {
  image_url:
    "https://s3-eu-west-1.amazonaws.com/property.adzuna.co.uk/668a7360f69314ab6eb093e9082ef96cd7562aa2a3ab8ebed5a02feb2be9de7f.jpeg",
  postcode: "N17EH",
  created: "2019-05-30T13:08:08Z",
  __CLASS__: "Adzuna::API::Response::Property",
  adref:
    "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiM2xKVHVKNnFTM09xTGVhWWdxbE9aUSIsImkiOjExNjYxNjc1NjB9.rY69uZ-lHvy6GvmhSfUfmk9f0en_w9yZIskLDglH2K8",
  sale_price: 895000,
  description:
    "Warehouse style apartment This exceptionally bright 1,033 sqft 3-bed, 2-bath apartment with full height crittall windows and a balcony forms part of Eagle Wharf Road - a stylish collection of thirty-six - 1,2 and 3 bedroom warehouse style apartments on Eagle Wharf Road, situated in the heart of Hoxton. Eagle Wharf Road offers modern, easy living in one of London's most vibrant neighbourhoods. The surrounding streets and canals are packed with galleries and museums, pubs and eccentric cocktail j…",
  agent: {
    __CLASS__: "Adzuna::API::Response::Agent",
    display_name: "Stone Real Estate"
  },
  title: "3 bed flat for sale in Eagle Wharf Road",
  latitude: 51.534529,
  longitude: -0.090377,
  redirect_url:
    "https://property.adzuna.co.uk/land/ad/1084780442?se=NUJH-cZDSkqGVlXzoNonaQ&utm_medium=api&utm_source=68f473fd&v=8725D733CA0731EAE1E909CF9163BC67BE0DF225",
  category: {
    tag: "for-sale",
    label: "For Sale",
    __CLASS__: "Adzuna::API::Response::Category"
  },
  location: {
    display_name: "Hoxton, North London",
    __CLASS__: "Adzuna::API::Response::Location",
    area: ["UK", "London", "North London", "Hoxton"]
  },
  property_type: "flat",
  is_furnished: "0",
  beds: 3,
  id: 1166167560
};

class SingleProperty extends Component {
  //   componentDidMount() {
  // if (!this.props.singleProperty) {
  //   this.props.history.push("/property-for-sale/search");
  // }
  //   }

  state = {
    urls: ""
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  sanitazeData = data => {
    let result = `{"pictures" : ${data
      .match(/galleryItems =(.*)<\/script>/s)[1]
      .split("</script>")[0]
      .split("path")
      .join('"path"')
      .split("caption")
      .join('"caption"')
      .replace(";", "")}}`;

    const index = result.lastIndexOf(",");
    return result.split("").map((item, pos) => {
      if (pos != index) {
        return item;
      }
    });
  };

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://property.adzuna.co.uk/land/ad/1084780442?se=ZBLm4IerSH2PrYkeasziYQ&utm_medium=api&utm_source=68f473fd&v=8725D733CA0731EAE1E909CF9163BC67BE0DF225"
      )
      .then(res =>
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/${
              res.data.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/)[2]
            }`
          )
          .then(pls => {
            this.setState({
              urls: JSON.parse(this.sanitazeData(pls.data).join(""))
            });
          })
      );
  }

  renderImages = () => {
    const imgs = [];
    const images = this.state.urls.pictures;

    for (let i = 0; i < images; i++) {
      imgs.push(
        <a className="carousel-item" href="#one!">
          <img src={images.path} alt={images.caption} />
        </a>
      );
    }
    return imgs;
  };

  render() {
    if (!this.state.urls) {
      return <h1>loading</h1>;
    }
    return (
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="row">
          <div className="col l12 s12 m12">
            <h5>{singleProperty.title}</h5>
            <h4 className="right-align teal-text text-lighten-2">
              £{this.numberWithCommas(singleProperty.sale_price)}
            </h4>
            <h6>{singleProperty.location.display_name}</h6>
          </div>
        </div>
        <div className="row">
          <div>
            {this.state.urls.pictures.map((pics, i) => {
              return <img src={pics.path} alt={pics.caption} key={i} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleProperty: state.property.singleProperty
});

export default connect(
  mapStateToProps,
  null
)(SingleProperty);
