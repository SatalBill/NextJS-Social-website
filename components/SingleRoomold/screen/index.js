import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import User from "../users/user";
import Button from "../button";
import speaker_on from "..//assets/images/speaker-on.svg";
import speaker_off from "..//assets/images/speaker-off.svg";
import "./index.css";

const Screen = props => {
  useEffect(() => {
    setTimeout(() => {
      const video = document.getElementById(props.user.stream.id);

      if (video) window.easyrtc.setVideoObjectSrc(video, props.user.stream);
      else toast.error("WebRTC getting Failed. Please refresh the page.");
    }, 1500);
  }, []);

  const [muted, setMuted] = useState(props.user.id === "me" ? true : false);
  const toggleMute = () => {
    setMuted(!muted);
    const video = document.getElementById(props.user.stream.id);
    if (video) video.muted = !muted;
  };
  const screenid = "screen_" + props.user.id;
  return (
    <div
      key={props.user.id}
      id={screenid}
      className="screen"
      style={{ width: "100%", height: "100%" }}
      tabIndex={0}
      onDoubleClick={() =>
        document.getElementById(screenid).requestFullscreen()
      }
    >
      <div className="videoStatus">
        <User user={props.user} />
      </div>
      <video
        className="video"
        id={props.user.stream.id}
        controls=""
        loop=""
        muted={"Me" === props.user.name}
      ></video>
      {props.user.id !== "me" && (
        <div className="speaker">
          <Button
            on={speaker_on}
            off={speaker_off}
            status={muted ? "off" : "on"}
            onClick={toggleMute}
          ></Button>
        </div>
      )}
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
};
export default Screen;
