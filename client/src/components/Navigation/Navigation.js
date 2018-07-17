import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser, clearCurrentUserSession } from "../../actions/authActions";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  componentDidMount() {
    if (this.props.auth) {
      this.setState({
        isSignedIn: this.props.auth.isAuthenticated
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({
        isSignedIn: nextProps.auth.isAuthenticated
      });
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentUserSession();
    this.props.logoutUser();
  };

  render() {
    const { isSignedIn } = this.state;
    if (isSignedIn) {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={this.onLogoutClick}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/login" className="f3 link dim black underline pa3 pointer">
            Sign In
          </Link>
          <Link
            to="/register"
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </Link>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentUserSession
})(Navigation);
