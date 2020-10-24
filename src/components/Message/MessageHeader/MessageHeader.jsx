import React from "react";
import { Segment, Icon, Header, Input } from "semantic-ui-react";
import "./MessageHeader.css";

function MessageHeader(props) {
  return (
    <Segment className="segmentheader">
      <Header fluid="true" as="h2">
        <span>
          {props.channelname}
          <Icon name="star outline" />
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
