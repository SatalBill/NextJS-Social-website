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
      folowingList: [],
    };
  }

  componentDidMount = () => {
    this.getFollowersList();
  };

  search = e => {
    this.setState(
      {
        search: e.target.value,
      },
      () => {
        this.getFollowersList({ search: this.state.search });
      }
    );
  };

  getFollowersList = async payload => {
    if (this.state.folowingList.length === 0) {
      this.setState({ showLoader: true });
    }
    userRequest.getFollowersList(payload).then(res => {
      if (res.status === 200) {
        let data = res.data.data;
        this.setState({ folowingList: data, showLoader: true });
      }
    });
  };
  unFollowUser = userId => {
    userRequest.unfollowUser({ userId }).then(res => {
      console.log("***************************", res);
    });
  };

  render() {
    let { search, showLoader, folowingList } = { ...this.state };
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
        {/* <table className="table table-hover text-white">
                    <thead>
                        <tr className="user-table-row">
                            <th>User Name</th>
                            <th>User Email</th>
                        </tr>
                    </thead>
                    {showLoader ? <CircularProgress
                        size={24}
                        style={{
                            color: "#fff"
                        }}
                    /> :
                        <tbody>
                            {folowingList && folowingList.map((user, index) =>
                                <tr key={index} className="user-table-row  c-pointer  ">
                                    <td > {user.username}</td>
                                    <td > {user.email}</td>
                                </tr>
                            )}
                        </tbody>}
                </table> */}
        {showLoader ? (
          <CircularProgress
            size={24}
            style={{
              color: "#fff",
            }}
          />
        ) : (
          folowingList &&
          folowingList.map((user, index) => (
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
                        <button
                          onClick={e => this.unFollowUser(user.id)}
                          className="btn ml-1 btn-primary btn-sm"
                        >
                          Un Follow
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
