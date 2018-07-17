import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../Common/TextFieldGroup";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  };

  onSubmitSignIn = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <TextFieldGroup
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  placeholder="Name"
                />
              </div>
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
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Confirm Password
                </label>
                <TextFieldGroup
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm Password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, {
  registerUser
})(Register);
