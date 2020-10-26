import React, { Component } from "react";
import io from "socket.io-client";

import Config from "_variables";

import "./Chat.scss";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Chats: [],
      room: -1,
      text: "",
      err: "",
    };
    this.handleTyping = this.handleTyping.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handleQueue = this.handleQueue.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleChatPull = this.handleChatPull.bind(this);
  }

  componentDidMount() {
    if (this.props.token) {
      console.log("Global Login");
      /* check global connection */
      this.socket = io.connect(Config.Socket_URL, {
        transports: ["websocket"],
        forceNew: true,
      });

      /* subscribe chat-pull */
      this.socket.on("chat_pull", this.handleChatPull);
      this.socket.on("queue_match", this.handleQueue);
      this.socket.on("leaveRoom", this.handleLeaveRoom);
      this.socket.on("err", this.handleError);

      this.socket.emit(
        "queue",
        JSON.stringify({
          token: this.props.token,
        })
      );
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
        "chat_push",
        JSON.stringify({
          token: this.props.token,
          msg: this.state.text.trim(),
          room_num: this.state.room,
        })
      );
      this.setState({
        text: "",
      });
    }
  }

  handleChatPull(msg, id) {
    let result = this.state.Chats;
    result.push({ msg, author: id });
    this.setState({ Chats: result });
    if (this.messagesEnd) {
      this.messagesEnd.scrollBy({ top: 9999, behavior: "smooth" });
    }
  }

  handleQueue(num) {
    this.setState({ room: num, err: num });
    this.socket.emit(
      "chat_join",
      JSON.stringify({
        token: this.props.token,
        room_num: this.state.room,
      })
    );
  }

  handleLeaveRoom() {
    this.socket.emit(
      "leaveRoom",
      JSON.stringify({
        num: this.state.num,
        id: this.props.token,
      })
    );
    this.setState({ room: -1 });
  }

  handleError(err) {
    this.setState({ err: err });
  }

  render() {
    let { handleTyping, handleEnter, handlePush } = this;
    let { Chats, text, err } = this.state;
    return (
      <div className="chat">
        <div
          className="g_message_area"
          ref={(el) => {
            this.messagesEnd = el;
          }}
        >
          <div className="g_text g_system">
            안녕하세요 여기는 공용 채팅 공간입니다.
          </div>
          {Chats.map((info, i) => {
            return (
              <div key={i}>
                <div>{info.author}</div>
                <div>{info.msg}</div>
              </div>
            );
          })}
        </div>

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
        </div>
        {err}
      </div>
    );
  }
}

export default ChatContainer;
