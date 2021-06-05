import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actionTypes from "../../../redux/actionTypes";
import config from "../../../config";
import Avatar from "react-avatar";
import _ from "lodash";
import moment from "moment";
import * as userRequest from "../../../redux/sagas/Requests/userRequest";
import * as generalRequest from "../../../redux/sagas/Requests/generalRequest";
import { getLocalStorage } from "../../../utils/localstorage";

class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: this.props.myProfile,
      showChangePassword: false,
    };
  }

  componentDidMount() {
    console.log(this.props.myProfile);
  }
  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(this.state.myProfile)) {
      this.setState({
        myProfile: nextProps.myProfile,
      });
    }
  }
  handleProfileUpload = e => {
    let file = e.target.files[0];
    this.setState({ profileImgObj: file });
  };
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    let myProfile = this.props.myProfile;
    myProfile[name] = value;
    this.setState({ myProfile });
  };
  saveChcanges = async e => {
    let myProfile = this.state.myProfile;

    let userId = getLocalStorage("userId");
    let uploadFilePath = "";
    e.preventDefault();

    let picturePath = new Promise((resolve, reject) => {
      if (this.state.profileImgObj) {
        let formdata = new FormData();
        formdata.append("folderPath", "profile");
        formdata.append("files", this.state.profileImgObj);
        generalRequest.uploadFiles(formdata).then(res => {
          uploadFilePath = res.data?.message[0];
          myProfile.picturePath = uploadFilePath;
          resolve(res);
        });
      } else {
        resolve(true);
      }
    });
    picturePath.then(res => {
      userRequest.updateProfile(myProfile).then(res => {
        console.log(res);
        if (res.status === 200) this.props.getMyProfile(userId);
      });
    });
  };
  render() {
    let { myProfile, profileImgObj, showChangePassword } = { ...this.state };

    return (
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                          <div className="mx-auto" style={{ width: "140px" }}>
                            <div
                              className="d-flex justify-content-center align-items-center rounded"
                              style={{
                                height: "140px",
                                backgroundColor: "rgb(233, 236, 239)",
                              }}
                            >
                              <span
                                style={{
                                  color: "rgb(166, 168, 170)",
                                  font: "bold 8pt Arial",
                                }}
                              >
                                <Avatar
                                  size={150}
                                  textSizeRatio={3}
                                  round={false}
                                  name={myProfile.username}
                                  src={
                                    profileImgObj
                                      ? URL.createObjectURL(profileImgObj)
                                      : config.imageViewURL +
                                        myProfile.picturePath
                                  }
                                />
                              </span>
                            </div>
                            <input
                              type="file"
                              className="d-none"
                              accept="image/*"
                              id="profile_upload_profile"
                              onChange={e => {
                                this.handleProfileUpload(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                              {myProfile.username}
                            </h4>
                            <p className="mb-0">{myProfile.email}</p>
                            {/* <div className="text-muted"><small>Last seen 2 hours ago</small></div> */}
                            <div className="mt-2">
                              <button
                                className="btn btn-primary theme-bg"
                                type="button"
                                onClick={e =>
                                  document
                                    .getElementById("profile_upload_profile")
                                    ?.click()
                                }
                              >
                                <i className="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                              </button>
                            </div>
                          </div>
                          <div className="text-center text-sm-right">
                            <span className="badge badge-secondary">User</span>
                            <div className="text-muted">
                              <small>
                                {moment(myProfile.createdAt).format("LLL")}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content pt-3 text-white">
                        <div className="tab-pane active">
                          <form className="form" noValidate="">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Full Name</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={myProfile.name}
                                        onChange={e => this.handleChange(e)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Username</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        value={myProfile.username}
                                        name="username"
                                        onChange={e => this.handleChange(e)}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        value={myProfile.city}
                                        onChange={e => this.handleChange(e)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Email</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        disabled
                                        value={myProfile.email}
                                        placeholder="user@example.com"
                                        onChange={e => this.handleChange(e)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label>Description</label>
                                      <textarea
                                        className="form-control"
                                        rows="5"
                                        name="description"
                                        value={myProfile.description}
                                        onChange={e => this.handleChange(e)}
                                        placeholder="My Bio"
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="row">

                                                        </div> */}

                            <div class="row accordion-gradient-bcg d-flex ">
                              <div class="col-9">
                                <div
                                  class="accordion md-accordion accordion-2"
                                  id="accordionEx7"
                                  role="tablist"
                                  aria-multiselectable="true"
                                >
                                  <div class="card">
                                    <div
                                      onClick={() =>
                                        this.setState({
                                          showChangePassword: !showChangePassword,
                                        })
                                      }
                                      class="p-2 c-pointer rgba-stylish-strong"
                                      role="tab"
                                      id="heading1"
                                    >
                                      <span class="mb-1 text-uppercase ">
                                        Change Password
                                      </span>
                                      {showChangePassword ? (
                                        <i class="fa fa-angle-up fa-lg pull-right"></i>
                                      ) : (
                                        <i class="fa fa-angle-down fa-lg pull-right"></i>
                                      )}
                                    </div>

                                    {showChangePassword && (
                                      <div
                                        id="collapse1"
                                        class="collapse show"
                                        role="tabpanel"
                                        aria-labelledby="heading1"
                                        data-parent="#accordionEx7"
                                      >
                                        <div class="card-body mb-1 rgba-grey-light white-text">
                                          <div className="row">
                                            <div className="col">
                                              <div className="mb-2">
                                                <b>Change Password</b>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="form-group">
                                                    <label>
                                                      Current Password
                                                    </label>
                                                    <input
                                                      className="form-control"
                                                      name="currentPassword"
                                                      type="password"
                                                      placeholder="••••••"
                                                      onChange={e =>
                                                        this.handleChange(e)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="form-group">
                                                    <label>New Password</label>
                                                    <input
                                                      className="form-control"
                                                      name="newPassword"
                                                      name="city"
                                                      type="password"
                                                      placeholder="••••••"
                                                      onChange={e =>
                                                        this.handleChange(e)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="form-group">
                                                    <label>
                                                      Confirm{" "}
                                                      <span className="d-none d-xl-inline">
                                                        Password
                                                      </span>
                                                    </label>
                                                    <input
                                                      className="form-control"
                                                      name="confirmPassword"
                                                      type="password"
                                                      placeholder="••••••"
                                                      onChange={e =>
                                                        this.handleChange(e)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col d-flex justify-content-end">
                                                <button
                                                  className="btn btn-primary theme-bg"
                                                  type="submit"
                                                >
                                                  Update Password
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="col-3">
                                <button
                                  className="btn btn-primary theme-bg "
                                  onClick={e => this.saveChcanges(e)}
                                  type="submit"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-3 mb-3">
                {/* <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="px-xl-3">
                                            <button className="btn btn-block btn-secondary">
                                                <i className="fa fa-sign-out"></i>
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title font-weight-bold">Support</h6>
                    <p className="card-text">
                      Get fast, free help from our friendly assistants.
                    </p>
                    <button type="button" className="btn btn-primary theme-bg">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myProfile: state.users.myProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMyProfile: id => {
      return dispatch({ type: actionTypes.GET_USER_DETAILS_BY_ID, id });
    },
    showUserProfileAction: userProfile => {
      return dispatch({
        type: actionTypes.SHOW_USER_PROFILE_ACTION,
        userProfile,
      });
    },
    phizUserProfileClose: () => {
      return dispatch({ type: actionTypes.PHIZ_USER_PROFILE_CLOSE });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
