import React from "react";
import { Segment, Icon, Header, Input } from "semantic-ui-react";
import "./MessageHeader.css";

function MessageHeader(props) {
  return (
    <Segment className="segmentheader">
      <Header fluid="true" as="h2">
        <span>
          {(props.isPrivate ? "@" : "#") + props.channelname}
          {!props.isPrivate && (
            <Icon
              onClick={props.starChange}
              name={props.starCheck ? "star" : "star outline"}
              color={props.starCheck ? "blue" : "black"}
            />
          )}
        </span>
        <Header.Subheader className="subheader">
          {props.usercount} user{props.usercount === 1 ? "" : "s"}
        </Header.Subheader>
      </Header>
      <Header className="inputheader">
        <Input
          name="search"
          icon="search"
          size="mini"
          placeholder="Search Messages"
          className="searchinput"
          onChange={props.searchcng}
        />
      </Header>
    </Segment>
  );
}

export default MessageHeader;
