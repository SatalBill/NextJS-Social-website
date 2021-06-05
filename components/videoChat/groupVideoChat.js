import React, { Component } from 'react';
import { connect } from 'react-redux';
import Videos from "./videos";
import Video from "./video";
import { toast } from 'react-toastify';
import * as _ from "lodash";
import config from "../../config";
// Media constraints
let constraints = {
    // Uncomment to enable audio
    audio: true,
    video: true,
    screen: false,
    options: {
        mirror: false,
    }
};

let mediaSource = {
    audioChat: true,
    videoChat: true,
    screenShare: false,
}
let stateValue = {}
let socket = config.socket
class GroupWebrtc extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            pc_config: {
                "iceServers": [
                    {
                        "urls": "stun:stun.l.google.com:19302"
                    }
                ]
            },
            constraints: {
                auido: true,
                video: true,
                screen: true
            },
            remoteStreams: [],
            peerConnections: {},
            recognising: false
        }
        this.recognising = null;
        this.videosComponent = React.createRef();

    }

    createPeerConnection = (socketId, callback) => {
        //  create New RTC Peer connection to everybody 
        let { peerConnections } = { ...this.state }
        let iceCandidate = true
        try {
            let pc = new RTCPeerConnection(this.state.pc_config)
            pc.socketId = socketId

            peerConnections[socketId] = pc
            this.setState({ peerConnections })
            // send my details as iceCandidate ( like give assurance that I accepted to watch my stream)
            pc.onicecandidate = (e) => {
                if (e.candidate && iceCandidate) {
                    // iceCandidate = false
                    socket.emit("onicecandidate", { sender: socket.id, receiver: socketId, candidate: e.candidate, user: this.props.user })
                }
            }
            pc.oniceconnectionstatechange = (e) => {
                // console.log(e)
            }
            pc.onnegotiationneeded = (e) => {
                // console.log(e)
            }

            pc.negotiationneeded = (e) => {
                // console.log(e)
            }
            let loop = 0
            // ontrack is triggerd  when new peer connection happened successfully 
            pc.ontrack = (e) => {

                if (socketId !== socket.id) {
                    const remoteVideo = {
                        id: socketId,
                        name: socketId,
                        stream: e.streams[0]
                    }
                    this.setState(prevState => {
                        // If we already have a stream in display let it stay the same, otherwise use the latest stream
                        const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
                        let remoteStreams = []
                        let isExist = _.findIndex(prevState.remoteStreams, { id: socketId })
                        if (isExist >= 0) {
                            prevState.remoteStreams[isExist] = remoteVideo
                            remoteStreams = prevState.remoteStreams
                        } else {
                            remoteStreams = [...prevState.remoteStreams, remoteVideo]
                        }
                        return {
                            ...remoteStream, remoteStreams
                        }

                    }, () => {
                        this.setState({ selectedVideo: this.state.selectedVideo ? this.state.selectedVideo : this.state.remoteStreams[0] }, () => {
                            this.updateVideosComponent()
                            this.props.updateRemoteStreams(this.state.remoteStreams)
                        })
                    })
                }
            }
            pc.close = () => {
                // console.log("Peer Closed", pc.socketId)
            }
            if (this.state.localStream) {
                pc.addStream(this.state.localStream)
            }

            callback(pc)

        } catch (e) {
            console.log(e)
            callback(null)
        }

    }

    getLocalStream = () => {

        const success = (stream) => {
            mediaSource = {
                audioChat: constraints.audio,
                videoChat: constraints.video,
                screenShare: constraints.screen,
            }
            socket.emit('media-action', { roomName: this.state.currentRoom, user: this.props.user, ...mediaSource })

            this.setState({
                localStream: stream
            }, () => {
                this.getOnlineUsers()
            })
        }

        // called when getUserMedia() fails - see below
        const failure = (e) => {
            console.log('getUserMedia Error: ', e)
            this.toasterHandler("error", "Please give camera and mic permissions")
        }
        this.setState({ constraints }, () => {
            if (navigator && navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia(this.state.constraints)
                    .then(success)
                    .catch(failure)
            } else {
                this.toasterHandler("error", "Please give camera and mic permissions")
            }
        })
    }

    getOnlineUsers = () => {

        let { currentRoom } = { ...this.state }
        socket.emit("get-room-users", currentRoom, (roomUsers) => {
            this.setState({ roomUsers }, () => {
                this.joinVdieoChat(roomUsers)
            })
        })
    }

    joinVdieoChat = (roomUsers) => {

        roomUsers.map(user => {

            this.createPeerConnection(user.socketId, pc => {
                if (pc && this.props.user.id !== user.id) {
                    pc.createOffer({ offerToReceiveVideo: 1 })
                        .then(sdp => {
                            console.log("Calling to :", user.username)

                            socket.emit("create offer", { sender: socket.id, receiver: user.socketId, sdp, user: this.props.user })
                            // set my offer sdp as local description
                            pc.setLocalDescription(sdp)
                        })
                }
            })
        })
    }

    removeUserStream = (socketId) => {
        _.remove(this.state.remoteStreams, { id: socketId })

        if (this.state.selectedVideo && this.state.selectedVideo.id === socketId) {
            this.setState({ selectedVideo: "" })
        }
        this.closePeer(socketId)
        let peerConnections = _.remove(this.state.peerConnections, socket)
        this.setState({ peerConnections }, () => {
            this.updateVideosComponent()
        })
    }

    updateVideosComponent = () => {
        // this.videosComponent.current && this.videosComponent.current.loadVideos(this.state.remoteStreams, this.state.roomUsers)
    }

    closePC = (peerConnections) => {
        !_.isEmpty(this.state.localStream) && this.state.localStream.stop()
        peerConnections = peerConnections || this.state.peerConnections
        Object.keys(peerConnections).map((socketId) => {
            this.removeUserStream(socketId)
            this.closePeer(socketId)
        })
        mediaSource = {
            audioChat: false,
            videoChat: false,
            screenShare: false,
        }

        this.updateMediaAction()
        this.newState()
    }

    closePeer = (socketId) => {
        mediaSource = {
            audioChat: true,
            videoChat: true,
            screenShare: true,
        }
        let userPeerConnection = this.state.peerConnections[socketId]
        if (userPeerConnection) {
            userPeerConnection.close()
        }
    }
    newState = () => {
        this.setState({
            remoteStreams: [],
            peerConnections: {}
        })
    }

    joinRoom = (currentRoom, source) => {
        console.log(currentRoom, "######");
        this.setState({ currentRoom }, () => {
            constraints = {
                // Uncomment to enable audio
                audio: true,
                video: true,
                screen: false,
                options: {
                    mirror: false,
                }
            };
            if (source) {
                constraints = { ...constraints, ...source }
            }
            let obj = {
                roomName: currentRoom,
                user: this.props.props.user
            }
            this.getLocalStream()

            !_.isEmpty(this.state.localStream) && this.state.localStream.stop()
            this.updateMediaAction()
        })
    }

    componentDidMount = async () => {


        // this.joinRoom(this.props.props.currentRoom)

        this.setState({
            ...stateValue
        })
        socket.on('all users', (users) => {
            this.setState({
                roomUsers: users
            })
        });

        socket.on('leave room', (socketId) => {
            this.removeUserStream(socketId)
            this.closePeer(socketId)

        });
        socket.on('user leaving video', (user) => {
            this.removeUserStream(user.socketId)
        });
        socket.on('user-media-action', (user) => {
            let { roomUsers } = { ...this.state }

            let userIndex = _.findIndex(roomUsers, { socketId: user.socketId })

            if (userIndex >= 0) {
                roomUsers[userIndex] = user
                this.setState({ roomUsers }, () => {
                    this.updateVideosComponent()
                })
            }

            if (this.state.selectedVideo && this.state.selectedVideo.id === user.socketId) {
                if (!user.videoChat && !user.screenShare) {
                    // this.removeUserStream(user.socketId)
                    // this.state.selectedVideo && this.state.selectedVideo.stream && this.state.selectedVideo.stream.stop()
                    this.setState({ selectedVideo: "" })
                }

            }
        });



        socket.on("user disconnected", socketId => {
            console.log("user disconnected", socketId)
            this.removeUserStream(socketId)
        })



        socket.on("received offer", payload => {
            console.log("Received call from :", payload.user.name)
            this.closePeer(payload.socketId)
            this.createPeerConnection(payload.sender, pc => {
                if (pc) {
                    pc.setRemoteDescription(new RTCSessionDescription(payload.sdp)).then(() => {
                        // 2. Create Answer

                        pc.createAnswer(this.state.sdpConstraints)
                            .then(sdp => {
                                pc.setLocalDescription(sdp)
                                console.log("Answering call to :", payload.user.name)
                                socket.emit("accepet offer", { sender: socket.id, receiver: payload.sender, sdp, user: this.props.user })
                            })
                    })
                }
            })
        })

        socket.on("offer accepted", payload => {
            const pc = this.state.peerConnections[payload.sender]
            console.log(payload.user.name, "Accepted the call")

            if (pc) {
                try {
                    pc.setRemoteDescription(new RTCSessionDescription(payload.sdp)).catch(e => {
                        console.log(e)
                    })
                } catch (e) {
                    console.log(e)
                }
            } else {
                // this.toasterHandler('error', "PC not found - offer accepted")
            }
        })

        socket.on("onicecandidate", payload => {
            if (payload.candidate) {
                const pc = this.state.peerConnections[payload.sender]
                // console.log("adding Ice candidate from", payload.user.name)
                if (pc) {
                    pc.addIceCandidate(new RTCIceCandidate(payload.candidate)).catch(e => this.catchError(e))
                }
            }
        })



    }
    catchError = (e) => {
        console.log(e)
    }
    toasterHandler = (type, msg) => {
        toast[type](msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    replaceTrack = (videoTrack) => {
        Object.keys(this.state.peerConnections).map((socketId) => {
            let pc = this.state.peerConnections[socketId]
            var sender = pc.getSenders().find(function (s) {
                if (s && videoTrack && s.track && s.track.kind == videoTrack.kind) {
                    if (videoTrack.kind === 'video') {
                        s.track.stop()
                    }
                    return s;
                }
            });

            if (sender && videoTrack) {
                sender.replaceTrack(videoTrack);
            } else {
                pc.removeStream(this.state.localStream);
                pc.addStream(this.state.localStream)
            }
        })
    }

    screenShare = (screen) => {

        mediaSource.screenShare = screen
        mediaSource.videoChat = false


        constraints.screen = mediaSource.screenShare
        constraints.video = mediaSource.videoChat
        constraints.audio = mediaSource.audioChat
        if (screen) {
            constraints.video = false
            mediaSource.videoChat = false
            this.setState({
                constraints
            }, () => {
                if (navigator && navigator.mediaDevices) {

                    navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia().then(stream => {
                        let screenTrack = stream.getTracks()[0]
                        console.log(stream);
                        this.setState({ localStream: stream })

                        this.replaceTrack(screenTrack)
                        this.updateMediaAction()

                    }).catch(e => {
                        console.log(' getUserMedia Error: ', e)
                        this.toasterHandler("error", "Please give camera and mic permissions")

                    })
                } else {
                    this.toasterHandler("error", "Please give camera and mic permissions")
                }
            })
        } else {
            this.stopStream("video")
        }
    }

    handleMicControl = (audio) => {

        constraints.audio = audio
        mediaSource.audioChat = audio
        if (audio) {
            if (navigator && navigator.mediaDevices) {

                navigator.mediaDevices.getUserMedia(constraints).then(stream => {

                    let track = stream.getTracks()[0]
                    this.replaceTrack(track)
                    this.updateMediaAction()

                }).catch(e => {
                    console.log('getUserMedia Error: ', e)
                    this.toasterHandler("error", "Please give camera and mic permissions")

                })
            } else {
                this.toasterHandler("error", "Please give camera and mic permissions")
            }
        } else {
            this.stopStream("audio")
        }
    }


    handleVideoSource = (video) => {

        mediaSource.screenShare = false
        mediaSource.videoChat = video


        constraints.screen = mediaSource.screenShare
        constraints.video = mediaSource.videoChat
        constraints.audio = mediaSource.audioChat

        if (video) {
            this.setState({
                constraints
            }, () => {

                if (navigator && navigator.mediaDevices) {
                    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                        let videoTrack = stream.getVideoTracks()[0]
                        this.setState({ localStream: stream }, () => {
                            this.replaceTrack(videoTrack)
                        })
                        this.updateMediaAction()
                    }).catch(e => {
                        console.log(' getUserMedia Error: ', e)
                        this.toasterHandler("error", "Please give camera and mic permissions")

                    })
                } else {
                    this.toasterHandler("error", "Please give camera and mic permissions")
                }

            })
        } else {

            if (mediaSource.videoChat === false && mediaSource.audioChat === false && mediaSource.screenShare === false) {
                this.stopStream('all')
            } else {
                this.stopStream("video")
            }
        }
    }

    stopStream = (type) => {

        Object.keys(this.state.peerConnections).map((socketId) => {
            let pc = this.state.peerConnections[socketId]
            if (pc) {
                pc.getSenders().find(function (s) {
                    if (s && s.track) {
                        if (s.track.kind == type) {
                            s.track.stop()
                        }
                        if (type === "all") {
                            s.track.stop()
                        }
                    }

                });
            }
        })
        this.updateMediaAction()

    }

    updateMediaAction = () => {
        let { currentRoom } = { ...this.state }
        mediaSource = {
            audioChat: constraints.audio,
            videoChat: constraints.video,
            screenShare: constraints.screen,
        }

        socket.emit('media-action', { roomName: currentRoom, user: this.props.user, ...mediaSource })
    }
    switchVideo = (video) => {
        this.setState({ selectedVideo: video })
    }
    render() {
        let { roomUsers } = { ...this.props }
        return (
            <>
                <div className="video-chat-list">
                    <Video roomUsers={roomUsers}
                        className={"webcam-view-larg"}
                        id={"videoElement"}
                        videoStream={this.state.localStream}
                        autoPlay
                        muted={true}
                    >
                    </Video>
                </div>
            </>
        )
    }
}

 

export default GroupWebrtc;
