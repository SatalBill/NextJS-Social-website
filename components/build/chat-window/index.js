import React, { Component } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import ChatShareItems from "../chatShareItems/index";
import config from "../../../config";
import * as generalRequest from "../../../redux/sagas/Requests/generalRequest";

import $ from "jquery";
import Avatar from "react-avatar";
let socket = config.socket;
let shareType = "";
let messageArray = [];
class chatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleMessageScroll = () => {
    let conversationElement = document.getElementById("room-conversation");
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight + 100;
      setTimeout(() => {
        conversationElement.scrollTop = conversationElement.scrollHeight + 100;
      }, 400);
      let messageDoc = document.getElementById("message");
      messageDoc.focus();
    }
  };
  componentDidUpdate(prevProps, state) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.handleMessageScroll();
    }
  }
  sendMessage = (type, fileValue) => {
    let { message } = { ...this.state };

    let messageObj = {
      roomId: this.props.roomId,
      message: fileValue || message.trim(),
      senderId: this.props.userId,
      messageType: type || "text",
    };
    if (messageObj.message !== "" && messageObj.message) {
      if (this.props.windowType === "private") {
        messageObj = {
          ...messageObj,
          receiverId: this.props.friend.id,
          read: false,
        };
      }
      this.setState({ message: "" });
      this.handleTyping(false, true);
      this.props.sendMessage(messageObj);
    }
  };
  handleTyping = isTyping => {
    let payload = {
      isTyping,
      roomId: this.props.roomId,
    };
    // this.props.handleTyping(payload)
    if (this.props.windowType === "private") {
      payload.receiverId = this.props.friend?.id;
      socket.emit("user-typing-action", payload);
    } else {
      socket.emit("user-typing-action", payload);
    }
  };

  handleFileShare = payload => {
    let { type, files } = { ...payload };
    this.showPopup();
    let formdata = new FormData();
    formdata.append("folderPath", "chat");
    formdata.append("files", files[0]);

    generalRequest.uploadFiles(formdata).then(res => {
      if (res.status === 200) {
        let uploadFilePath = res.data?.message[0];
        this.sendMessage(type, uploadFilePath);
      }
    });
  };
  showPopup = () => {
    $(".share-chat-item-wraper").slideToggle();
    $(".full-background").toggle();
  };

  componentDidMount() {
    this.handleMessageScroll();
  }
  handleMessageType = message => {
    let msg = message.message;
    message.messageType = message.messageType || "text";
    message.messageType = message.messageType?.toLowerCase();
    if (message.messageType === "image") {
      return (
        <img
          src={config.imageViewURL + message.message}
          className="chat-image"
        ></img>
      );
    } else if (message.messageType === "video") {
      return (
        <div className="chat-video">
          <video
            src={config.imageViewURL + message.message}
            className=""
            controls
          ></video>
        </div>
      );
    } else if (message.messageType === "file") {
      return (
        <iframe
          src={config.imageViewURL + message.message}
          className="chat-file"
        ></iframe>
      );
    } else if (message.messageType === "audio") {
      return (
        <audio
          src={config.imageViewURL + message.message}
          controls
          className="chat-audio"
        ></audio>
      );
    }

    return msg;
  };
  render() {
    let { message } = { ...this.state };
    let { messages, userId, chatWindowHeight, windowType } = { ...this.props };
    return (
      <div className="">
        <div
          style={{
            maxheight: "90vh",
            overFlowY: "scroll",
          }}
          className="chatbot-content fit-screen "
        >
          <div
            className={"chats " + (windowType === "group" ? " vh85" : "")}
            style={{ height: chatWindowHeight }}
            id="room-conversation"
          >
            {messages &&
              messages.map((message, i) =>
                parseInt(message.senderId) === parseInt(userId) ? (
                  <span key={i}>
                    {" "}
                    <div className="chat-line own-chat mt-0">
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <MoreHorizIcon></MoreHorizIcon>
                      </span>
                      <span className="u2 chat">
                        {this.handleMessageType(message)}
                      </span>
                    </div>
                    <div className="own-chat-under-line">
                      <div className="u2-under-line">
                        <div className="send-time">
                          {moment(message.createdAt).format("LLL")}
                        </div>
                      </div>
                    </div>
                  </span>
                ) : (
                  <span key={i}>
                    <div className="chat-line">
                      {windowType === "group" ? (
                        <span
                          className=" mr-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          <Avatar
                            size={30}
                            textSizeRatio={3}
                            round={true}
                            name={message.sender.username}
                            src={
                              config.imageViewURL + message.sender.picturePath
                            }
                          />
                        </span>
                      ) : null}
                      <span className="u1 chat pos-re">
                        {windowType === "group" ? (
                          <span className="wirter-name">
                            {(message.sender && message.sender.username) ||
                              "User Name Here"}
                          </span>
                        ) : null}

                        {this.handleMessageType(message)}
                      </span>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <MoreHorizIcon></MoreHorizIcon>
                      </span>
                    </div>
                    <div className="chat-under-line">
                      <div className="send-time">
                        {moment(message.createdAt).format("LLL")}
                      </div>
                    </div>{" "}
                  </span>
                )
              )}
          </div>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.sendMessage();
          }}
          className=" fr-chat-footer pos-ab"
        >
          <div
            className="chatbot-footer pos-ab"
            style={{ bottom: "0", position: "fixed" }}
          >
            <ChatShareItems
              closeModel={payload => this.handleFileShare(payload)}
            />
            <img
              src={"/assets/icons/small-plus.svg"}
              alt="phiz icon"
              onClick={e => {
                this.showPopup("group");
              }}
            ></img>
            <input
              id="message"
              value={message}
              onKeyPress={() => this.handleTyping(true)}
              onBlur={() => this.handleTyping(false)}
              onChange={e => {
                this.setState({ message: e.target.value });
              }}
              placeholder="Type a message..."
              required=""
              minLength="1"
              maxLength="1500"
            />
            <img
              onClick={e => {
                e.preventDefault();
                this.sendMessage();
              }}
              src={"/assets/icons/messageSend.svg"}
              alt="phiz icon"
            ></img>
          </div>
        </form>
      </div>
    );
  }
}

export default chatWindow;
