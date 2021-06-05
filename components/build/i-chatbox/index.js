import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

class ChatBot extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="chatbot-box"
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <div className="chatbot-header d-flex justify-content-between">
          <span />
          <span>
            {" "}
            <h5>Public Chat</h5>
          </span>
          <span onClick={this.props?.toggleChat && this.props?.toggleChat}>
            X
          </span>
        </div>
        <div className="chatbot-content">
          <div className="search-box">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className="chats">
            {this.props.chateMessages?.length
              ? this.props.chateMessages.map(item => {
                  if (item.senderId === this.props.userId) {
                    return (
                      <div className="chat-line own-chat">
                        <span className="u2 chat">{item.message}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div className="chat-line">
                        <span className="u-name">JD</span>
                        <span className="u1 chat">{item.message}</span>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
        <div
          className="chatbot-footer"
          style={{ position: "sticky", bottom: "0px" }}
        >
          <img src={"/assets/icons/small-plus.svg"} alt="phiz icon"></img>
          <textarea
            id="message"
            placeholder="Send a message..."
            value={this.props.chatBoxValue}
            onChange={this.props.changeChatBoxValue}
            required=""
            minLength="1"
            maxLength="1500"
          />
          <button
            className="btn"
            onClick={this.props.sendMessage}
            style={{
              background: "tranparent",
            }}
          >
            <img src={"/assets/icons/messageSend.svg"} alt="phiz icon"></img>
          </button>
        </div>
      </div>
    );
  }
}

export default ChatBot;
