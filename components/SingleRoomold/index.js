import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import { FormInput, GradiantButton, P } from "../../components/styles";
import io from "socket.io-client";
import { connect } from "react-redux";

import * as roomAction from "../../redux/actions/room";
import * as usersAction from "../../redux/actions/users";
import h from "./helpers.js";
import ChatBot from "../../components/build/i-chatbox";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Emmojis from "../../data/emmoji.json";
import InstantUsers from "./instantusers";
import SubToolTip from "../../components/build/i-chatbox/toolTip";

import UserChatTab from "./tab-chat-box";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import userData from "../../data/userData.json"
import s_gameData from "../../data/share-game.json";
import s_youtubeData from "../../data/youtubeData.json";
import { InputGroup, FormControl } from "react-bootstrap";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ModalUserProfile from "../../components/build/userprofile/index";
import RoomGame from "./roomGame";
import MainContent from "./mainContent";
import * as _ from "lodash";

import Avatar from "react-avatar";
import config from "../../config";

import * as actionTypes from "../../redux/actionTypes";
import { getLocalStorage } from "../../utils/localstorage";

let socket = config.socket;

const SingleRoom = props => {
  const { id } = useParams();
  const room = id;
  const roomId = id;
  const roomReducer = useSelector(state => state.room);
  const usersData = useSelector(state => state.users);
  // const roomUsersList = useSelector(state => state.roomUsersList)

  const dispatch = useDispatch();
  const username = getLocalStorage("userName");
  let userId = getLocalStorage("userId");
  const [roomData, setRoomData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatBoxValue, setChatBoxValue] = useState(null);
  const [showChatWindow, setChatWindow] = useState(false);
  const [roomUsersList, setRoomUsersList] = useState([]);

  const [showVideo, setShowVieo] = useState(true);
  const [participentsList, setParticipentsList] = useState([]);
  const [state, setState] = useState({
    chatType: true,
    fr_data: [],
    roomGame: false,
    users: [],
    shardedgame: [],
    shardedvideo: [],
    t_users: [],
    emmojis: [],
    flag1: true,
    own: true,
    rsvState: true,
    userId: 0,
    selectedemoji: "",
    vSt: "/assets/icons/video.svg",
    mSt: "/assets/icons/mute.svg",
    vost: "/assets/icons/volum.svg",
    capState: true,
    ca_setting: false,
  });
  useEffect(() => {
    socket.on("user-joined-group", roomUsers => {
      console.log(roomUsers, "@@@@@@@@@");
      setRoomUsersList(roomUsers);
    });
    socket.on("user-leaves-group", roomUsers => {
      console.log(roomUsers, "@@@ user-leaves-group @@@@@@");
      setRoomUsersList(roomUsers);
    });

    socket.emit("all users", roomUsers => {
      setRoomUsersList(roomUsers);
    });
    if (userId && _.isEmpty(props.myProfile)) {
      console.log("@@@@@@@@@", userId);
      props.getMyProfile(userId);
    }

    return () => {
      let obj = {
        roomId: roomId,
        user: props.myProfile,
      };
      console.log(obj, "!!!!!!!!!!!!!!!!!!!!!!");
      socket.emit("leave-group", obj);
    };
  }, []);

  useEffect(() => {
    start();
    // dispatch(roomAction.getEditAndDeleteRoom(room));
    // dispatch(usersAction.getUserList(userId))

    if (room) {
      // props.joinRoom(room, userId);
      // socket.emit("publicRoomJoin", room)
      // socket.on('connection', ()=> {
      //     socket.on("newRoomMessage", message => {
      //         console.log("newRoomMessage-------->", message)
      //     })
      // })
    }
    return () => {
      // props.leaveRoom(room, userId);
      // socket.emit("publicRoomLeave", room)
      // dispatch(roomAction.getEditAndDeleteRoomSuccess([]));
    };
  }, []);
  useEffect(() => {
    if (!_.isEmpty(props.myProfile)) {
      console.log(props.myProfile, "#########");

      props.getRoomUsers(roomId);
      let obj = {
        roomId: roomId,
        user: props.myProfile,
      };
      socket.emit("join-group", obj, roomDetails => {
        console.log(roomDetails, "!!!!!!!!!");
        setRoomUsersList(roomDetails.roomUsers);
      });

      // socket.emit("join room", obj, payload => {
      //     console.log(payload, obj,"EEEEE");
      // })
    }
  }, [props.myProfile]);

  useEffect(() => {
    if (roomData) {
      const tempFriArr = roomData.friendList.split(",");
      let friArr = [];

      for (let i = 0; i < tempFriArr.length; i++) {
        const tempFriendsArr = usersData.userList.map(friend => {
          if (
            friend.id === parseInt(tempFriArr[i]) &&
            tempFriArr[i] !== room?.user_id?.toString()
          ) {
            friArr.push(friend);
          }
        });
      }
      console.log("friArr", friArr, tempFriArr, usersData.userList);
      if (friArr[0]) {
        setParticipentsList(friArr);
      }
    }
  }, [roomData, usersData.userList]);

  function start() {
    if (props.location.state) {
      setState({ ...state, roomGame: true });
    } else {
      setState({ ...state, roomGame: false });
    }
    // setState({...state, users: props.users.userList })
    setState({ ...state, shardedgame: s_gameData });
    setState({ ...state, shardedvideo: s_youtubeData });
    setState({ ...state, emmojis: Emmojis });

    setTimeout(() => {
      $("#preloder").css("display", "none");
      $("body").addClass("open");
    }, 2000);

    if (window.history && window.history) {
      $(window).on("popstate", function () {
        $("body").removeClass("open");
      });
    }

    $(".modal-back").click(function () {
      $(this).closest(".media-modal").slideToggle();
    });

    $(".close-shared-window").click(function () {
      $(this).closest(".m-shared").css("display", "none");
    });
  }

  function selectEmoji(emoji) {
    console.log(emoji);
    setState({ ...state, selectedemoji: emoji }, () => {
      $(".selected-emoji-wrapper").toggleClass("dn");
      setTimeout(() => {
        $(".selected-emoji-wrapper").toggleClass("dn");
        setState({ ...state, selectedemoji: "" });
      }, 2500);
      $(".chated-emmoji").css("pointer-events", "none");
      setTimeout(() => {
        $(".chated-emmoji").css("pointer-events", "all");
      }, 2500);
    });
  }

  function swichHandler(name, i) {
    if (name === "video") {
      var imgurl1 =
        state.vSt === "/assets/icons/video.svg"
          ? "/assets/icons/video-off.svg"
          : "/assets/icons/video.svg";
      setState({ ...state, vSt: imgurl1 });
      var v_show = state.vSt === "/assets/icons/video.svg" ? "flex" : "none";
      document.getElementsByClassName("own-videoStop")[
        i
      ].style.display = v_show;
    } else if (name === "mute") {
      var imgurl2 =
        state.mSt === "/assets/icons/mute.svg"
          ? "/assets/icons/mic-mute.svg"
          : "/assets/icons/mute.svg";
      var m_show = state.mSt === "/assets/icons/mute.svg" ? "block" : "none";
      setState({ ...state, mSt: imgurl2 });
      document.getElementsByClassName("mic-mute-show")[
        i
      ].style.display = m_show;
    } else {
      var dis =
        document.getElementsByClassName("volume-control-range")[i].style
          .display === "block"
          ? "none"
          : "block";
      document.getElementsByClassName("volume-control-range")[
        i
      ].style.display = dis;
    }
  }

  function swichUC(name, i) {
    console.log(name, i);
    if (name === "volum") {
      var dis =
        document.getElementsByClassName("own-volum-warraperA")[i].style
          .display === "block"
          ? "none"
          : "block";
      document.getElementsByClassName("own-volum-warraperA")[
        i
      ].style.display = dis;
    } else if (name === "mute") {
      var umic =
        document.getElementsByClassName("users-mic-mute")[i].style.display ===
        "block"
          ? "none"
          : "block";
      document.getElementsByClassName("users-mic-mute")[i].style.display = umic;
    } else if (name === "video") {
      var v_show =
        document.getElementsByClassName("user-camera")[i].style.display ===
        "flex"
          ? "none"
          : "flex";
      document.getElementsByClassName("user-camera")[i].style.display = v_show;
    }
  }

  function showVideoTest(i) {
    document.getElementsByClassName("own-videoStop")[i].style.display = "none";
    setState({ ...state, vSt: "/assets/icons/video.svg" });
  }

  function remove_arr(index) {
    console.log($(".contact-user").length);

    if ($(".contact-user").length > 2) {
      $(".connected-users").css("height", "auto");
      $(".connected-users").css("border-top", "2px solid #393d56");
      $(".connected-users").css("justify-content", "flex-end");
    } else {
      $(".connected-users").css("height", "330px");
      $(".connected-users").css("border-top", "0px solid #393d56");
      $(".connected-users").css("justify-content", "center");
    }

    if ($(".shareMediaWrapper").height() <= 0) {
      // let arr = state.users
      let arr = props.users.userList;
      let arr1 = arr.splice(index, 1);
      setState({ ...state, users: arr });
      let arr2 = state.t_users.concat(arr1);
      setState({ ...state, t_users: arr2 });

      if ($(".own-captuer").css("position") === "absolute") {
        $(".own-captuer").css("position", "relative");
        $(".own-captuer").css("bottom", "0");
        $(".own-captuer").css("right", "0");
        $(".content-footer").css("margin-right", "0");
        $(".join-now-btn").css("margin-left", "0");
      }
    }
  }

  function add_arr(index) {
    console.log($(".contact-user").length);

    if ($(".contact-user").length === 1) {
      $(".connected-users").css("border-top", "0px solid #393d56");
      $(".own-captuer").css("position", "absolute");
      $(".own-captuer").css("bottom", "42px");
      $(".own-captuer").css("right", "36.5px");
      $(".content-footer").css("margin-right", "280px");
      $(".join-now-btn").css("margin-left", "14%");
    }

    let arr = state.t_users;
    let arr1 = arr.splice(index, 1);
    let arr2 = props.users.userList.concat(arr1);
    // let arr2 = state.users.concat(arr1)
    setState({ ...state, users: arr2 });
  }

  function exitRoom() {
    // let path = `/dashboard/home`
    if (window.confirm("Are you sure you want to exit room?")) {
      props.history.push("/dashboard/home");
      socket.emit("leave-group", { roomId: roomId, user: props.myProfile });
    }
  }

  function shareBoxShow() {
    $(".sharededVideo").css("display", "none");
    $(".sharededGame").css("display", "none");
    if (state.flag1) {
      $(".share-item-wraper").slideToggle();
      $(".full-background").toggle();
    } else {
      setState({ ...state, flag1: true });
      $("#modal-youtubeLink").css("display", "none");
      $("#modal-youtube").css("display", "none");
      $("#modal-game").css("display", "none");
      $(".share-item-wraper").slideToggle();
    }
  }

  function handleModal(name) {
    setState({ ...state, flag1: !state.flag1 });
    if (name === "youtubelink") {
      $("#modal-youtubeLink").slideToggle();
      $(".share-item-wraper").slideToggle();
    }
    if (name === "youtube") {
      $("#modal-youtube").slideToggle();
      $(".share-item-wraper").slideToggle();
    }
    if (name === "game") {
      $("#modal-game").slideToggle();
      $(".share-item-wraper").slideToggle();
    }
  }

  function handleShare(m_type) {
    if (m_type === "y_share") {
      $("#modal-youtube").slideToggle();
      $(".sharededVideo").css("display", "block");
    }

    if (m_type === "game") {
      $("#modal-game").slideToggle();
      $(".sharededGame").css("display", "block");
    }
  }

  function camaraSetting() {
    $("#modal-camera-setting").slideToggle();
    $(".full-background").toggle();
    setState({ ...state, ca_setting: !state.ca_setting });
    if (state.ca_setting) {
    }
  }

  function closeModal() {
    setState({ ...state, flag1: true });
    $(".share-item-wraper").css("display", "none");
    $(".share-chat-item-wraper").css("display", "none");

    $(".full-background").css("display", "none");
    $("#modal-youtubeLink").css("display", "none");
    $("#modal-youtube").css("display", "none");
    $("#modal-game").css("display", "none");
    $("#modal-user-profile").css("display", "none");
    $("#modal-camera-setting").css("display", "none");
  }

  function handleLeftSidebar() {
    if (state.rsvState) {
      $(".users-item-body").addClass("resizeActive");
    } else {
      $(".users-item-body").removeClass("resizeActive");
      $(".exit-icon-wraper").css("transform", "translate(0px, 0px)");
    }
    setState({ ...state, rsvState: !state.rsvState });
  }

  function handlecloseWindow() {
    if (state.rsvState) {
      $(".item-f").css("border", "2px solid #ff8300");
    } else {
      $(".item-f").css("border", "none");
      $(".exit-icon-wraper").css("transform", "translate(2px, -36px)");
    }
  }

  function showProfile(index) {
    console.log(index);
    $("#modal-user-profile").slideToggle();
    $(".full-background").toggle();
    setState({ ...state, userId: index });
  }

  function modal_user_profile(index) {
    return <ModalUserProfile userId={state.userId} />;
  }

  const sendMessage = () => {
    if (chatBoxValue?.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          message: chatBoxValue?.trim(),
          senderId: userId,
          roomId: room,
          created_at: new Date(),
        },
      ]);
    }
    setChatBoxValue(null);
  };
  const changeChatBoxValue = e => {
    setChatBoxValue(e.target.value);
  };

  const setChatWindowState = value => {
    setChatWindow(value);
  };

  // const setChatType = (type) => {
  //     setState({
  //         chatType: type
  //     })
  // }

  const getUserListOrder = userList => {
    return userList.reduce((acc, element) => {
      if (element.id === parseInt(userId)) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);
  };

  return (
    <>
      <div className="promote-page">
        <div id="preloder">
          <div className="loader">
            <img src={"/assets/icons/loading.gif"} alt="loading" />
          </div>
        </div>
        <div className="panel left"></div>
        <div className="panel right"></div>
        <div className="resize-available users-item-body pos-re">
          <div className="item-h g-back">
            <img src={"/assets/popula/phiz_icon.png"} width={"154px"} alt="" />
          </div>
          <div className="item-c">
            <div className="p-3">
              <div className="search-box">
                <div className="searchIcon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
            <h5
              className="mr-2"
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "#ff7800",
              }}
            >
              Room Users
            </h5>
            <div className="user-item-wrapper">
              {roomUsersList &&
                getUserListOrder(roomUsersList).map((user, id) => {
                  return (
                    <div
                      className="profile-item horizontal-center p-4 pl-4 bb-available"
                      key={id}
                    >
                      <span>
                        <span className="u-profile mr-2">
                          <Avatar
                            size={30}
                            textSizeRatio={3}
                            round={true}
                            name={user.name ? user.name : user.username}
                            src={config.imageViewURL + user.picturePath}
                          />
                        </span>

                        {parseInt(userId) === parseInt(user.id)
                          ? "You"
                          : user.name
                          ? user.name
                          : user.username}
                      </span>
                      <div
                        className="horizontal-center"
                        onClick={() => {
                          showProfile(id);
                        }}
                      >
                        <span
                          className="r-name mt-0"
                          style={{ fontSize: "14px" }}
                        >
                          {user.username}
                        </span>
                      </div>
                      {parseInt(userId) === parseInt(user.id) ? null : (
                        <div className="hoverGift g-back">
                          <div className="gift-icon"></div>
                          <div
                            className="small-message-icon"
                            onClick={() => setChatWindowState(!showChatWindow)}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            className="item-f pos-ab horizontal-center g-back"
            onClick={exitRoom}
          >
            <div className="exit-icon-wraper">
              <img src={"/assets/icons/exit.svg"} width={"29px"} alt="" />
            </div>
            <span>Exit Room</span>
          </div>
          <button onClick={handleLeftSidebar} className="size-reduce-btn mt-2">
            {state.rsvState ? (
              <ArrowBackIosRoundedIcon className="arrow-back-icon" />
            ) : (
              <MenuRoundedIcon className="arrow-back-icon" />
            )}
          </button>
        </div>
        <MainContent
          setChatWindowState={() => setChatWindowState(!showChatWindow)}
          data={{
            roomGame: state.roomGame,
            users: participentsList,
            // users: state.users,
            joinRoom: props.joinRoom,
            leaveRoom: props.leaveRoom,
            room: roomData,
            roomId: room,
            userId: userId,
            isJoined: Boolean(
              participentsList.filter(
                item => item.id.toString() === userId.toString()
              ).length
            ),
            vst: state.vst,
            mst: state.mst,
            vost: state.vost,
            shardedvideo: state.shardedgame,
            shardedgame: state.shardedgame,
            t_users: state.t_users,
            selectedemoji: state.selectedemoji,
            emmojis: state.emmojis,
            own: state.own,
          }}
        />

        {showChatWindow && (
          <div className="resize-available users-chat-body">
            <UserChatTab
              socket={socket}
              roomId={room}
              chatType={state.chatType}
              roomUsersList={roomUsersList}
              userName={username}
              userId={parseInt(userId)}
            />
          </div>
        )}

        {/*--------------------- youtube link Modal---------------------------- */}
        <div
          id="modal-youtubeLink"
          className="media-modal share-modal"
          style={{ display: "none" }}
        >
          <div className="modal-header pos-re">
            <div className="pos-ab g-back bunHover modal-back">
              <span className="small-back-icon">
                <ArrowBackIosIcon />
              </span>
            </div>
            <h3>Link Sharing</h3>
          </div>
          <div className="modal-body" style={{ textAlign: "center" }}>
            <InputGroup className="mb-3 round-input">
              <FormControl
                placeholder="Paste your YouTube link here"
                aria-label="YoutubeLink"
                aria-describedby="basic-addon1"
                style={{ height: "52px" }}
              />
            </InputGroup>
            <Button className="g-back bunHover">Go!</Button>
          </div>
        </div>

        {/*--------------------- youtube Modal---------------------------- */}
        <div
          id="modal-youtube"
          className="media-modal"
          style={{ display: "none" }}
        >
          <div className="modal-content share-modal">
            <div className="modal-header pos-re">
              <div className="pos-ab g-back bunHover modal-back">
                <span className="small-back-icon">
                  <ArrowBackIosIcon />
                </span>
              </div>
              <h3>Live Sharing</h3>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <div className="socialism">
                <img src={"/assets/popula/yotube.png"} alt="youtube" />
                <h3>YouTube</h3>
                <div className="search-icon"></div>
                <img src={"/assets/popula/n.svg"} alt="nSvg" />
              </div>

              <div className="mt-3">
                <iframe
                  title="dflsf"
                  width="100%"
                  height="288px"
                  src="https://www.youtube.com/embed/zCgweqpelFU?start=16"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div
                className="shareButton-wraper mt-3"
                style={{ justifyContent: "flex-end" }}
              >
                <Button
                  className="g-back bunHover"
                  onClick={() => handleShare("y_share")}
                >
                  Share
                </Button>
              </div>

              <div className="mt-3">
                <iframe
                  title="dflsf"
                  width="100%"
                  height="288px"
                  src="https://www.youtube.com/embed/zCgweqpelFU?start=16"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div
                className="shareButton-wraper mt-3"
                style={{ justifyContent: "flex-end" }}
              >
                <Button
                  className="g-back bunHover"
                  onClick={() => handleShare("y_share")}
                >
                  Share
                </Button>
              </div>

              <div className="mt-3">
                <iframe
                  title="dflsf"
                  width="100%"
                  height="288px"
                  src="https://www.youtube.com/embed/zCgweqpelFU?start=16"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div
                className="shareButton-wraper mt-3"
                style={{ justifyContent: "flex-end" }}
              >
                <Button
                  className="g-back bunHover"
                  onClick={() => handleShare("y_share")}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/*--------------------- game Modal---------------------------- */}
        <div
          id="modal-game"
          className="media-modal"
          style={{ display: "none" }}
        >
          <div className="modal-content share-modal">
            <div className="modal-header pos-re">
              <div className="pos-ab g-back bunHover modal-back">
                <span className="small-back-icon">
                  <ArrowBackIosIcon />
                </span>
              </div>
              <h3>Game Sharing</h3>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <div className="socialism">
                <h3>Phiz Games</h3>
                <img src={"/assets/popula/n.svg"} alt="nSvg" />
              </div>
              <div className="mt-3">
                <img
                  src={"/assets/popula/game2.png"}
                  alt="game"
                  width={"500px"}
                />
              </div>
              <div
                className="shareButton-wraper mt-3"
                style={{ justifyContent: "center" }}
              >
                <Button
                  className="g-back bunHover"
                  onClick={() => handleShare("game")}
                >
                  Share & Play
                </Button>
              </div>

              <div className="mt-3">
                <img
                  src={"/assets/popula/game2.png"}
                  alt="game"
                  width={"500px"}
                />
              </div>
              <div
                className="shareButton-wraper mt-3"
                style={{ justifyContent: "center" }}
              >
                <Button
                  className="g-back bunHover"
                  onClick={() => handleShare("game")}
                >
                  Share & Play
                </Button>
              </div>

              <div className="mt-3">
                <img
                  src={"/assets/popula/game2.png"}
                  alt="game"
                  width={"500px"}
                />
              </div>
              <div
                className="shareButton-wraper mt-3"
                style={{ justifyContent: "center" }}
              >
                <Button
                  className="g-back bunHover"
                  onClick={() => handleShare("game")}
                >
                  Share & Play
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/*--------------------- user profile Modal---------------------------- */}
        <div
          id="modal-user-profile"
          className="media-modal"
          style={{ display: "none" }}
        >
          {modal_user_profile()}
        </div>
      </div>

      {/* ------------------------modal back---------------------------- */}
      <div className="full-background" onClick={closeModal}></div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    room: state.room,
    users: state.users,
    myProfile: state.users.myProfile,
    myFriendsList: state.users.myFriendsList,
    roomUsersList: state.room.roomUsersList,
  };
}

const mapDispatchToProps = dispatch => ({
  getMyProfile: id => {
    return dispatch({ type: actionTypes.GET_USER_DETAILS_BY_ID, id });
  },
  getRoomUsers: id => {
    return dispatch({ type: actionTypes.GET_ROOM_USERS, id });
  },
  getFriendsList: () => {
    return dispatch({ type: actionTypes.GET_MY_FRIENDSLIST });
  },

  // getUserList: (userId) => dispatch(usersAction.getUserList(userId)),
  // getRoomList: () => dispatch(roomAction.getRoomList()),
  // joinRoom : (roomId, userId) => dispatch(roomAction.joinRoom(roomId, userId)),
  // leaveRoom : (roomId, userId) => dispatch(roomAction.leaveRoom(roomId, userId)),
  // getEditAndDeleteRoom: (roomId) =>
  //     dispatch(roomAction.getEditAndDeleteRoom(roomId)),
  // addAndUpdateAndDelete: (
  //     roomName,
  //     roomDescription,
  //     roomImage,
  //     userId,
  //     roomId,
  //     friendList,
  //     promoteRoom,
  //     deleteRoom
  // ) =>
  //     dispatch(
  //         roomAction.addAndUpdateAndDelete(
  //             roomName,
  //             roomDescription,
  //             roomImage,
  //             userId,
  //             roomId,
  //             friendList,
  //             promoteRoom,
  //             deleteRoom
  //         )
  //     ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoom);
