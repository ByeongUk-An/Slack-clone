import React from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import { setChannel } from "../../../store/action";

const FavChannel = (props) => {
  const showChannel = () => {
    if (Object.keys(props.favChannel).length > 0) {
      return Object.keys(props.favChannel).map((channelId) => {
        return (
          <Menu.Item
            key={channelId}
            name={props.favChannel[channelId]}
            onClick={() =>
              props.selectChannel({
                id: channelId,
                name: props.favChannel[channelId],
                isFav: true,
              })
            }
            active={
              props.channel &&
              channelId === props.channel.id &&
              props.channel.isFav
            }
          >
            {`# ${props.favChannel[channelId]}`}
          </Menu.Item>
        );
      });
    }
  };
  return (
    <Menu.Menu>
      <Menu.Item>
        <span>
          <Icon name="star" />
          Starred
        </span>
        ({Object.keys(props.favChannel).length})
      </Menu.Item>
      {showChannel()}
    </Menu.Menu>
  );
};
const mapsStateToProps = (state) => {
  return {
    channel: state.channelReducer.curChannel,
    favChannel: state.favReducer.favChannel,
  };
};
const mapsDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};
export default connect(mapsStateToProps, mapsDispatchToProps)(FavChannel);
