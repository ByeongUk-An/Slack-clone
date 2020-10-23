import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageInput from "./MessageInput/MessageInput";
import { Segment, Comment, ItemImage } from "semantic-ui-react";
import MessageContent from "./MessageContent/MessageContent";
import { connect } from "react-redux";
import "./Message.css";
import firebase from "../../server/firebase";

function Message(props) {
  const [message, setMessage] = useState([]);
  const messageRef = firebase.database().ref("message");

  useEffect(() => {
    if (props.channel) {
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
  console.log(message);

  return (
    <div className="message-box">
      <MessageHeader />
      <Segment className="commentcontent">
        <Comment.Group>
          {message.length > 0
            ? message.map((item) => {
                return (
                  <MessageContent
                    owner={item.user.id === props.user.uid}
                    key={item.timestamp}
                    message={item}
                  />
                );
              })
            : null}
        </Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    channel: state.channelReducer.curChannel,
    user: state.userReducer.curUser,
  };
};

export default connect(mapStateToProps)(Message);
