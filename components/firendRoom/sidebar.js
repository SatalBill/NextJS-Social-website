import React, { Component } from "react";
// import Popup from 'react-popup';
import SearchBox from "../build/ui-search";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { withRouter } from "react-router-dom";
import * as actionTypes from "../../redux/actionTypes";
import { CircularProgress } from "@material-ui/core";

import FriendList from "./friendList";
import $ from "jquery";
import { connect } from "react-redux";
import * as userRequest from "../../redux/sagas/Requests/userRequest";
// import history from "../../handler/history.handler";
import config from "../../config";
import * as _ from "lodash";
import { getLocalStorage } from "../../utils/localstorage";

let socket = config.socket;
let userId = "";
export class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSidebarState: true,
      sendleftState: "",
      friendList: [],
      showLoader: true,
      onlineUserIds: [],
    };
    this.handleLeftSidebar = this.handleLeftSidebar.bind(this);
    // this.ch = this.ch.bind(this)
  }

  componentDidMount() {
    userId = getLocalStorage("userId");
    userId = userId ? parseInt(userId) : null;

    this.getFriendsList();
    this.setState({ sendleftState: this.state.leftSidebarState });
  }

  handleLeftSidebar() {
    var leftsidebar = document.getElementById("fr-sidebar");
    var friendcontainer = document.getElementsByClassName("friendcontainer")[0];
    this.setState({ leftSidebarState: !this.state.leftSidebarState }, () => {
      if (!this.state.leftSidebarState) {
        leftsidebar.style.width = "100px";
        leftsidebar.style.background = "transparent";
        friendcontainer.style.marginLeft = "100px";
        $(".fr-list-body").addClass("rs-fr-list-body");
      } else {
        leftsidebar.style.width = "320px";
        leftsidebar.style.background = "#2C2F44";
        friendcontainer.style.marginLeft = "332px";
        $(".fr-list-body").removeClass("rs-fr-list-body");
      }
    });
  }

  getFriendsList = async () => {
    this.setState({
      showLoader: true,
    });
    userRequest.getFriendsList().then(res => {
      if (res && res.status === 200) {
        this.setState({
          friendList: res.data.data,
        });
      }
      this.setState({
        showLoader: false,
      });
    });

    // this.props.getFriendsList()
  };

  //ON SELECT EVENT HANDLER FUNCTION
  showUserList = () => {
    this.props.history.push("/dashboard/user-management", {
      searchUser: "Friends",
    });
  };
  joinFriendRoom = (otherUser, roomMessages) => {
    this.props.joinFriendRoom(otherUser, roomMessages);
  };
  checkIsOnline = userId => {
    let findId = _.find(
      this.state.onlineUserIds,
      id => parseInt(id) === parseInt(userId)
    );
    return findId;
  };
  render() {
    const { leftSidebarState, showLoader } = { ...this.state };
    return (
      <div className="f-side-body" id="fr-sidebar">
        <div className="f-side-header pos-re">
          <div
            className={
              this.state.leftSidebarState
                ? "fr-search-wrapper"
                : "rs-fr-search-wrapper"
            }
          >
            <SearchBox />
          </div>
          <div
            className={
              this.state.leftSidebarState
                ? "so-icon-wrapper mb-3"
                : "rs-so-icon-wrapper"
            }
          >
            <div className="s-d-icon c-pointer"></div>
            <div className="s-m-icon c-pointer"></div>
            <span
              className="s-p-icon c-pointer"
              onClick={e => this.showUserList()}
            ></span>
          </div>

          <button
            className={
              leftSidebarState
                ? "size-reduce-btn"
                : "size-reduce-btn rs-size-reduce-btn"
            }
            onClick={this.handleLeftSidebar}
          >
            {leftSidebarState ? (
              <ArrowBackIosRoundedIcon className="arrow-back-icon" />
            ) : (
              <MenuRoundedIcon className="arrow-back-icon" />
            )}
          </button>
        </div>
        {showLoader ? (
          <CircularProgress
            size={40}
            style={{
              color: "#fff",
            }}
            className="sidemenu-loader-center"
          />
        ) : (
          <FriendList
            onlineUserIds={this.state.onlineUserIds}
            joinFriendRoom={(otherUser, roomMessages) =>
              this.joinFriendRoom(otherUser, roomMessages)
            }
            friendList={this.state.friendList}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // getFriendsList: (payload) => { return dispatch({ type: actionTypes.FRIENDS_LIST, payload }) },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(sidebar)
);
