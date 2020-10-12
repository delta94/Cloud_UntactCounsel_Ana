import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainContainer from "container/main/MainContainer";

class Router extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <>
          <Switch>
            hello
            <Route exact path="/" component={MainContainer} />
            <Route path="/hello" render={(props) => "<Hello {...props} />"} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default Router;
