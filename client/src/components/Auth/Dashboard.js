import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { postClarifai, postFileClarifai } from "../../actions/imageActions";

import FaceRecognition from "../FaceRecognition/FaceRecognition";
import Logo from "../Logo/Logo";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  isFile: false,
  fileName: "",
  file: {},
  errors: {}
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.image && nextProps.image.clarifaiRes) {
      this.displayFaceBoxes(
        this.calculateFaceLocations(nextProps.image.clarifaiRes)
      );
    }
  }

  calculateFaceLocations = data => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = event => {
    this.setState({
      input: event.target.value,
      boxes: [],
      errors: {},
      isFile: false,
      file: {},
      imageUrl: "",
      fileName: ""
    });
  };

  onFileInputChange = event => {
    var reader = new FileReader();
    reader.onloadend = function() {
      this.setState({
        input: reader.result,
        isFile: true
      });
    }.bind(this);

    this.setState({
      fileName: event.target.files[0].name,
      file: event.target.files[0],
      boxes: [],
      errors: {},
      imageUrl: ""
    });

    reader.readAsDataURL(event.target.files[0]);
  };

  onButtonSubmit = e => {
    this.setState({
      imageUrl: this.state.input
    });

    if (this.state.isFile) {
      const data = new FormData();

      data.append("file", this.state.file);
      data.append("isFile", this.state.isFile);
      this.props.postFileClarifai(data);
    } else {
      const imageData = {
        url: this.state.input,
        isFile: this.state.isFile
      };
      this.props.postClarifai(imageData);
    }
  };

  render() {
    const { imageUrl, boxes, fileName } = this.state;
    return (
      <div>
        <Logo />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          onFileInputChange={this.onFileInputChange}
          fileName={fileName}
        />
        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  postClarifai: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    image: state.image,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { postClarifai, postFileClarifai })(
  Dashboard
);
