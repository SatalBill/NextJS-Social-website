import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FriendSidebar from "../../firendRoom/sidebar";
import FriendHeaderCard from "../../firendRoom/friendHeaderCard";
import MessageChat from "../../build/ui-mchat";
import VideoChat from "../../build/video-call";
import FriendsGame from "../../firendRoom/friendsGame";
import * as usersAction from "../../../redux/actions/users";
import * as chatRequest from "../../../redux/sagas/Requests/chatRequest";
import config from "../../../config";
import io from "socket.io-client";
import Peer from "simple-peer";
import Avatar from "react-avatar";
import ChatWindow from "../../build/chat-window";

// import WebRTC from "../../webrtc"
import * as _ from "lodash";
import { getLocalStorage } from "../../../utils/localstorage";
let socket = config.socket;
let myProfile;
let userId;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      precontentState: true,
      messageState: false,
      friendsGameState: false,
      videoCallState: false,
      f_name: "",
      roomId: -1,
      senderId: -1,
      typing: false,
      messageData: "",
      exitCall: false,
      roomMessages: [],
    };
    this.friendHeader = React.createRef();

    // this.socket = React.createRef()
  }

  sendMessage = msgObj => {
    socket.emit("send-private-message", msgObj, messageObj => {
      this.handleStartAction(false);
      this.addMessageObj(messageObj);
    });
  };
  addMessageObj = messageObj => {
    this.setState(
      { roomMessages: [...this.state.roomMessages, messageObj] },
      () => {
        this.handleMessageScroll();
      }
    );
  };
  componentDidMount() {
    myProfile = this.props.myProfile;
    userId = getLocalStorage("userId");
    socket.on("user-typing-action", payload => {
      if (this.state.typing !== payload.typing) {
        this.setState({ typing: payload.typing });
      }
    });
    socket.on("new-private-message", messageObj => {
      this.addMessageObj(messageObj);
    });

    let params = this.props.history.location.state || {};
    if (params.otherUser) {
      this.joinFriendRoom(params.otherUser);
    }

    socket.on("callEnded", payload => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      this.getEndState("fr_callend");
      window.location.reload();
    });
    // this.socket.current = WebRTC.getInstance().startServer(io)
    // this.socket.current = io.connect("https://phizlive.io")
    // this.socket.current = io.connect(config.serverURL)

    // this.socket.current.emit("userSignIn", {
    //     userId: parseInt(getLocalStorage("userId")),
    // })
  }
  findRoomId = (firstUserId, secondUserId) => {
    if (firstUserId < secondUserId) {
      return firstUserId + "_" + secondUserId;
    } else {
      return secondUserId + "_" + firstUserId;
    }
  };

  joinFriendRoom(friend, roomMessages) {
    if (friend) {
      socket.emit("leave-private-room", {
        roomId: this.state.roomId,
        user: this.props.myProfile.id,
      });

      let roomId = this.findRoomId(friend.id, this.props.myProfile.id);
      socket.emit("join-private-room", {
        roomId,
        user: this.props.myProfile.id,
      });

      chatRequest.getRoomMessages(roomId).then(res => {
        if (res.status === 200) {
          this.setState({
            roomMessages: res.data.data,
          });
        }
        this.setState({
          ...this.state,
          precontentState: false,
          videoCallState: false,
          messageState: true,
          f_name: friend.username,
          friend: friend,
          roomId,
        });
      });
    }
  }

  parentCallback = come_txt => {
    if (come_txt === "vc") {
      this.setState({
        ...this.state,
        videoCallState: true,
        messageState: false,
        exitCall: false,
        hide: false,
      });
    }
  };

  acceptCall = roomId => {
    console.log("acceptCall in friend:  ", roomId);
    this.setState({
      ...this.state,
      hide: true,
      videoCallState: true,
      messageState: false,
      precontentState: false,
      roomId,
      exitCall: false,
    });
  };
  getEndState = come_end => {
    if (come_end !== "") {
      console.log("getEndState", come_end);
      this.setState({
        ...this.state,
        precontentState: false,
        messageState: true,
        videoCallState: false,
      });

      // if (come_end === "fr_callend") {
      //     this.setState({
      //         exitCall: true
      //     },()=>{

      //     })

      // }
    }
  };

  handleStartAction(typing) {
    let { myProfile, roomId, otherUser } = { ...this.props };
    // socket.emit("typing-action", {
    //     typing,
    //     senderId: myProfile.id,
    //     receiverId: otherUser.id,
    //     roomId
    // })
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
  handleTyping = payload => {
    payload.receiverId = this.state.friend.id;
    socket.emit("user-typing-action", payload);
  };
  render() {
    const {
      precontentState,
      messageState,
      videoCallState,
      friendsGameState,
      roomMessages,
      friend,
    } = this.state;
    return (
      <div className="frind-content" style={{ display: "flex" }}>
        <FriendSidebar
          joinFriendRoom={(friend, roomMessages) =>
            this.joinFriendRoom(friend, roomMessages)
          }
        />
        <div className="friendcontainer">
          <div>
            <FriendHeaderCard
              fName={this.state.f_name}
              friends={this.props.userList}
              friend={friend}
              roomId={this.state.roomId}
              parentCallback={this.parentCallback}
              acceptCall={this.acceptCall}
              exitCall={this.state.exitCall}
            />
          </div>
          <div className="fr-main" id="frMain">
            <div className="fr-main-container pos-re ml43px">
              <div>
                {precontentState && (
                  <div className="fr-precontent">
                    <div className="fr-welcome-container">
                      <div className="fr-welcome-img-wrapper">
                        <img
                          src={"/assets/popula/welcome.png"}
                          alt="fr-welcome"
                        ></img>
                      </div>
                      <h3 className="mt-3" style={{ color: "#ff8300" }}>
                        GET CONNECTED WITH YOUR FRIENDS
                      </h3>
                      <h3 style={{ color: "#ff8300" }}>& LOVE ONES</h3>
                    </div>
                  </div>
                )}
                {messageState && (
                  // <MessageChat
                  //     // socket={this.socket}
                  //     roomId={this.state.roomId}
                  //     messageData={this.state.messageData}
                  //     senderId={this.state.senderId}
                  //     friends={this.props.users && this.props.users.userList || []}
                  //     typing={this.state.typing}
                  //     otherUser={this.state.friend}
                  //     roomId={this.state.roomId}
                  //     roomMessages={this.state.roomMessages}
                  // />
                  <div className="friend-chat-window">
                    <ChatWindow
                      handleTyping={isTyping => this.handleTyping(isTyping)}
                      userId={parseInt(userId)}
                      friend={this.state.friend}
                      roomId={this.state.roomId}
                      windowType="private"
                      chatWindowHeight="86vh"
                      sendMessage={msg => this.sendMessage(msg)}
                      messages={this.state.roomMessages}
                    />
                  </div>
                )}
                {videoCallState && (
                  <VideoChat
                    friend={this.state.friend}
                    hide={this.state.hide}
                    fr_videoCall={this.state.roomId}
                    pCall={this.getEndState}
                  />
                )}
                {friendsGameState && (
                  <FriendsGame
                    history={this.props.history}
                    teamData={this.props.location.state}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.usersList,
  myProfile: state.users.myProfile,
});

export default withRouter(connect(mapStateToProps, null)(index));
