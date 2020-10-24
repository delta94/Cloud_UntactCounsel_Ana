import React, { Component } from "react";
import io from "socket.io-client";

import Config from "_variables";

import "./Chat.scss";

class ChatContainer extends Component {
  state = { Chats: [], text: "" };

  async componentDidMount() {
    if (this.props.token) {
      let bodyData = { token: this.props.token };
      let response = await fetch(Config.API_URL + "/chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: Object.keys(bodyData)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(bodyData[key])
          )
          .join("&"),
      });
      let { statusCode, token, rank } = await response.json();
      if (statusCode === 200) {
        this.props.tokenChanger(token, rank);
      } else {
        console.log(token);
      }
    }
  }

  handleTyping(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleEnter(e) {
    if (e.key === "Enter") {
      this.handlePush();
    }
  }

  handlePush() {
    if (this.state.text.trim().length > 0) {
      this.socket.emit(
        "chat-push",
        JSON.stringify({
          token: this.state.token,
          text: this.state.text.trim(),
        })
      );
      this.setState({
        text: "",
      });
    }
  }

  handleResponse(msg) {
    let result = this.state.chats;
    result.push(msg);
    this.setState({
      chats: result,
      err: "",
    });
    if (this.messagesEnd) {
      this.messagesEnd.scrollBy({ top: 9999, behavior: "smooth" });
    }
  }

  Qin = async () => {
    let bodyData = { token: this.props.token };
    let response = await fetch(Config.API_URL + "/chat/queue-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: Object.keys(bodyData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(bodyData[key])
        )
        .join("&"),
    });
    let { statusCode, num, msg } = await response.json();
    if (statusCode === 200) {
      console.log(num);
    } else {
      console.log(msg);
    }
  };

  // QCh = async () => {
  //   let bodyData = { token: this.props.token };
  //   let response = await fetch(Config.API_URL + "/chat/queue-check", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: Object.keys(bodyData)
  //       .map(
  //         (key) =>
  //           encodeURIComponent(key) + "=" + encodeURIComponent(bodyData[key])
  //       )
  //       .join("&"),
  //   });
  //   let { statusCode, token, rank } = await response.json();
  //   if (statusCode === 200) {
  //     this.props.tokenChanger(token, rank);
  //   } else {
  //     console.log(token);
  //   }
  // };

  render() {
    let { handleTyping, handleEnter, handlePush } = this;
    let { Chats, text } = this.state;
    return (
      <div className="chat">
        <button onClick={this.Qin}>Qin</button>
        {/* <button onClick={this.Qch}></button> */}
        {/* <div
          className="g_message_area"
          ref={(el) => {
            this.messagesEnd = el;
          }}
        >
          <div className="g_text g_system">
            안녕하세요 여기는 공용 채팅 공간입니다.
          </div>
          {Chats.map((info) => {
            return (
              <div>
                <div>{info.author}</div>
                <div>{info.msg}</div>
              </div>
            );
          })}
          {(() => {
            let hello;
            return <div>gello</div>;
          })()}
        </div> */}

        {/* 
        <div className="g_bottom_area">
          <input
            type="text"
            id="g_text_input"
            onChange={handleTyping}
            value={text}
            onKeyDown={handleEnter}
          />
          <div className="g_send_area">
            <button type="button" name="g_button2" onClick={handlePush}>
              SEND
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ChatContainer;
