import React, { Component } from "react";

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleUpgrade(e) {
    console.log(e);
    // e.preventDefault()
    // return false
  }
  render() {
    return (
      <header id="header" className="header-transparent header-fixed">
        <div
          className="container-fluid"
          style={{ marginTop: 0, marginBottom: 0, padding: "0 6%" }}
        >
          <div id="logo" className="pull-left">
            <h1>
              <img src="/assets/landing/phiz logo.png" alt="" />
              {/* <a href="index.html" className="scrollto">
                                Avilon
                            </a> */}
            </h1>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li className="menu-active">
                <button className="btn-other">Home</button>
              </li>
              <li>
                <button
                  className="btn-other"
                  onClick={() => this.handleUpgrade()}
                >
                  Upgrade
                </button>
              </li>
              <li className="menu-has-children">
                <button
                  className="btn-other dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Discover
                </button>
                <div
                  className="dropdown-menu row"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="col-lg-6">
                    <div className="box wow fadeInLeft">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/rooms.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Rooms</a>
                      </h4>
                      <p className="description">
                        Discover rooms for entertainment, gaming organization
                        and other purposes.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box wow fadeInRight">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/games.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Games</a>
                      </h4>
                      <p className="description">
                        Download and play games with your friends and
                        room-friends with our exciting games.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box wow fadeInLeft">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/connect.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Random Connect</a>
                      </h4>
                      <p className="description">
                        Connect randomly to different users around the globe
                        with just a click of a button.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box wow fadeInRight">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/marketplace.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Marketplace</a>
                      </h4>
                      <p className="description">
                        Looking for something, from gadget to anything you could
                        think of? Browse our marketplace for vast products to
                        choose from.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box wow fadeInLeft">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/instantroom.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Instant Room</a>
                      </h4>
                      <p className="description">
                        Host and broadcast instant room with no hustle and easy
                        to join room with just a share of a link; no accounts
                        needed to join.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box wow fadeInRight">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/services.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Services</a>
                      </h4>
                      <p className="description">
                        We also have professional and skilled services provider
                        to get your job done and right.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box wow fadeInLeft">
                      <div className="icon">
                        <img src="/assets/landing/dropdown/gallery.png" />
                      </div>
                      <h4 className="title">
                        <a href="">Phiz Apps Gallery</a>
                      </h4>
                      <p className="description">
                        Browse free and premium apps for your mobile from
                        trending to top charted apps.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button className="btn-sign scrollto">SIGN UP</button>
                {/* <a href="#features">Features</a> */}
              </li>
              <li style={{ marginLeft: "1rem" }}>
                <button className="btn-sign scrollto">LOGIN</button>
                {/* <a href="#pricing">Pricing</a> */}
              </li>
              {/* <li>
                                <a href="#team">Team</a>
                            </li>
                            <li>
                                <a href="#gallery">Gallery</a>
                            </li>
                            
                            <li>
                                <a href="#contact">Contact Us</a>
                            </li> */}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
