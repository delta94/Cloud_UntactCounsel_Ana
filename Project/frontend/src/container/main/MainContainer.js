import React, { Component } from "react";

import Config from "_variables";
import MainCounter from "./MainCounter";

import "./Main.scss";

class MainContainer extends Component {
  render() {
    return (
      <div>
        {/* {process.env.NODE_ENV} */}
        <MainCounter msg="world!" />
      </div>
    );
  }
}

export default MainContainer;
