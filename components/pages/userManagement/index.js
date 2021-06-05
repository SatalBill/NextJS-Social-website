import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as _ from "lodash";

import SearchUsers from "./searchUsers";
import Following from "./following";
import Followers from "./followers";
import Friends from "./friends";
import Invites from "./invites";
import FriendRequest from "./friendRequest";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navLinks: [
        "Friend Request",
        "Invites",
        "Following",
        "Followers",
        "Friends",
        "Search Users",
      ],
      activeNav: "Search Users",
    };
  }
  componentDidMount = () => {
    let params = this.props.history.location.state || {};
    let searchUser = params.searchUser;
    if (
      searchUser &&
      _.find(this.state.navLinks, link => link === searchUser)
    ) {
      this.setState({ activeNav: searchUser });
    }
  };

  render() {
    let { activeNav, navLinks } = { ...this.state };
    return (
      <div className="page-content home-content row">
        <div className="top-page-header col-10 position-fixed">
          <nav className="nav nav-pills nav-fill">
            {navLinks.map((link, index) => (
              <a
                key={index}
                className={
                  "nav-item nav-link " + (activeNav === link ? " active" : "")
                }
                onClick={e => this.setState({ activeNav: link })}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div
          className="col-lg-12 home-side-section text-center"
          id="left-section"
          style={{ paddingTop: "136px" }}
        >
          <button
            onClick={e => this.props.history.goBack()}
            className="btn float-right mt-1 theme-bg"
          >
            <i
              className="fa fa-arrow-left text-white   "
              aria-hidden="true"
            ></i>
          </button>
          {activeNav === "Search Users" ? (
            <SearchUsers />
          ) : activeNav === "Following" ? (
            <Following />
          ) : activeNav === "Followers" ? (
            <Followers />
          ) : activeNav === "Friends" ? (
            <Friends />
          ) : activeNav === "Invites" ? (
            <Invites />
          ) : activeNav === "Friend Request" ? (
            <FriendRequest />
          ) : (
            activeNav
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(index));
