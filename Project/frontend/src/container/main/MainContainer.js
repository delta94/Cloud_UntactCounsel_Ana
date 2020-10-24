import React, { Component } from "react";

import Config from "_variables";

import Login from "./Login";
import Signup from "./Signup";

import "./Main.scss";

class MainContainer extends Component {
  render() {
    return (
      <div>
        <Login {...this.props} />
        <Signup {...this.props} />
      </div>
    );
  }
}

export default MainContainer;
