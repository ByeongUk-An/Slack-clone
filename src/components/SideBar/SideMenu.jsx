import React from "react";
import { Menu } from "semantic-ui-react";
import "./SideMenu.css";
import UserInfo from "./UserInfo/UserInfo";
import Channels from "./Channels/Channels";
import PrivitChat from "./privitchat/PrivitChat";
import { connect } from "react-redux";
import FavChannel from "../SideBar/FavChannel/FavChannel";
function SideMenu(props) {
  console.log(props.user);
  if (props.user) {
    return (
      <Menu vertical fixed="left" className="side-nav" borderless size="large">
        <UserInfo />
        <FavChannel />
        <Channels />
        <PrivitChat />
      </Menu>
    );
  }
  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.curUser,
  };
};

export default connect(mapStateToProps)(SideMenu);
