import React, { Component } from "react";
import DoneIcon from "@material-ui/icons/Done";
// import friendData from "../../data/friendData.json"
import { connect } from "react-redux";
import * as usersAction from "../../redux/actions/users";
import * as actionTypes from "../../redux/actionTypes";
import * as chatRequest from "../../redux/sagas/Requests/chatRequest";
import moment from "moment";
import * as _ from "lodash";
import Avatar from "react-avatar";
import { getLocalStorage } from "../../utils/localstorage";
import config from "../../config";

let userId = "";
let count = 0;
let socket = config.socket;
export class friendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftbar_state: true,
      searchUser: "",
      userList: [],
      chatRoomList: [],
      onlineUserIds: [],
    };
  }
  componentWillUnmount() {
    socket.emit("friends-online-status", { userId, online: false });
  }

  componentDidMount() {
    userId = getLocalStorage("userId");
    userId = userId ? parseInt(userId) : null;
    socket.on("friends-online-status", onlineUserIds => {
      this.setState({ onlineUserIds });
    });

    socket.on("user-disconnect", userId => {
      console.log(userId, "@@@@@@");
    });

    socket.emit(
      "friends-online-status",
      { userId, online: true },
      onlineUserIds => {
        this.setState({ onlineUserIds });
      }
    );

    socket.on("user-typing-action", payload => {
      let { chatRoomList } = { ...this.state };
      let chatRoomIndex = _.findIndex(chatRoomList, { id: payload.roomId });
      if (
        chatRoomIndex >= 0 &&
        chatRoomList[chatRoomIndex].isTyping !== payload.isTyping
      ) {
        chatRoomList[chatRoomIndex].isTyping = payload.isTyping;
        this.setState({ chatRoomList });
      }
    });

    socket.on("highlight-private-room", messageObj => {
      let { chatRoomList } = { ...this.state };
      let chatRoomIndex = _.findIndex(chatRoomList, { id: messageObj.roomId });
      if (chatRoomIndex >= 0) {
        if (chatRoomList.length === 1) {
          chatRoomList[0].lastMessage = messageObj;
        } else {
          chatRoomList &&
            chatRoomList.sort(function (a, b) {
              if (a.id === messageObj.roomId) {
                a.lastMessage = messageObj;
              } else if (b.id === messageObj.roomId) {
                b.lastMessage = messageObj;
              }
              return (
                (a.id !== messageObj.roomId) - (b.id !== messageObj.roomId)
              );
            });
        }
        this.setState({ chatRoomList });
      }
      if (messageObj.receiverId === this.props.myProfile.id) {
        this.getChatList();
      }
    });

    this.getChatList();
    this.setState({ leftbar_state: this.props.sendState });
  }
  getChatList = () => {
    chatRequest
      .getChatList()
      .then(res => {
        this.setState({ chatRoomList: res.data.data });
      })
      .catch(e => {
        console.log(e);
      });
  };

  joinFriendRoom = (otherUser, roomMessages) => {
    this.props.joinFriendRoom(otherUser, roomMessages);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      userList: nextProps.userList,
    };
  }
  checkIsOnline = userId => {
    let findId = _.find(
      this.state.onlineUserIds,
      id => parseInt(id) === parseInt(userId)
    );
    return findId;
  };
  showLastMessage = message => {
    let msg = message.message || "Last message goas here";
    message.messageType = message.messageType.toLowerCase();
    let type = message.messageType;
    let icon =
      type === "image"
        ? "fa-file-image-o"
        : type === "audio"
        ? "fa-music"
        : type == "video"
        ? "fa-video-camera"
        : "fa-file";
    if (message.messageType && message.messageType !== "text") {
      return (
        <span>
          <i class={"fa mr-2 ml-2 " + icon} aria-hidden="true"></i>
          {message.messageType.charAt(0).toUpperCase() +
            message.messageType.slice(1)}
        </span>
      );
    }

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
    return (
      <div className="fr-list-body">
        {this.state.chatRoomList &&
          this.state.chatRoomList.map((f_data, k) => (
            <div
              className="fr-item-wrapper c-pointer"
              key={k}
              onClick={() =>
                this.joinFriendRoom(f_data.user, f_data.unreadMessages)
              }
            >
              <div className="fr-item">
                <div className="fr-item-left">
                  <div className="mr-2">
                    <Avatar
                      size={40}
                      textSizeRatio={3}
                      round={true}
                      name={f_data.user.username}
                      src={f_data.user.profileUrl}
                    />
                  </div>
                  <div className=" mt-1">
                    <h6 className="fr-name mb-0">
                      {f_data.user.username}

                      <i
                        className={
                          "fa fa-circle ml-2 fs12" +
                          (this.checkIsOnline(f_data.user.id)
                            ? " text-success "
                            : " text-danger ")
                        }
                        aria-hidden="true"
                      ></i>
                    </h6>
                    <span className="fr-last-text mb-0">
                      <span className={f_data.userExist ? "own-check" : "dn"}>
                        <DoneIcon />
                        {this.showLastMessage(f_data.lastMessage)}

                        <div
                          id="key-press"
                          className={
                            "room-typing-indicator " +
                            (f_data.isTyping ? "" : " d-none")
                          }
                        >
                          <span
                            id="typingUser"
                            style={{ verticalAlign: "middle" }}
                          ></span>
                          <img
                            src="https://www.webrtc-experiment.com/images/key-press.gif"
                            style={{ height: "25px", verticalAlign: "middle" }}
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="fr-item-right">
                  <div className="fr-time-wrapper">
                    <span>
                      {moment(f_data.updatedAt).format("LLL") ||
                        moment(Date.now()).format("LLL")}
                    </span>
                  </div>
                  <div className="more-function-icon-wrapper">
                    <div className="m-f-icon"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.users.userList,
    myProfile: state.users.myProfile,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(usersAction.getUserList()),
  getSpecialUser: (localId, remoteId) =>
    dispatch(usersAction.getSpecialUser(localId, remoteId)),
  getFriendsList: payload => {
    return dispatch({ type: actionTypes.GET_USERLIST, payload });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(friendList);
