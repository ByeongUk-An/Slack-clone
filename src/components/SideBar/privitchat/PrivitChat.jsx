import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import { setChannel } from "../../../store/action";
import { Menu, Icon } from "semantic-ui-react";

function PrivitChat(props) {
  const [userstate, setUserState] = useState([]);
  const [online, setOnline] = useState([]);
  const onlineRef = firebase.database().ref(".info/connected");
  const statusRef = firebase.database().ref("status");
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

    onlineRef.on("value", (snap) => {
      if (props.user && snap.val()) {
        const userStateRef = statusRef.child(props.user.uid);
        userStateRef.set(true);
        userStateRef.onDisconnect().remove();
      }
    });

    return () => {
      userRef.off();
      onlineRef.off();
    };
  }, [props.user]);

  useEffect(() => {
    statusRef.on("child_added", (snap) => {
      setOnline((cur) => {
        let newState = [...cur, snap.key];
        return newState;
      });
    });

    statusRef.on("child_removed", (snap) => {
      setOnline((cur) => {
        let newstate = [...cur];
        let index = newstate.indexOf(snap.key);
        newstate.splice(index, 1);
        return newstate;
      });
    });

    return () => {
      statusRef.off();
      console.log(props.user.uid);
    };
  }, [userstate]);

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
              <Icon
                name="circle"
                color={`${online.indexOf(user.id) !== -1 ? "green" : "red"}`}
              />
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
      {props.user.uid ? displayUsers() : null}
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
