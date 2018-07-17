import React, { Component } from "react";
import { connect } from "react-redux";

import "./ImageLinkForm.css";

class ImageLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const {
      onInputChange,
      onButtonSubmit,
      onFileInputChange,
      fileName
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <p className="f3">
          {"This Magic Brain will detect faces in your pictures. Git it a try."}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5 row">
            <div className="col-md-12">
              <input
                className="db w-100 pa2 mt2 br2 b--black-20 ba"
                type="text"
                value={fileName ? "" : null}
                placeholder="Enter Picture URL"
                onChange={onInputChange}
              />
            </div>
            <p className="f3 mt-2">{"OR"}</p>
            <div className="col-md-12 input-group mt-1">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-upload" />
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  name="profilePic"
                  onChange={onFileInputChange}
                  accept="image/*"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {fileName}
                </label>
              </div>
            </div>
            <div className="col-md-12">
              {errors.url ? (
                <p
                  className="db fw6 lh-copy f6 mt-1"
                  style={{ color: "#dc3545" }}
                >
                  {errors.url}
                </p>
              ) : null}
            </div>
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple mt-2"
              onClick={onButtonSubmit}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps)(ImageLinkForm);
