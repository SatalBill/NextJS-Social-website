import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import $ from "jquery"
import config from "../../config";
import { getRoomMessages } from '../../redux/sagas/Requests/roomRequest';
import Avatar from 'react-avatar';
import * as chatRequest from "../../redux/sagas/Requests/chatRequest";
import ChatWindow from "../../components/build/chat-window/index";
import * as _ from "lodash"

let socket = config.socket
let fileFor = ""
let tempMessages=[]
function TabPanel(props) {
  const { children, value, index, chatType, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div className="pos-re promote-chat" style={{ height: "93vh" }}>{children}</div>
        </Box>

      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

let tempPrivateMessages = []
export default function SimpleTabs(props) {


  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [messageBox, setMessageBox] = React.useState("");
  let [privateMessageBox, setPrivateMessageBox] = React.useState("");
  let [messages, setMessages] = React.useState("");
  let [privateMessages, setPrivateMessages] = React.useState("");
  const [flag, setFlag] = React.useState(true);


  let [state, setState] = useState({
    friend: {},
    typingUsers: [],
    typing: false,
    privateChatRoomId: 0
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const a11yProps = (index) => {
    // props.setChatType(index)
    handleMessageScroll()

    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  // a11yProps(props.chatType)
  useEffect(() => {
    getRoomMessages(props.roomId).then(res => {
      if (res.status === 200) {
        pushMessage(res.data.data)
      }
    }).catch(e => { console.log(e); })

    socket.on('new-private-message', messageObj => {
      pushPrivateMessage([messageObj])
    })

  }, [])

  useEffect(() => {
    socket.on('new-group-message', payload => {
      pushMessage([payload])
    })
  },[])

  const pushMessage = (messageArray) => {
    tempMessages = [...tempMessages, ...messageArray]
    setMessages(tempMessages)
    handleMessageScroll()
  }

  const pushPrivateMessage = (messageObj) => {
    tempPrivateMessages = [...tempPrivateMessages, ...messageObj]
    setPrivateMessages(tempPrivateMessages)
    handleMessageScroll()
  }
  const handleModal = () => {
    if (flag) {
      $(".select-arrow-icon").css("transform", "rotate(180deg)")
    } else {
      $(".select-arrow-icon").css("transform", "rotate(0deg)")
    }
    $(".hidden-item-list").slideToggle();
    setFlag(!flag);
  };

  const handleMessageScroll = () => {
    let conversationElement = document.getElementById('room-conversation')
    if (conversationElement) {
      conversationElement.scrollTop = conversationElement.scrollHeight + 100
      setTimeout(() => {
        conversationElement.scrollTop = conversationElement.scrollHeight + 100
      }, 400);
      let messageDoc = document.getElementById("message")
      messageDoc.focus()
    }
  }

  const sendMessage = (message) => {
    if (message) {
      socket.emit("sent-group-message", message, (err, messageObj) => {
        pushMessage([messageObj])
      })
    }
  }
  const sendPrivateMessageBox = (message) => {
    socket.emit("send-private-message", message, (messageObj) => {
      pushPrivateMessage([messageObj])
    })
  }



  const handleStartAction = (typing, isGroup) => {
    let { userId, roomId } = { ...props }
    if (isGroup) {
      socket.emit("group-typing-action", {
        typing,
        senderId: userId,
        roomId
      })
    } else {
      socket.emit("typing-action", {
        typing,
        senderId: userId,
        receiverId: state.friend.id,
        roomId
      })
    }

  }

  const findRoomId = (firstUserId, secondUserId) => {
    if (firstUserId < secondUserId) {
      return firstUserId + "_" + secondUserId
    } else {
      return secondUserId + "_" + firstUserId
    }
  }

  const joinPrivateRoom = (friend) => {
    if (friend) {
      // socket.emit("leave room", { roomName: state.privateChatRoomId })
      let roomId = findRoomId(friend.id, props.userId)
      setState({ ...state, privateChatRoomId: roomId, friend: friend })

      socket.emit("join room", { roomId })
      chatRequest.getRoomMessages(roomId).then(res => {
        if (res.status === 200) {
          pushPrivateMessage(res.data.data)
          handleMessageScroll()
          handleModal()

        }
      })
    }
  }
  // useEffect(()=> {
  //   if(props.socket){
  //     props.socket.on("newRoomMessage", message => {

  //       setMessages(preMessages => ([...preMessages, message]))
  //     })
  //   }
  // },[])
  const handleUserTyping = () => {
    let userList = state.typingUsers
    if (state.typingUsers.length > 1) {
      userList = [state.typingUsers[0], state.typingUsers[0]]

    }
    return userList.map((user, index) => <span className="ml-1">
      {user.name ? user.name : user.username}
    </span>)
  }
  const showPopup = (filefor) => {
    fileFor = filefor
    $(".share-chat-item-wraper").slideToggle()
    $(".full-background").toggle()
  }

  
  // const closeModel = (payload) => {
  //   let { type, files } = { ...payload }

  //   let formdata = new FormData()
  //   formdata.append('folderPath', "chat")
  //   formdata.append('files', files[0])

  //   generalRequest.uploadFiles(formdata).then(res => {
  //     if (res.status === 200) {
  //       let uploadFilePath = res.data?.message[0]
  //       if (fileFor) {
  //         showPopup()
  //       }
  //       if (fileFor === "private") {
  //         sendPrivateMessageBox(type, uploadFilePath)
  //       } else {
  //         sendMessage(type, uploadFilePath)
  //       }
  //     }
  //   })
  // }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Public" onClick={() => a11yProps(0)} />
          <Tab label="Private" onClick={() => a11yProps(1)} />
        </Tabs>
      </AppBar>
      <>
        <TabPanel value={value} index={0}>
          <ChatWindow userId={props.userId} roomId={props.roomId} windowType="group" sendMessage={msg => sendMessage(msg)} messages={messages} />
        </TabPanel>
      </>
      <TabPanel value={value} index={1}>
        <div className="chat-headers">
          <div className="pos-re custom-select justify-align-center select-user ctop-25 z-9">
            <input type="text" className="ageeee" placeholder="Type Username" ></input>
            <ExpandMoreIcon className="select-arrow-icon" onClick={() => handleModal()} />
            <ul className="hidden-item-list z-9">
              {props.roomUsersList.map((user, i) =>
                parseInt(user.id) !== parseInt(props.userId) ? <li key={i} onClick={() => joinPrivateRoom(user)}>
                  <div className="horizontal-center">
                    <span className="u-profile">
                      <Avatar size={30} textSizeRatio={3} round={true} name={user.username} src={config.imageViewURL + user.picturePath} />
                    </span>
                    <span className="r-name mt-0" style={{ fontSize: "14px" }}>{user.username}</span>
                  </div>
                </li> : null
              )}
            </ul>
          </div>

          {!_.isEmpty(state.friend) ?
            <div className="friend-name-pad">
              <span className="ml-2">
                <Avatar size={30} textSizeRatio={3} round={true} name={state.friend.username} src={config.imageViewURL + state.friend.picturePath} />
                <span className="ml-2">
                  {state.friend.username}  {state.typing &&
                    <span>typing...</span>} </span>
              </span>
              <hr></hr>
            </div> : null}
        </div>
        <ChatWindow userId={props.userId}  friend={state.friend} roomId={state.privateChatRoomId} windowType="private" sendMessage={msg => sendPrivateMessageBox(msg)} messages={privateMessages} />

        <div>
        </div>
      </TabPanel>
    </div>
  );
}
