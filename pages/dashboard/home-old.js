import React, { Component } from "react";
import { connect } from "react-redux";
// import SwiperSlide from "../../home/customSlider";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Config from "../../../config";
import SearchIcon from "@material-ui/icons/Search";
import { Close } from "@material-ui/icons";
import { StackedCarousel } from "react-stacked-carousel";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import appData from "../../../data/topApp.json";
import $ from "jquery";
import * as actions from "../../../actions/room";
import config from "../../../config";
import { getLocalStorage } from "../../../utils/localstorage";

let socket = config.socket;
let userId = getLocalStorage("userId");

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appdata: [],
      searchTerm: null,
    };
    this.props.getAllRoomList();
    this.props.getRoomList();
  }
  componentDidMount() {
    socket.on("update user count", payload => {
      console.log(payload, "@!!!@@@");
    });

    this.props.handleLinkActive("homeState");
    this.setState({ appdata: appData });

    $(".size-reduce-btn").click(function () {
      $(".cover-hidden").toggleClass("cover-resize");
    });

    $("#down").click(function () {
      var topPuls = 880;
      var cPos = Number($("#left-section").scrollTop());
      $("#left-section").scrollTop(topPuls + cPos);
      // console.log(topPuls+cPos);
    });

    $("#up").click(function () {
      $("#left-section").scrollTop(0);
    });
    $(".size-reduce-btn").click(function () {
      $(".scrollBtnGroup").toggleClass("scrollBtnGroupA");
      $(".resize-wh").toggleClass("resize-whA");
      $(".between-img").toggleClass("resize-whB");
      $(".fix-back").css("width", "62%");
      $(".resize-h").toggleClass("resize-hA");
    });
  }

  handleSearch = () => {
    if (this.state.searchTerm) {
      this.setState({
        searchLoading: true,
      });
      this.props.getSearchRooms(this.state.searchTerm);
    }
  };

  clearSearch = () => {
    this.setState(
      {
        searchTerm: null,
        searchLoading: false,
      },
      () => this.props.clearSearchState()
    );
  };

  render() {
    let promotedRooms =
      (this.props.roomList &&
        this.props.roomList.filter(item => !item.isPromoted)) ||
      [];

    return (
      // <div className="page-content home-content row">
      <div className="home-content row">
        {this.props.room && this.props.room.filteredRooms ? (
          this.props.room.filteredRooms.length ? (
            <div className="room-sort">
              {this.props.room.filteredRooms.map((room, id) => {
                return (
                  <Link key={room.id} to={`/room/${room.id}`} className="mr-1">
                    <Card className="room-card small-card resize-wh">
                      <div className="img-body">
                        <Card.Img
                          variant="top"
                          src={
                            Config.serverURL +
                            "/phiz/viewFile/" +
                            room.room_image
                          }
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="mb-2">
                          {room.roomName}
                        </Card.Title>
                        <Card.Text>{room.roomDescription}</Card.Text>
                        <Card.Text>
                          {room.RoomUsers ? room.RoomUsers.length : 0}
                        </Card.Text>
                      </Card.Body>

                      <div className="card-hover-effect">
                        <div className="visitRoomBtn">Visit Room</div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div>
              <p>No room found</p>
            </div>
          )
        ) : (
          <>
            <div
              className="col-lg-8 home-side-section"
              id="left-section"
              style={{ paddingTop: "136px" }}
            >
              <h2 className="content-sub-title">
                GET NOTICE, PROMOTE YOUR ROOM NOW!
              </h2>
              <div className="scrollBtnGroup">
                <div id="up" className="mb-5"></div>
                <div id="down" className="mt-5"></div>
              </div>
              {/* <div className="swiper-slide-body">
                            <div className="cover-hidden ab-left"></div>
                            <SwiperSlide roomList={this.props.room && this.props.room.allFeaturedRooms.map(item => {
                                return {
                                    ...item,
                                    route: `/room/${item.id}`
                                }
                            })} />
                            <div className="cover-hidden ab-right"></div>
                        </div> */}
              <div className="main ">
                <StackedCarousel
                  autoRotate={false}
                  // onCardChange={onCardChange}
                  containerClassName={"container swiper-slide-body"}
                  // cardClassName="card"
                  leftButton={<button className="swiper-button-prev"></button>}
                  rightButton={<button className="swiper-button-next"></button>}
                >
                  {this.props.room &&
                    this.props.room.allPromotedRooms.map((room, id) => {
                      return (
                        <Link key={room.id} to={`/room/${room.id}`}>
                          <Card className="room-card small-card resize-wh">
                            <div className="img-body">
                              <Card.Img
                                variant="top"
                                src={
                                  Config.serverURL +
                                  "/phiz/viewFile/" +
                                  room.room_image
                                }
                              />
                            </div>
                            <Card.Body>
                              <Card.Title className="mb-2">
                                {room.roomName}
                              </Card.Title>
                              <Card.Text>{room.roomDescription}</Card.Text>
                              <Card.Text>
                                {room.RoomUsers ? room.RoomUsers.length : 0}
                              </Card.Text>
                            </Card.Body>

                            <div className="card-hover-effect">
                              <div className="visitRoomBtn">Visit Room</div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                </StackedCarousel>
              </div>
              <div className="promote-room">
                <div className="content-sub-title-body">
                  <span className="middle-line"></span>
                  <h4 className="mb-0 content-sub-title">Promoted Rooms</h4>
                </div>
                <div className="room-sort">
                  {this.props.room &&
                    this.props.room.allPromotedRooms.map((room, id) => {
                      return (
                        <Link key={room.id} to={`/room/${room.id}`}>
                          <Card className="room-card small-card resize-wh">
                            <div className="img-body">
                              <Card.Img
                                variant="top"
                                src={
                                  Config.serverURL +
                                  "/phiz/viewFile/" +
                                  room.room_image
                                }
                              />
                            </div>
                            <Card.Body>
                              <Card.Title className="mb-2">
                                {room.roomName}
                              </Card.Title>
                              <Card.Text>{room.roomDescription}</Card.Text>
                              <Card.Text>
                                {room.RoomUsers ? room.RoomUsers.length : 0}
                              </Card.Text>
                            </Card.Body>

                            <div className="card-hover-effect">
                              <div className="visitRoomBtn">Visit Room</div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}

                  <div className="between-img">
                    <img src="/assets/roomImg/PromotoGroup.jpg" alt=""></img>
                  </div>
                </div>
              </div>
              <div className="promote-room">
                <div className="content-sub-title-body">
                  <span className="middle-line"></span>
                  <h4 className="mb-0 content-sub-title">Directories</h4>
                </div>
                <div className="room-sort">
                  {this.props.room &&
                    this.props.room.allRooms.map((room, id) => {
                      return (
                        <Link key={room.id} to={`/room/${room.id}`}>
                          <Card className="room-card small-card resize-wh">
                            <div className="img-body">
                              <Card.Img
                                variant="top"
                                src={
                                  Config.serverURL +
                                  "/phiz/viewFile/" +
                                  room.room_image
                                }
                              />
                            </div>
                            <Card.Body>
                              <Card.Title className="mb-2">
                                {room.roomName}
                              </Card.Title>
                              <Card.Text>{room.roomDescription}</Card.Text>
                              <Card.Text>
                                {room.RoomUsers ? room.RoomUsers.length : 0}
                              </Card.Text>
                            </Card.Body>

                            <div className="card-hover-effect">
                              <div className="visitRoomBtn">Visit Room</div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  <div className="between-img">
                    <img src="/assets/roomImg/AroundGroup.jpg" alt=""></img>
                  </div>
                </div>
              </div>

              <div className="justity-center mb-5 mt-3">
                <div className="g-back bunHover round-btn home-load-more-btn">
                  Load More
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 home-side-section"
              style={{ paddingTop: "148px" }}
            >
              <div className="right-wiget">
                <div className="pos-re justity-center">
                  {promotedRooms[0] && (
                    <>
                      {" "}
                      <Card className="room-card big-card">
                        <div className="img-body">
                          <Card.Img
                            variant="top"
                            src={
                              promotedRooms[0].room_image
                                ? Config.serverURL +
                                  "/phiz/viewFile/" +
                                  promotedRooms[0].room_image
                                : "/assets/roomImg/big-card.jpg"
                            }
                          />
                        </div>
                        <Card.Body>
                          <Card.Title className="mb-2">
                            {promotedRooms[0]?.roomName}
                          </Card.Title>
                          <Card.Text>
                            {promotedRooms[0]?.roomDescription}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Button
                        className="pos-ab own-promote-btn"
                        variant="contained"
                      >
                        PROMOTE YOUR ROOM
                      </Button>
                    </>
                  )}
                </div>
                <div className="pos-re justity-center mt-big">
                  <div className="wiget-header justity-center">
                    Trending Rooms
                  </div>
                  <div className="wiget-item-body">
                    {this.props.roomList &&
                      this.props.roomList.map((room, j) => {
                        return (
                          <div className="wiget-item mb-3" key={j}>
                            <img
                              src={Config.imageViewURL + room.room_image}
                              alt=""
                              width="60"
                              height="60px"
                            ></img>
                            <span>{room.roomName}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="pos-re justity-center mt-big">
                  <div className="wiget-header justity-center">
                    Top 10 Apps on Phiz
                  </div>
                  <div className="wiget-item-body mb-5">
                    {this.state.appdata.map((app, i) => {
                      return (
                        <div className="wiget-item mb-3" key={i}>
                          <img
                            src={app.appImage}
                            alt=""
                            width="60"
                            height="60px"
                          ></img>
                          <span>{app.appName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room,
  roomList: state.room.roomList,
});

const mapDispatchToProps = dispatch => ({
  getRoomList: () => dispatch(actions.getRoomList()),
  getAllRoomList: () => dispatch(actions.getAllRoomList()),
  getSearchRooms: searchTerm => dispatch(actions.searchRooms(searchTerm)),
  clearSearchState: () =>
    dispatch(actions.setAllRoomList("filteredRooms", null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
