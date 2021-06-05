import React, { Component } from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import UserChatTab from "./tab-chat-box";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import userData from "../../data/userData.json"
import s_gameData from "../../data/share-game.json";
import s_youtubeData from "../../data/youtubeData.json";
import { InputGroup, FormControl } from "react-bootstrap";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ModalUserProfile from "../build/userprofile/index";
import CamerraSetting from "../build/camerasetting/index";
import { P } from "../styles";
import Emmojis from "../../data/emmoji.json";
import RoomGame from "./roomGame";
import MainContent from "./mainContent";
import * as usersAction from "../../redux/actions/users";

import $ from "jquery";

class PromoteRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      voSt: "/assets/icons/volum.svg",
      capState: true,
      ca_setting: false,
    };
    this.props.getUserList();
    this.routeChange = this.routeChange.bind(this);
    this.shareBoxShow = this.shareBoxShow.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.remove_arr = this.remove_arr.bind(this);
    this.add_arr = this.add_arr.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLeftSidebar = this.handleLeftSidebar.bind(this);
    this.handlecloseWindow = this.handlecloseWindow.bind(this);
    this.swichHandler = this.swichHandler.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.swichUC = this.swichUC.bind(this);
    this.modal_user_profile = this.modal_user_profile.bind(this);
    this.camaraSetting = this.camaraSetting.bind(this);
    this.selectEmoji = this.selectEmoji.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ roomGame: true });
    } else {
      this.setState({ roomGame: false });
    }
    // this.setState({ users: this.props.users.userList })
    this.setState({ shardedgame: s_gameData });
    this.setState({ shardedvideo: s_youtubeData });
    this.setState({ emmojis: Emmojis });
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

    var video = document.querySelector("#videoElement");
    //access webcam script
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  }

  selectEmoji(emoji) {
    console.log(emoji);
    this.setState({ selectedemoji: emoji }, () => {
      $(".selected-emoji-wrapper").toggleClass("dn");
      setTimeout(() => {
        $(".selected-emoji-wrapper").toggleClass("dn");
        this.setState({ selectedemoji: "" });
      }, 2500);
      $(".chated-emmoji").css("pointer-events", "none");
      setTimeout(() => {
        $(".chated-emmoji").css("pointer-events", "all");
      }, 2500);
    });
  }

  swichHandler(name, i) {
    if (name === "video") {
      var imgurl1 =
        this.state.vSt === "/assets/icons/video.svg"
          ? "/assets/icons/video-off.svg"
          : "/assets/icons/video.svg";
      this.setState({ vSt: imgurl1 });
      var v_show =
        this.state.vSt === "/assets/icons/video.svg" ? "flex" : "none";
      document.getElementsByClassName("own-videoStop")[
        i
      ].style.display = v_show;
    } else if (name === "mute") {
      var imgurl2 =
        this.state.mSt === "/assets/icons/mute.svg"
          ? "/assets/icons/mic-mute.svg"
          : "/assets/icons/mute.svg";
      var m_show =
        this.state.mSt === "/assets/icons/mute.svg" ? "block" : "none";
      this.setState({ mSt: imgurl2 });
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

  swichUC(name, i) {
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

  showVideo(i) {
    document.getElementsByClassName("own-videoStop")[i].style.display = "none";
    this.setState({ vSt: "/assets/icons/video.svg" });
  }

  remove_arr(index) {
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
      // let arr = this.state.users
      let arr = this.props.users.userList;
      let arr1 = arr.splice(index, 1);
      this.setState({ users: arr });
      let arr2 = this.state.t_users.concat(arr1);
      this.setState({ t_users: arr2 });

      if ($(".own-captuer").css("position") === "absolute") {
        $(".own-captuer").css("position", "relative");
        $(".own-captuer").css("bottom", "0");
        $(".own-captuer").css("right", "0");
        $(".content-footer").css("margin-right", "0");
        $(".join-now-btn").css("margin-left", "0");
      }
    }
  }

  add_arr(index) {
    console.log($(".contact-user").length);

    if ($(".contact-user").length === 1) {
      $(".connected-users").css("border-top", "0px solid #393d56");
      $(".own-captuer").css("position", "absolute");
      $(".own-captuer").css("bottom", "42px");
      $(".own-captuer").css("right", "36.5px");
      $(".content-footer").css("margin-right", "280px");
      $(".join-now-btn").css("margin-left", "14%");
    }

    let arr = this.state.t_users;
    let arr1 = arr.splice(index, 1);
    let arr2 = this.props.users.userList.concat(arr1);
    // let arr2 = this.state.users.concat(arr1)
    this.setState({ users: arr2 });
  }

  routeChange() {
    let path = `/dashboard/home`;
    this.props.history.push(path);
  }

  shareBoxShow() {
    $(".sharededVideo").css("display", "none");
    $(".sharededGame").css("display", "none");
    if (this.state.flag1) {
      $(".share-item-wraper").slideToggle();
      $(".full-background").toggle();
    } else {
      this.setState({ flag1: true });
      $("#modal-youtubeLink").css("display", "none");
      $("#modal-youtube").css("display", "none");
      $("#modal-game").css("display", "none");
      $(".share-item-wraper").slideToggle();
    }
  }

  handleModal(name) {
    this.setState({ flag1: !this.state.flag1 });
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

  handleShare(m_type) {
    if (m_type === "y_share") {
      $("#modal-youtube").slideToggle();
      $(".sharededVideo").css("display", "block");
    }

    if (m_type === "game") {
      $("#modal-game").slideToggle();
      $(".sharededGame").css("display", "block");
    }
  }

  camaraSetting() {
    $("#modal-camera-setting").slideToggle();
    $(".full-background").toggle();
    this.setState({ ca_setting: !this.state.ca_setting });
    if (this.state.ca_setting) {
    }
  }

  closeModal() {
    this.setState({ flag1: true });
    $(".share-item-wraper").css("display", "none");
    $(".full-background").css("display", "none");
    $("#modal-youtubeLink").css("display", "none");
    $("#modal-youtube").css("display", "none");
    $("#modal-game").css("display", "none");
    $("#modal-user-profile").css("display", "none");
    $("#modal-camera-setting").css("display", "none");
  }

  handleLeftSidebar() {
    if (this.state.rsvState) {
      $(".users-item-body").addClass("resizeActive");
    } else {
      $(".users-item-body").removeClass("resizeActive");
      $(".exit-icon-wraper").css("transform", "translate(0px, 0px)");
    }
    this.setState({ rsvState: !this.state.rsvState });
  }

  handlecloseWindow() {
    if (this.state.rsvState) {
      $(".item-f").css("border", "2px solid #ff8300");
    } else {
      $(".item-f").css("border", "none");
      $(".exit-icon-wraper").css("transform", "translate(2px, -36px)");
    }
  }

  showProfile(index) {
    console.log(index);
    $("#modal-user-profile").slideToggle();
    $(".full-background").toggle();
    this.setState({ userId: index });
  }

  modal_user_profile(index) {
    return <ModalUserProfile userId={this.state.userId} />;
  }

  render() {
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
              <img
                src={"/assets/popula/phiz_icon.png"}
                width={"154px"}
                alt=""
              />
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
                {this.props.users.userList.map((user, id) => {
                  return this.props.users.userList.length - 1 ===
                    // return this.state.users.length - 1 ===
                    id ? (
                    <div
                      className="profile-item horizontal-center p-2 pl-4 bb-available"
                      key={id}
                    >
                      <div
                        className="horizontal-center"
                        onClick={() => this.showProfile(id)}
                      >
                        <span className="u-profile">
                          <img src={user.profile} width={"35px"} alt=""></img>
                        </span>
                        <span
                          className="r-name mt-0"
                          style={{ fontSize: "14px" }}
                        >
                          {user.userName}
                        </span>
                      </div>
                      <div className="hoverGift g-back">
                        <div className="gift-icon"></div>
                        <div className="small-message-icon"></div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="profile-item horizontal-center p-2 pl-4"
                      key={id}
                    >
                      <div
                        className="horizontal-center"
                        onClick={() => this.showProfile(id)}
                      >
                        <span className="u-profile">
                          <img src={user.profile} width={"35px"} alt=""></img>
                        </span>
                        <span
                          className="r-name mt-0"
                          style={{ fontSize: "14px" }}
                        >
                          {user.userName}
                        </span>
                      </div>
                      <div className="hoverGift g-back">
                        <div className="gift-icon"></div>
                        <div className="small-message-icon"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="item-f pos-ab horizontal-center g-back"
              onClick={this.routeChange}
              onMouseEnter={this.handlecloseWindow}
            >
              <div className="exit-icon-wraper">
                <img src={"/assets/icons/exit.svg"} width={"29px"} alt="" />
              </div>
              <span onClick={this.routeChange}>Exit Room</span>
            </div>
            <button
              onClick={this.handleLeftSidebar}
              className="size-reduce-btn mt-2"
            >
              {this.state.rsvState ? (
                <ArrowBackIosRoundedIcon className="arrow-back-icon" />
              ) : (
                <MenuRoundedIcon className="arrow-back-icon" />
              )}
            </button>
          </div>
          <MainContent
            data={{
              roomGame: this.state.roomGame,
              users: this.props.users.userList,
              // users: this.state.users,
              vst: this.state.vst,
              mst: this.state.mst,
              vost: this.state.vost,
              shardedvideo: this.state.shardedgame,
              shardedgame: this.state.shardedgame,
              t_users: this.state.t_users,
              selectedemoji: this.state.selectedemoji,
              emmojis: this.state.emmojis,
              own: this.state.own,
            }}
          />

          <div className="resize-available users-chat-body">
            <UserChatTab />
          </div>

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
                    onClick={() => this.handleShare("y_share")}
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
                    onClick={() => this.handleShare("y_share")}
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
                    onClick={() => this.handleShare("y_share")}
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
                    onClick={() => this.handleShare("game")}
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
                    onClick={() => this.handleShare("game")}
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
                    onClick={() => this.handleShare("game")}
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
            {this.modal_user_profile()}
          </div>

          {/*--------------------- camera setting Modal---------------------------- */}
          <div id="modal-camera-setting" className="media-modal dn">
            <CamerraSetting />
          </div>
        </div>

        {/* ------------------------modal back---------------------------- */}
        <div className="full-background" onClick={this.closeModal}></div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(usersAction.getUserList()),
  getSpecialUser: (localId, remoteId) =>
    dispatch(usersAction.getSpecialUser(localId, remoteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoteRoom);
