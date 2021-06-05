import React, { Component } from "react";
import TopcardHeader from "../../gameRoom/game-topHeader";
import SideList from "../../gameRoom/sideList";
import GameContent from "../../gameRoom/gameContent";

export class index extends Component {
  componentDidMount() {
    this.props.handleLinkActive("gameState");
  }
  render() {
    return (
      <>
        <TopcardHeader />
        <div className="g-page-container">
          <SideList />
          <GameContent />
        </div>
      </>
    );
  }
}

export default index;
