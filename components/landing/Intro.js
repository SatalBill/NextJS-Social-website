import React, { Component } from "react";

export class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section
        id="intro"
        style={{
          background:
            'url("/assets/landing/intro-bg.png") center top no-repeat',
        }}
      >
        <div className="intro-text wow fadeInDown">
          <a href="#about" className="btn-get-started scrollto">
            Get Started
          </a>
        </div>
      </section>
      // <section
      //     id="intro"
      //     style={{
      //         background: 'linear-gradient( 45deg, rgba(29, 224, 153, 0.8), rgba(29, 200, 205, 0.8) ), url("/assets/landing/intro-bg.jpg") center top no-repeat',
      //     }}
      // >
      //     <div className="intro-text wow fadeInRight">
      //         <h2>Welcome to Avilon</h2>
      //         <p>
      //             We are team of talanted designers making websites with
      //             Bootstrap
      //         </p>
      //         <a href="#about" className="btn-get-started scrollto">
      //             Get Started
      //         </a>
      //     </div>
      //     <div className="product-screens">
      //         <div
      //             className="product-screen-1 wow fadeInUp"
      //             data-wow-delay="0.4s"
      //             data-wow-duration="0.6s"
      //         >
      //             <img
      //                 src="/assets/landing/product-screen-1.png"
      //                 alt=""
      //             />
      //         </div>

      //         <div
      //             className="product-screen-2 wow fadeInUp"
      //             data-wow-delay="0.2s"
      //             data-wow-duration="0.6s"
      //         >
      //             <img
      //                 src="/assets/landing/product-screen-2.png"
      //                 alt=""
      //             />
      //         </div>

      //         <div
      //             className="product-screen-3 wow fadeInUp"
      //             data-wow-duration="0.6s"
      //         >
      //             <img
      //                 src="/assets/landing/product-screen-3.png"
      //                 alt=""
      //             />
      //         </div>
      //     </div>
      // </section>
    );
  }
}

export default Intro;
