import React, { Component } from "react";
import { Link } from "react-router-dom";

import Config from "_variables";

import "./User.scss";

class UserContainer extends Component {
  render() {
    return (
      <div>
        <div className="btn">
          <Link to="chat">채팅</Link>
        </div>
        <div className="btn">
          <Link to="post">글쓰기</Link>
        </div>
        <div className="btn">
          <Link to="config">개인정보 수정</Link>
        </div>
      </div>
    );
  }
}

export default UserContainer;
