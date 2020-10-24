import React from "react";
import "./MessageContent.css";
import { Comment, Image } from "semantic-ui-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.locale(en);

const timeAgo = new TimeAgo();

function Message(props) {
  return (
    <Comment>
      <Comment.Avatar src={props.message.user.avatar}></Comment.Avatar>
      <Comment.Content className={props.owner ? "owner" : "other"}>
        <Comment.Author as="a">{props.message.user.name}</Comment.Author>
        <Comment.Metadata>
          {timeAgo.format(props.message.timestamp)}
        </Comment.Metadata>
        {props.message.image ? (
          <Image src={props.message.image} />
        ) : (
          <Comment.Text>{props.message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
}

export default Message;
