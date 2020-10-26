import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainContainer from "container/main/MainContainer";
import UserContainer from "container/user/UserContainer";
import ChatContainer from "container/chat/ChatContainer";

class Router extends Component {
  state = {
    token: "",
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhIiwicmFuayI6MSwicm9vbSI6MiwiY3JlYXRlZEF0IjoiMjAyMC0xMC0yNFQwODozNzowMC44ODNaIiwidXBkYXRlZEF0IjoiMjAyMC0xMC0yNFQwODo0Njo0NC4zNDdaIiwiaWF0IjoxNjAzNTM1MTUzfQ.s3I5vDmXd2HHqL3cMVXjzP6dO1Fr-zM-O2SWuqDtJWU",
    rank: 0,
  };

  func = {
    tokenChanger: (token, rank) => {
      console.log("토큰 번경!" + token);
      console.log("권한" + rank);
      this.setState({ token, rank });
    },
  };

  render() {
    let { state, func } = this;
    let { token, rank } = state;
    return (
      <BrowserRouter basename="/">
        <>
          <Switch>
            {(() => {
              switch (rank) {
                case 0:
                  return <MainContainer {...func} {...state} />;
                case 1:
                  return (
                    <Route
                      exact
                      path="/"
                      render={(props) => <UserContainer />}
                    />
                  );
                default:
              }
            })()}

            <Route path="/chat" render={() => <ChatContainer {...state} />} />

            {/* <Route
              path="/manager"
              render={() => <MainContainer token={token} />}
            />
            <Route
              path="/admin"
              render={() => <MainContainer token={token} />}
            />

            <Route path="/hello" render={(props) => "<Hello {...props} />"} /> */}
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default Router;
