import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import { setChannel } from "../../../store/action";
import { Menu, Icon } from "semantic-ui-react";

function PrivitChat(props) {
  const [userstate, setUserState] = useState([]);
  const userRef = firebase.database().ref("user");

  useEffect(() => {
    userRef.on("child_added", (snap) => {
      setUserState((cur) => {
        let user = snap.val();
        user.name = user.displayName;
        user.id = snap.key;
        user.privit = true;
        let newstate = [...cur, user];
        return newstate;
      });
    });

    return () => userRef.off();
  }, []);

  const generateChannelId = (userId) => {
    if (props.user.uid < userId) {
      return props.user.uid + userId;
    } else {
      return userId + props.user.uid;
    }
  };

  const userSelect = (user) => {
    const usertemp = { ...user };
    usertemp.id = generateChannelId(user.id);
    props.selectchannel(usertemp);
  };

  const displayUsers = () => {
    if (userstate.length > 0) {
      return userstate
        .filter((user) => user.id !== props.user.uid)
        .map((user) => {
          return (
            <Menu.Item
              key={user.id}
              name={user.name}
              onClick={() => userSelect(user)}
              active={
                props.channel && generateChannelId(user.id) === props.channel.id
              }
            >
              {"@ " + user.name}
            </Menu.Item>
          );
        });
    }
  };

  return (
    <Menu.Menu>
      <Menu.Item>
        <span>
          <Icon name="mail" />
          Chatting
        </span>
        ({userstate.length - 1})
      </Menu.Item>
      {displayUsers()}
    </Menu.Menu>
  );
}
const mapsStateToProps = (state) => {
  return {
    user: state.userReducer.curUser,
    channel: state.channelReducer.curChannel,
  };
};
const mapsdispatchToProps = (dispatch) => {
  return {
    selectchannel: (channel) => dispatch(setChannel(channel)),
  };
};
export default connect(mapsStateToProps, mapsdispatchToProps)(PrivitChat);
