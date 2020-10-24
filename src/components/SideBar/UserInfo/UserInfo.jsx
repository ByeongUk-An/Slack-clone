import React from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import "./UserInfo.css";
import firebase from "../../../server/firebase";
function UserInfo(props) {
  const dropDownOption = () => {
    return [
      {
        key: "logout",
        text: <span onClick={logOut}>Log Out</span>,
      },
    ];
  };

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("HELLO"));
  };

  if (props.user) {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row className="grid__row">
            <Header inverted as="h1">
              <Icon name="slack hash" />
              <Header.Content>Slack</Header.Content>
            </Header>
            <Header inverted as="h3" className="display__name">
              <Dropdown
                trigger={
                  <span>
                    <Image src={props.user.photoURL} avatar></Image>
                    {props.user.displayName}
                  </span>
                }
                options={dropDownOption()}
              ></Dropdown>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
  return null;
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.curUser,
  };
};

export default connect(mapStateToProps)(UserInfo);
