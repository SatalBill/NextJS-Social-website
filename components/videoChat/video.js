import React, { Component } from 'react';
import * as _ from "lodash";
class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showVideo: false
    }
    this.video = React.createRef()
  }

  componentDidMount() {
    if (this.props.videoStream) {
      this.video.srcObject = this.props.videoStream
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
      this.video.srcObject = nextProps.videoStream
    }
  }

  render() {
     return (
      <div className="text-center"
        style={{ ...this.props.frameStyle }}
      >

        <video
          onEnded={e => { console.log(e) }}
          id={this.props.id}
          // muted={true}
          muted={this.props.muted}
          autoPlay
          style={{ ...this.props.videoStyles }}
          className={this.props.className }
          // ref={ this.props.videoRef }
          ref={(ref) => { this.video = ref }}
        ></video>

      </div>
    )
  }
}

export default Video