import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import * as actionTypes from "../../../redux/actionTypes";
import * as userRequest from "../../../redux/sagas/Requests/userRequest";
import { withRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import Avatar from "react-avatar";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      friendsList: [],
    };
  }

  componentDidMount = () => {
    this.getFriendsList();
  };
  search = e => {
    this.setState(
      {
        search: e.target.value,
      },
      () => {
        this.getFriendsList({ search: this.state.search });
      }
    );
  };

  unfriendUser = user => {
    userRequest
      .unfriendUser({
        userId: user.id,
      })
      .then(res => {
        console.log(res);
        this.getFriendsList();
      });
  };
  getFriendsList = async payload => {
    if (this.state.friendsList.length === 0) {
      this.setState({ showLoader: true });
    }
    userRequest.getFriendsList(payload).then(res => {
      if (res.status === 200) {
        let data = res.data.data;
        this.setState({ friendsList: data, showLoader: false });
      }
    });
  };

  startChat = user => {
    this.props.history.push("/dashboard/friends", { otherUser: user });
  };

  render() {
    let { search, showLoader, friendsList } = { ...this.state };
    return (
      <div>
        <div className="row float-right m-1">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg   "
              name="search"
              placeholder="Search User Name..."
              value={search || ""}
              onChange={e => {
                this.search(e);
              }}
              aria-label=""
              aria-describedby="basic-addon1"
            />
            <span className="input-group-append ">
              <span className="input-group-text bg-secondry">
                <i className=" fa fa-search"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="row col-12">
          {showLoader ? (
            <CircularProgress
              size={24}
              style={{
                color: "#fff",
              }}
              className="table-loader"
            />
          ) : (
            friendsList &&
            friendsList.map((user, index) => (
              <div className="col-4">
                <div className=" card room-card resize-wh mb-0  user-card">
                  <div className="car d-body p-3">
                    <Avatar
                      size={100}
                      textSizeRatio={3}
                      round={true}
                      name={user.username}
                      src={user.profileUrl}
                    />
                    <div>
                      <div className="h3">{user.username}</div>
                      <div className="h5">{user.email}</div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <button
                            onClick={e => this.unfriendUser(user)}
                            className="btn btn-primary "
                          >
                            <i
                              className="fa fa-user-times  mr-1"
                              data-toggle="tooltip"
                              title="Un Friend"
                              aria-hidden="true"
                            ></i>
                            Un Friend
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            onClick={e => this.startChat(user)}
                            className="btn btn-success"
                          >
                            <i
                              className="fa fa-message  1"
                              data-toggle="tooltip"
                              title="Un Friend"
                              aria-hidden="true"
                            ></i>
                            Start Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.users.userList,
    myProfile: state.users.myProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Friends)
);
