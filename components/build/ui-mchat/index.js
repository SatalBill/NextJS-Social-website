import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DoneIcon from "@material-ui/icons/Done";
import ShareMedia from "../ui-share";

// import WebRTC from "../../../webrtc"
import config from "../../../config";
let socket = config.socket;
export class mchat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      share: false,
      videoshare: false,
      videoUrl: "",
      gameshare: false,
      gameUrl: "",
      localMessage: "",
      messageFlag: false,
      messages: [],
      message: "",
    };

    this.handelerChangeState = this.handelerChangeState.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getMedia = this.getMedia.bind(this);
  }

  handelerChangeState() {
    this.setState({ share: !this.state.share });
  }

  changeState(txt) {
    if (txt === "checked") {
      this.setState({ share: false });
    }
  }

  getMedia = mediaUrl => {
    if (mediaUrl.source === "video") {
      this.setState({
        ...this.state,
        videoshare: true,
        videoUrl: mediaUrl.url,
      });
    } else if (mediaUrl.source === "game") {
      this.setState({
        ...this.state,
        gameshare: true,
        gameUrl: mediaUrl.url,
      });
    }
  };

  handleStartAction(typing) {
    let { myProfile, roomId, otherUser } = { ...this.props };

    socket.emit("typing-action", {
      typing,
      senderId: myProfile.id,
      receiverId: otherUser.id,
      roomId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.roomId !== this.state.roomId) {
      this.handleMessageScroll();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.roomId !== nextProps.roomId) {
      return {
        roomId: nextProps.roomId,
        messages: nextProps.roomMessages,
      };
    }

    return null;
  }
  componentDidMount() {
    let { roomMessages, roomId } = { ...this.props };
    this.setState({ roomId, messages: roomMessages }, () => {
      this.handleMessageScroll();
    });

    socket.on("typing-action", payload => {
      if (this.state.typing !== payload.typing) {
        this.setState({ typing: payload.typing });
      }
    });

    socket.on("newChatMessage", messageObj => {
      this.setState({ messages: [...this.state.messages, messageObj] }, () => {
        this.handleMessageScroll();
      });
    });
  }

  handleMessageSend() {
    let { messages, message } = { ...this.state };
    let { myProfile, roomId, otherUser } = { ...this.props };
    let msgObj = {
      message: message,
      receiverId: otherUser.id,
      senderId: myProfile.id,
      messageType: "text",
      read: false,
      roomId: roomId,
    };

    socket.emit("sentMessage", msgObj, messageObj => {
      this.setState(
        { message: "", messages: [...this.state.messages, messageObj] },
        () => {
          this.handleMessageScroll();
          this.handleStartAction(false);
        }
      );
    });
  }

  getFriend() {
    const senderId = this.props.senderId;

    let friend = this.props.friends.filter(friend => friend.id === senderId);
    return friend;
  }
  handleMessageScroll = () => {
    let conversationElement = document.getElementById("conversation");
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight + 100;
      setTimeout(() => {
        conversationElement.scrollTop = conversationElement.scrollHeight + 100;
      }, 400);

      let messageDoc = document.getElementById("message");
      messageDoc.focus();
    }
  };

  render() {
    const { share, gameshare, messages, videoshare } = this.state;
    const friend = this.getFriend();

    return (
      <div className="frc mt-4" style={{ marginLeft: "40px" }}>
        <div className="chatbot-content pos-re">
          <div className="chats" id="conversation">
            {messages &&
              messages.map((msg, index) => (
                <span key={index}>
                  {msg.senderId === this.props.myProfile.id ? (
                    <div className="chat-line own-chat mt-0">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MoreHorizIcon></MoreHorizIcon>
                      </span>
                      <span className="u2 chat">
                        {msg.message}
                        <div className="send-time">
                          &nbsp;{" "}
                          {new Date(msg.updatedAt).toLocaleTimeString("en-US", {
                            hour12: false,
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                        <div className="mr-3 own-check">
                          <DoneIcon />
                        </div>
                      </span>
                    </div>
                  ) : (
                    <div className="chat-line">
                      <span className="u1 chat pos-re">
                        {msg.message}
                        <div className="send-time">
                          {new Date(msg.updatedAt).toLocaleTimeString("en-US", {
                            hour12: false,
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MoreHorizIcon></MoreHorizIcon>
                      </span>
                    </div>
                  )}
                </span>
              ))}

            {gameshare && (
              <div className="chat-line own-chat mt-0">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MoreHorizIcon></MoreHorizIcon>
                </span>
                <span
                  className="u2 chat"
                  style={{ width: "545px", padding: "18px" }}
                >
                  <img src={this.state.gameUrl} alt="game" width={"100%"} />
                  <div className="send-time">3:52</div>
                  <div className="mr-3 own-check">
                    <DoneIcon />
                    <DoneIcon />
                  </div>
                </span>
              </div>
            )}

            {videoshare && (
              <div className="chat-line own-chat mt-0">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MoreHorizIcon></MoreHorizIcon>
                </span>
                <span
                  className="u2 chat"
                  style={{ width: "545px", padding: "18px" }}
                >
                  <iframe
                    title="dflsf"
                    width="100%"
                    height="288px"
                    src={this.state.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="send-time">3:52</div>
                  <div className="mr-3 own-check">
                    <DoneIcon />
                    <DoneIcon />
                  </div>
                </span>
              </div>
            )}
          </div>
          <div
            id="key-press"
            style={{
              textAlign: "right",
              display: this.state.typing ? "block" : "none",
              fontSize: "15px",
              color: "#727482",
              position: "absolute",
              bottom: "6.2rem",
              right: ".5rem",
            }}
          >
            <span id="typingUser" style={{ verticalAlign: "middle" }}>
              {/* {"Typing"} */}
            </span>
            <img
              src="https://www.webrtc-experiment.com/images/key-press.gif"
              style={{ height: "25px", verticalAlign: "middle" }}
            />
          </div>
          <div className="pos-re">
            {share && (
              <ShareMedia aa={this.changeState} getUrl={this.getMedia} />
            )}
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              this.handleMessageSend();
            }}
            className="chatbot-footer fr-chat-footer pos-ab"
            style={{ bottom: "0" }}
          >
            <div
              className="share-btn content-footer-btn"
              onClick={() => this.handelerChangeState()}
              style={{
                color: `${this.state.share ? "#ff8300" : "#4e5165"}`,
              }}
            >
              <div
                className="share-icon"
                style={{
                  background: `${this.state.share ? "#ff8300" : "#4e5165"}`,
                }}
              ></div>
              Share
            </div>
            <input
              id="message"
              placeholder="Send a message..."
              required=""
              minLength="1"
              className="fr-chat-text"
              maxLength="1500"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              onKeyPress={() => this.handleStartAction(true)}
              onBlur={() => this.handleStartAction(false)}
            />
            <img
              src={"/assets/icons/messageSend.svg"}
              className="fr-chat-send"
              alt="phiz icon"
              onClick={() => this.handleMessageSend()}
            ></img>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myProfile: state.users.myProfile,
});

export default withRouter(connect(mapStateToProps, null)(mchat));
