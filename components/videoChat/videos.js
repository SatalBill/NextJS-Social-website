import React, { Component } from 'react'
import Video from './video'
import * as _ from "lodash";

class Videos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rVideos: [],
      remoteStreams: []
    }
  }
  componentDidMount() {
    this.loadVideos(this.props.remoteStreams, this.props.roomUsers)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({selectedVideo:nextProps.selectedVideo},()=>{
      this.loadVideos(nextProps.remoteStreams, nextProps.roomUsers)
    })
  }

  loadVideos = (remoteStreams, roomUsers) => {

    let _rVideos = remoteStreams && remoteStreams.map((rVideo, index) => {

      let user = _.find(roomUsers, { socketId: rVideo.id })
      let hiddenClass = user && (!user.screenShare && !user.videoChat) ? "d-none" : ""
      let video = <Video
        muted={false}
        videoStream={rVideo.stream}
        frameStyle={{ width: 120, float: 'left', padding: '0 3px' ,marginTop:"5px"}}
        roomUsers={roomUsers}

        videoStyles={{
          cursor: 'pointer',
          objectFit: 'cover',
          borderRadius: 3,
          width: '100%',
        }}
      />

      return (
        <div
          className={hiddenClass}
          id={rVideo.name}
          onClick={() => {this.setState({selectedVideo:rVideo});this.props.switchVideo(rVideo)}}
          style={{ display: 'inline-block' }}
          key={index}
        >
          {video}
          {user && user.name ?
            <div className="video-user-name"
             style={{backgroundColor:(rVideo.id===(this.state.selectedVideo&&this.state.selectedVideo.id))?"blue":""}}
             >{user.name}</div> : null
          }
        </div>
      )
    })

    this.setState({
      remoteStreams: remoteStreams,
      rVideos: _rVideos
    })
    // }

  }
  render() {
    return (
      <div
        className="user-grid-list"
      >
        {this.state.rVideos}
      </div>
    )
  }

}

export default Videos