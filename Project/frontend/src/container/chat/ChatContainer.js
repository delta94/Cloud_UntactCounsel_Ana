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
      onChat: false,
      myname: "",
    };
    this.handlePush = this.handlePush.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
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
      this.socket.on("queue_match", this.handleQueue);
      this.socket.on("chat_pull", this.handleChatPull);
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

  handleEnter(e) {
    if (e.key === "Enter") {
      this.handlePush();
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

  handleQueue(num, myname) {
    this.setState({
      room: num,
      onChat: true,
      myname,
    });
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
        onChat: false,
      })
    );
    this.setState({ room: -1 });
  }

  handleError(err) {
    this.setState({ err: err });
  }

  render() {
    let { handleTyping, handleEnter, handlePush } = this;
    let { Chats, text, err, onChat, myname } = this.state;
    return (
      <div className="chat">
        {!onChat ? (
          "매치중..."
        ) : (
          <>
            <div
              className="message_area"
              ref={(el) => {
                this.messagesEnd = el;
              }}
            >
              <div className="text system">
                안녕하세요 채팅이 시작 되었습니다.
              </div>
              {Chats.map((info, i) => {
                return (
                  <div key={i}>
                    <div>{info.author == myname ? "나" : info.author}</div>
                    <div>{info.msg}</div>
                  </div>
                );
              })}
            </div>

            <div className="bottom_area">
              <input
                type="text"
                id="text_input"
                onChange={handleTyping}
                onKeyDown={handleEnter}
                value={text}
              />
              <div className="send_area">
                <button type="button" name="button2" onClick={handlePush}>
                  SEND
                </button>
              </div>
            </div>
            {err}
          </>
        )}
      </div>
    );
  }
}

export default ChatContainer;
