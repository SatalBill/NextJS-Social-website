import React, { useState, useEffect } from "react";
import { FaRocketchat } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Config from "../../config";
import { useParams } from "react-router-dom";
// import WebRTC from "../../webrtc/webrtc";
import Screen from "./screen";
import Chat from "./chat";
import "./index.css";

function Play(props) {
  const { id } = useParams();
  const centerPanel = React.createRef();
  const rightPanel = React.createRef();
  const [hideLeftPanel, setHideLeftPanel] = useState({
    isHiding: false,
    display: "block",
    paddingLeft: 300
  });
  const [hideRightPanel, setHideRightPanel] = useState({
    isHiding: true,
    display: "none",
    width: "100%"
  });
  //   const [playList, setPlayList] = useState({
  //     lists: [],
  //     noRecord: true
  //   });

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const newRealPlayList = useSelector(state => state.playList);
  const chats = useSelector(state => state.chats);
  //   const [realPlayList, setRealPlayList] = useState([]);
  const unReadChats = chats.filter(
    chat => chat.isRead === false && chat.userid !== "me"
  ).length;

  useEffect(() => {
    // WebRTC.getInstance().startRoom(
    //   dispatch,
    //   WebRTC.getInstance().getRoomID(),
    //   WebRTC.getInstance().getUserName(),
    //   id
    // );
  }, []);

  useEffect(() => {
    // getAndSetMusicsFromServer("getPlayListInRoom", {
    //   roomID: WebRTC.getInstance().getRoomID()
    // });
    setTimeout(() => {
      handleGetRealPlayMusic();
    }, 100);
  }, [users]);

  useEffect(() => {
    if (newRealPlayList.length > 0) {
      if (newRealPlayList[0].musicListAdd) {
        // getAndSetMusicsFromServer("getPlayListInRoom", {
        //   roomID: WebRTC.getInstance().getRoomID()
        // });
        return;
      }

      handleGetRealPlayMusic();

      newRealPlayList.map((list, key) => {
        if (list.userid !== "me" && list.musicListChange) {
          toast.info(list.username + " has added the " + list.musicName + ".");
          list.musicNew = false;
        }
      });
    }
  }, [newRealPlayList]);

  useEffect(() => {}, [chats]);
  // console.log('realPlayList : ---------- ', realPlayList)

  //   const getAndSetMusicsFromServer = (url, value) => {
  //     fetch(`${Config.serverURL}${url}`, {
  //       method: "post",
  //       headers: {
  //         accept: "application/json",
  //         "content-type": "application/json"
  //       },
  //       body: JSON.stringify(value)
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         // console.log('----------data: ', data)
  //         if (data.record.length === 0)
  //           setPlayList({ lists: [], noRecord: true });
  //         else
  //           setPlayList({
  //             lists: data.record,
  //             noRecord: false
  //           });
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   const handleBar = () => {
  //     if (centerPanel && centerPanel.current) {
  //       if (!hideLeftPanel.isHiding) {
  //         setHideLeftPanel({
  //           isHiding: !hideLeftPanel.isHiding,
  //           display: "none",
  //           paddingLeft: 0
  //         });
  //       } else {
  //         setHideLeftPanel({
  //           isHiding: !hideLeftPanel.isHiding,
  //           display: "block",
  //           paddingLeft: 300
  //         });
  //       }
  //     }
  //   };

  const handleChat = () => {
    if (rightPanel && rightPanel.current) {
      if (!hideRightPanel.isHiding) {
        setHideRightPanel({
          isHiding: !hideRightPanel.isHiding,
          display: "none",
          width: "100%"
        });
      } else {
        setHideRightPanel({
          isHiding: !hideRightPanel.isHiding,
          display: "block",
          width: "80%"
        });
        dispatch({ type: "chat_change", value: { isRead: true } });
      }
    }
  };

  //   const handleSelectMusic = music => {
  //     if (users.length === 0) {
  //       toast.error("User invalid.");
  //       return;
  //     }

  //     toast.info(music.musicName + " was added to the playlist.");
  //     music.seekTime = 0;
  //     music.userID = WebRTC.getInstance().getUserID();

  //     WebRTC.getInstance().addingSelectedMusicForPlay(
  //       WebRTC.getInstance().getRoomID(),
  //       music
  //     );
  //     handleGetRealPlayMusic();
  //   };

  const handleGetRealPlayMusic = () => {
    // WebRTC.getInstance().gettingMusicForPlay(WebRTC.getInstance().getRoomID());
  };

  //   const handleSetPlaylist = obj => {
  //     // console.log('handleSetPlaylist : ', obj)
  //     setPlayList({
  //       lists: obj.lists,
  //       noRecord: obj.noRecord
  //     });
  //   };

  return (
    <div className="">
      <div ref={centerPanel} className="playCenterPanel">
        <div className="playSencondContent">
          {users && users.length
            ? users.map(item => (
                <div id={item.id} className="playUserItem">
                  <Screen
                    user={
                      item.id === props.userId
                        ? { ...item, id: "me", name: "Me" }
                        : DataTransferItemList
                    }
                  />
                </div>
              ))
            : null}
        </div>
        <div className="playChatList">
          <button onClick={handleChat}>
            <FaRocketchat />
          </button>
          {unReadChats !== 0 && hideRightPanel.isHiding ? (
            <div className="playChatBadge">
              <span>{unReadChats}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div
        ref={rightPanel}
        className="playRightPanel"
        style={{ display: hideRightPanel.display }}
      >
        {/* <Chat chatOpen={hideRightPanel.isHiding} /> */}
      </div>
      {/* <ToastContainer
        autoClose={10000}
        hideProgressBar={true}
        position={toast.POSITION.BOTTOM_RIGHT}
      /> */}
    </div>
  );
}
export default Play;
