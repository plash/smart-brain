import React, { Component } from "react";
import Particles from "react-particles-js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUserSession,
  logoutUser,
  clearCurrentUserSession
} from "./actions/authActions";

import Dashboard from "./components/Auth/Dashboard";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";

import PrivateRoute from "./components/Common/PrivateRoute";

import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user
  store.dispatch(setCurrentUserSession(decoded));

  // Check expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentUserSession());
    // Logout user
    store.dispatch(logoutUser());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Particles className="particles" params={particlesOptions} />
            <Navigation />
            <Route exact path="/" component={Signin} />
            <Route exact path="/login" component={Signin} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute
                path="/dashboard"
                name="Dashboard"
                component={Dashboard}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
