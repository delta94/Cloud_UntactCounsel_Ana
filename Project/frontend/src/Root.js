import React from "react";
// import { Provider } from "react-redux";
// import store from "./store";

import Router from "./route/Router";

import "./index.scss";

const Root = () => {
  /**
   * Redux Mode
   * <Provider>
   *  <Router/>
   * </Provider>
   * https://stackoverflow.com/questions/46741247/nothing-was-returned-from-render-this-usually-means-a-return-statement-is-missi
   */

  // <Provider store={store}>
  return <Router />;
  // </Provider>
};

export default Root;
