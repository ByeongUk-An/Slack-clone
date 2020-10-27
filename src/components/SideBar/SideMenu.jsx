import React from "react";
import { Menu } from "semantic-ui-react";
import "./SideMenu.css";
import UserInfo from "./UserInfo/UserInfo";
import Channels from "./Channels/Channels";
import PrivitChat from "./privitchat/PrivitChat";
import FavChannel from "../SideBar/FavChannel/FavChannel";
function SideMenu() {
  return (
    <Menu vertical fixed="left" className="side-nav" borderless size="large">
      <UserInfo />
      <FavChannel />
      <Channels />
      <PrivitChat />
    </Menu>
  );
}

export default SideMenu;
