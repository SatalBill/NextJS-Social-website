import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../utils/localstorage";

class WebRTC {
  static _instance = null;
  client = null;
  roomID = "";
  roomName = "";
  roomType = 0;
  userName = "";
  playList = [];

  videoQualities = [
    {
      text: "SD (360p - 1Mb/s)",
      value: { width: 480, height: 360, frameRate: 10 },
    },
    {
      text: "HD (720p - 2Mb/s)",
      value: { width: 1280, height: 720, frameRate: 10 },
    },
    {
      text: "Full HD (1080p - 4Mb/s)",
      value: { width: 1920, height: 1080, frameRate: 15 },
    },
  ];
  currentVideoQuality = this.videoQualities[0];
  audioQualities = [
    {
      text: "Narrow Band (16Kb/s)",
      value: { sampleSize: 8, channelCount: 1 },
    },
    {
      text: "Wide Band (64Kb/s)",
      value: { sampleSize: 8, channelCount: 2 },
    },
    {
      text: "Full Band (256Kb/s)",
      value: { sampleSize: 16, channelCount: 2 },
    },
  ];
  currentAudioQuality = this.audioQualities[1];

  static getInstance() {
    if (WebRTC._instance === null) WebRTC._instance = new WebRTC();

    return WebRTC._instance;
  }

  constructor() {
    console.log("WebRTC class was initialized.");
  }

  getUserName() {
    const username = getLocalStorage("fullName");
    return username ? username : "";
  }

  setUserName(name) {
    setLocalStorage("fullName", name);
  }

  getRoomID() {
    const roomID = getLocalStorage("roomID");
    return roomID ? roomID : "";
  }

  getRoomName() {
    const roomName = getLocalStorage("roomName");
    return roomName ? roomName : "";
  }

  getRoomType() {
    const roomType = getLocalStorage("roomType");
    return roomType ? roomType : "";
  }

  setUserID(id) {
    setLocalStorage("userID", id);
  }

  getUserID() {
    const userID = getLocalStorage("userID");
    return userID ? userID : "";
  }

  exitRoomName() {
    clearLocalStorage("roomID");
  }

  generateRoomName() {
    return window.generateRoomName();
  }

  createRoom(roomID, roomName, roomType) {
    setLocalStorage("roomID", roomID);
    setLocalStorage("roomName", roomName);
    setLocalStorage("roomType", roomType);
    this.roomID = roomID;
    this.roomName = roomName;
    this.roomType = roomType;
  }

  closeClient(dispatch) {
    dispatch({ type: "user_remove", value: { id: "me" } });
    window.VTCCore.finalize();
    WebRTC._instance = null;
  }

  async startRoom(dispatch, room, userName, roomId) {
    this.userName = userName ? userName : window.getLocalStorage("fullName");
    this.roomID = room
      ? room
      : roomId
      ? roomId
      : window.getLocalStorage("roomID");

    if (!this.roomID) {
      // window.location.href = "/"
      return;
    }

    this.dispatch = dispatch;

    window.easyrtc.enableDataChannels(true);

    window.VTCCore.initialize({
      cameraIsEnabled: true,
      micIsEnabled: true,
    })
      .onError(function (config) {
        console.log("error---", config);
      })
      .onPeerMessage(function (client, peerId, msgType, content) {
        if (msgType === "changedPlayList") {
          dispatch({
            type: "changedPlayList",
            value: {
              userid: peerId,
              username: client.idToName(peerId),
              musicName: content.musicName,
              musicListChange: content.musicListChange,
            },
          });
          setTimeout(() => {
            dispatch({
              type: "removePlayList",
              value: {
                userid: peerId,
                username: client.idToName(peerId),
                musicName: content.musicName,
                musicListChange: false,
              },
            });
          }, 500);
        } else if (msgType === "addedPlayList") {
          // console.log(' onPeerMessage : ', content)
          dispatch({
            type: "addedPlayList",
            value: {
              userid: peerId,
              username: client.idToName(peerId),
              musicListAdd: content.musicListAdd,
            },
          });
          setTimeout(() => {
            dispatch({
              type: "removePlayList",
              value: {
                userid: peerId,
                username: client.idToName(peerId),
                musicListAdd: false,
              },
            });
          }, 500);
        } else if (msgType === "chat") {
          dispatch({
            type: "chat_add",
            value: {
              username: client.idToName(peerId),
              userid: peerId,
              text: content.message,
              isRead: content.isRead,
              align: "left",
              time: Date.now(),
            },
          });
        } else if (msgType === "file") {
          var arr = content.binaryContents.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr], { type: mime });
          dispatch({
            type: "chat_add",
            value: {
              username: client.idToName(peerId),
              userid: peerId,
              html: `'${client.idToName(
                peerId
              )}' sent a file.<br><a href='${URL.createObjectURL(
                blob
              )}' target='_blank'>Click here to download ${content.name}(${
                content.size
              }bytes)`,
              align: "left",
              time: Date.now(),
            },
          });
        } else {
          // @todo FIXME: right now we don't have other messages to take care of
          console.log("=> got a peer message that is unexpected");
          console.log("=> peerId:  " + peerId);
          console.log("=> name: " + client.idToName(peerId));
          console.log("=> msgType: " + msgType);
          console.log("=> content: " + JSON.stringify(content));
        }
      })
      .onStreamAccept(function (client, peerId, stream) {
        var peerName = client.idToName(peerId);
        console.log("stream accpet", peerId, peerName);

        dispatch({
          type: "user_add",
          value: { id: peerId, name: peerName, stream },
        });
        return;
      })
      .onStreamClose(function (client, peerId) {
        dispatch({ type: "user_remove", value: { id: peerId } });
        return;
      });
    // .connect(userName, this.roomID, function (client) {
    //     console.log("start local stream", userName)
    //     var stream = client.getLocalStream()
    //     dispatch({
    //         type: "user_add",
    //         value: { id: "me", name: "Me", stream },
    //     })
    //     WebRTC.getInstance().client = client
    //     return
    // })
  }

  sendMessage(message) {
    this.client.sendPeerMessage({ room: this.roomID }, "chat", message);
  }

  addingSelectedMusicForPlay(roomID, music) {
    window.easyrtc.sendServerMessage("addingSelectedMusicForPlay", {
      roomID: roomID,
      music: music,
    });

    if (this.client) {
      this.client.sendPeerMessage(
        { room: WebRTC.getInstance().roomID },
        "changedPlayList",
        { musicName: music.musicName, musicListChange: true }
      );
    }
  }

  updatingSelectedMusicForPlay() {
    // console.log('updatingSelectedMusicForPlay : ' , this.client)
    if (this.client) {
      this.client.sendPeerMessage(
        { room: WebRTC.getInstance().roomID },
        "addedPlayList",
        { musicListAdd: true }
      );
    }
  }

  gettingMusicForPlay(roomID) {
    window.easyrtc.sendServerMessage(
      "gettingMusicForPlay",
      { roomID: roomID },
      function (msgType, musics) {
        if (msgType === "resp_gettingMusicForPlay") {
          WebRTC.getInstance().playList = musics;
        }
      }
    );
  }

  updatingMusicForPlay(roomID, music) {
    window.easyrtc.sendServerMessage("updatingMusicForPlay", {
      roomID: roomID,
      music: music,
    });
  }

  removingMusicForPlay(roomID, music) {
    console.log("remove: ", roomID, music);
    window.easyrtc.sendServerMessage("removingMusicForPlay", {
      roomID: roomID,
      music: music,
    });
  }
}
export default WebRTC;
