import React from "react";
import SideMenu from "./components/SideBar/SideMenu";
import { Grid } from "semantic-ui-react";
import "./App.css";
import Message from "./components/Message/Message";
import { connect } from "react-redux";
function App(props) {
  if (props.user) {
    return (
      <Grid columns="equal">
        <SideMenu />

        <Grid.Column className="messagebox">
          <Message />
        </Grid.Column>
      </Grid>
    );
  }
  return <div></div>;
}

const mapsStateToProps = (state) => {
  return {
    user: state.userReducer.curUser,
    channel: state.channelReducer.curChannel,
  };
};

export default connect(mapsStateToProps)(App);
