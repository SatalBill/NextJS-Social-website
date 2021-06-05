import React from "react";
import "./index.css";
import chaticon from "..//assets/images/chat-on.png";
import ChatList from "./chatlist";
import ChatInput from "./chatinput";
const Chat = props => {
  return (
    <div className="chats">
      <table className="chattable">
        <tbody>
          <tr style={{ height: "6%" }}>
            <td>
              <div className="chatheader">
                <img src={chaticon} alt="chat" width="18px" />
                <span style={{ verticalAlign: "top" }}>&nbsp;&nbsp;Chat</span>
              </div>
            </td>
          </tr>
          <tr style={{ height: "100%" }}>
            <td>
              <ChatList />
            </td>
          </tr>
          <tr style={{ height: 70 }}>
            <td>
              <ChatInput chatOpen={props.chatOpen} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Chat;
