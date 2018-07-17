import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../Common/TextFieldGroup";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    const errObt = this.state.errors;
    delete errObt[e.target.name];
    this.setState({ [e.target.name]: e.target.value, errors: errObt });
  };

  onSubmit = e => {
    e.preventDefault();

    const login = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(login);
  };

  render() {
    const { errors } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <TextFieldGroup
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  placeholder="Email Address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <TextFieldGroup
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  placeholder="Password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { loginUser })(Signin);
