import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

let shareType = "";
class chatShareItems extends Component {
  constructor(props) {
    super(props);
  }

  handleShare = type => {
    shareType = type;
    let doc = document.getElementById("chat-file");
    doc.accept = type + "/*";
    console.log(doc);
    doc.click();
  };
  handleFileChange = (shareType, e) => {
    console.log(shareType, e.target.files);
    let obj = {
      type: shareType,
      files: e.target?.files,
    };
    this.props.closeModel(obj);
  };

  render() {
    return (
      <div className="share-chat-item-wraper">
        <h4>Share </h4>
        <div className="sh-items">
          <input
            type="file"
            onChange={e => {
              this.handleFileChange(shareType, e);
              e.target.value = "";
            }}
            className="d-none"
            id="chat-file"
          ></input>

          <div className="sh-item" onClick={() => this.handleShare("audio")}>
            <div className="s-icon s-music-icon"></div>
            <div className="s-text">Audio</div>
          </div>
          {/* <div className="sh-item" onClick={()=>this.handleShare('file')}>
                        <div className="s-icon s-file-icon"></div>
                        <div className="s-text">File</div>
                    </div> */}
          <div className="sh-item" onClick={() => this.handleShare("video")}>
            <div className="s-icon s-youtube-icon"></div>
            <div className="s-text">Video</div>
          </div>
          <div className="sh-item" onClick={() => this.handleShare("image")}>
            <div className="s-icon s-image-icon"></div>
            <div className="s-text">Images</div>
          </div>
        </div>
      </div>
    );
  }
}

export default chatShareItems;
