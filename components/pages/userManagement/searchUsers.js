import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import * as actionTypes from "../../../redux/actionTypes";
import { CircularProgress } from "@material-ui/core";
import { TvTwoTone } from "@material-ui/icons";
import * as userRequest from "../../../redux/sagas/Requests/userRequest";
import { toast } from "react-toastify";
import Avatar from "react-avatar";

class searchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: "",
    };
  }

  componentDidMount = () => {
    this.props.getFriendsList();
  };
  searchUser = e => {
    this.setState(
      {
        searchUser: e.target.value,
      },
      () => {
        this.props.getFriendsList({ search: this.state.searchUser });
      }
    );
  };

  unfriendFriend = user => {
    userRequest
      .unfriendUser({
        userId: user.id,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.toasterMessage(
            "success",
            res.data.data && res.data.data.message
          );
          this.props.getFriendsList();
        }
      });
  };

  addFriend = user => {
    userRequest
      .sendFriendRequest({
        requestReceiverId: user.id,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.toasterMessage("success", res.data.message);
          this.props.getFriendsList();
        }
      });
  };
  cancelFriendRequest = user => {
    userRequest
      .cancelFriendRequest({
        requestReceiverId: user.id,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.toasterMessage("success", res.data.message);
          this.props.getFriendsList();
        }
      });
  };
  followAction = (userId, action) => {
    if (action === "follow") {
      userRequest.followUser({ userId }).then(res => {
        console.log("***************************", res);
      });
    } else {
      userRequest.unfollowUser({ userId }).then(res => {
        console.log("***************************", res);
      });
    }
  };
  toasterMessage = (type, message) => {
    type = type ? type : "error";
    message = message ? message : "Something went wrong! please contact admin";
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    let { searchUser, showLoader } = { ...this.state };
    return (
      <div>
        <div className="row float-right m-1">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg   "
              name="searchUser"
              placeholder="Search User Name..."
              value={searchUser || ""}
              onChange={e => {
                this.searchUser(e);
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
          {this.props.userList &&
            this.props.userList.map((user, index) => (
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
                        <div className="col-12">
                          {user.isRequestSent ? (
                            <button
                              onClick={e => this.cancelFriendRequest(user)}
                              className="btn btn-secondary"
                            >
                              <i
                                className="fa fa-user-times  mr-1"
                                data-toggle="tooltip"
                                title="Cancel Friend Request"
                                aria-hidden="true"
                              ></i>
                              Cancel Friend Request
                            </button>
                          ) : user.isFriends ? (
                            <button
                              onClick={e => this.unfriendFriend(user)}
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
                          ) : (
                            <button
                              onClick={e => this.addFriend(user)}
                              className="btn btn-success"
                            >
                              <i
                                className=" fa fa-user-plus  mr-1"
                                data-toggle="tooltip"
                                title="Un Friend"
                                aria-hidden="true"
                              ></i>
                              Add Friend
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* <table className="table table-hover text-white">
                    <thead>
                        <tr className="user-table-row">
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {showLoader ? <CircularProgress
                        size={24}
                        style={{
                            color: "#fff"
                        }}
                    /> :
                        <tbody>


                            {this.props.userList && this.props.userList.map((user, index) =>
                                <tr key={index} className="user-table-row  c-pointer  ">
                                    <td > {user.username}</td>
                                    <td > {user.email}</td>
                                    <td >

                                        {user.isRequestSent ?
                                            <button onClick={e => this.cancelFriendRequest(user)} className="btn btn-secondary m-1 btn-sm">
                                                <i
                                                    className="fa fa-user-times  mr-1"
                                                    data-toggle="tooltip"
                                                    title="Cancel Friend Request"
                                                    aria-hidden="true"
                                                ></i>
                                                Cancel</button>

                                            : user.isFriends ?

                                                <button onClick={e => this.unfriendFriend(user)} className="btn btn-success m-1 btn-sm">
                                                    <i
                                                        className="fa fa-user-plus  mr-1"
                                                        data-toggle="tooltip"
                                                        title="Un Friend"
                                                        aria-hidden="true"
                                                    ></i>
                                                Un Friend</button>

                                                :
                                                <button onClick={e => this.addFriend(user)} className="btn btn-primary m-1 btn-sm">
                                                    <i
                                                        className="fas fa-user-check  mr-1"
                                                        data-toggle="tooltip"
                                                        title="Un Friend"
                                                        aria-hidden="true"
                                                    ></i>Friend</button>
                                        }
                                       
                                    </td>
                                </tr>
                            )}
                        </tbody>}

                        
                </table> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.users.userList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFriendsList: payload => {
      return dispatch({ type: actionTypes.GET_USERLIST, payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(searchUsers);
