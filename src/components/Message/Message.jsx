import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageInput from "./MessageInput/MessageInput";
import { Segment, Comment, ItemImage } from "semantic-ui-react";
import MessageContent from "./MessageContent/MessageContent";
import { connect } from "react-redux";
import { setFavChannel, removeFavChannel } from "../../store/action";
import "./Message.css";
import firebase from "../../server/firebase";

function Message(props) {
  const [message, setMessage] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const messageRef = firebase.database().ref("message");

  const userRef = firebase.database().ref("uaer");

  useEffect(() => {
    if (props.channel) {
      setMessage([]);
      messageRef.child(props.channel.id).on("child_added", (snap) => {
        setMessage((cur) => {
          const newState = [...cur];
          newState.push(snap.val());
          return newState;
        });
      });
      return () => messageRef.child(props.channel.id).off();
    }
  }, [props.channel]);
  // console.log(message);

  useEffect(() => {
    if (props.user) {
      userRef
        .child(props.user.uid)
        .child("favourite")
        .on("child_added", (snap) => {
          props.setFavChannel(snap.val());
        });

      userRef
        .child(props.user.uid)
        .child("favourite")
        .on("child_removed", (snap) => {
          props.removeFavChannel(snap.val());
        });

      return () => userRef.child(props.user.uid).child("favourite").off();
    }
  }, [props.user]);

  const usercount = () => {
    const inUser = message.reduce((acc, msg) => {
      if (!acc.includes(msg.user.name)) {
        acc.push(msg.user.name);
      }
      return acc;
    }, []);

    return inUser.length;
  };

  const showMessage = () => {
    let messageshowing = searchterm ? fillteringMessage() : message;
    if (messageshowing.length > 0) {
      return messageshowing.map((item) => {
        return (
          <MessageContent
            owner={item.user.id === props.user.uid}
            key={item.timestamp}
            message={item}
          />
        );
      });
    }
  };
  const fillteringMessage = () => {
    const regexp = new RegExp(searchterm, "gi");
    const messages = message.reduce((acc, msg) => {
      if (
        (msg.content && msg.content.match(regexp)) ||
        msg.user.name.match(regexp)
      ) {
        acc.push(msg);
      }

      return acc;
    }, []);
    // console.log(messages);
    return messages;
  };
  const searchTermCng = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    console.log(searchterm);
  };

  const cngstart = () => {
    let favRef = userRef
      .child(props.user.uid)
      .child("favourite")
      .child(props.channel.id);
    if (isStarCheked()) {
      favRef.remove();
    } else {
      favRef.set({
        channelId: props.channel.id,
        channelName: props.channel.name,
      });
    }
  };

  const isStarCheked = () => {
    return Object.keys(props.favChannel).includes(props.channel?.id);
  };

  return (
    <div className="message-box">
      <MessageHeader
        starChange={cngstart}
        starCheck={isStarCheked()}
        channelname={props.channel?.name}
        usercount={usercount()}
        searchcng={searchTermCng}
        className={props.channel?.name}
        isPrivate={props.channel?.privit}
      />
      <Segment className="commentcontent">
        <Comment.Group>{showMessage()}</Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    channel: state.channelReducer.curChannel,
    user: state.userReducer.curUser,
    favChannel: state.favReducer.favChannel,
  };
};

const mapsDispatchToProps = (dispatch) => {
  return {
    setFavChannel: (channel) => dispatch(setFavChannel(channel)),
    removeFavChannel: (channel) => dispatch(removeFavChannel(channel)),
  };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Message);
