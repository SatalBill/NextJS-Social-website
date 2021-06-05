import React from "react";
import "./index.css";
import usericon from "..//assets/images/user.svg";

const Users = props => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <img
          src={usericon}
          alt={props.user.name}
          title={props.user.name}
          width="18px"
          height="25px"
          style={{ marginTop: 1 }}
        ></img>
        &nbsp;&nbsp;
        <span
          style={{
            verticalAlign: "top",
            color: "#fff",
            lineHeight: 2,
            fontSize: 14,
          }}
        >
          {props.user.name}
        </span>
      </span>
    </div>
  );
};
export default Users;
