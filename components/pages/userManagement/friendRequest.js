import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import * as actionTypes from "../../../redux/actionTypes";
import * as userRequest from "../../../redux/sagas/Requests/userRequest";
import { CircularProgress } from "@material-ui/core";
import Avatar from "react-avatar";

class following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      requestList: [],
    };
  }

  componentDidMount = () => {
    this.getFriendRequest();
  };

  search = e => {
    this.setState(
      {
        search: e.target.value,
      },
      () => {
        this.getFriendRequest({ search: this.state.search });
      }
    );
  };

  getFriendRequest = async payload => {
    if (this.state.requestList.length === 0) {
      this.setState({ showLoader: true });
    }
    userRequest.getFriendRequest(payload).then(res => {
      if (res.status === 200) {
        let data = res.data.data;
        this.setState({ requestList: data, showLoader: false });
      }
    });
  };
  approveRequest = (user, status, request) => {
    userRequest
      .approveRequest({
        requestId: request.id,
        approveStatus: status,
      })
      .then(res => {
        console.log(res);
        this.getFriendRequest();
      });
  };

  render() {
    let { search, showLoader, requestList } = { ...this.state };
    return (
      <div>
        <div className="row float-right m-1">
          <div className="input-group ">
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
            requestList &&
            requestList.map((user, index) => (
              <div className="col-4">
                <div className=" card room-card resize-wh mb-0  user-card">
                  <div className="car d-body p-3">
                    <Avatar
                      size={100}
                      textSizeRatio={3}
                      round={true}
                      name={user.sender.username}
                      src={user.sender.profileUrl}
                    />
                    <div>
                      <div className="h3">{user.sender.username}</div>
                      <div className="h5">{user.sender.email}</div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <button
                            onClick={e =>
                              this.approveRequest(user.sender, "accepted", user)
                            }
                            className="btn btn-primary ml-1"
                          >
                            Accept
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            onClick={e =>
                              this.approveRequest(user.sender, "rejected", user)
                            }
                            className="btn  btn-danger ml-1"
                          >
                            Reject
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
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(following);
