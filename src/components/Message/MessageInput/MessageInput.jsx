import React, { useState } from "react";
import { Input, Segment, Button, Form } from "semantic-ui-react";
import "./MessageInput.css";
import firebase from "../../../server/firebase";
import { connect } from "react-redux";
import ImageUpload from "../ImageUpload/ImageUpload";
import { v4 as uuid } from "uuid";

function MessageInput(props) {
  const [message, setMessage] = useState("");
  const [filedata, setFileData] = useState(false);
  const messageRef = firebase.database().ref("message");
  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const storegeRef = firebase.storage().ref();

  const createMessage = (downloadURL) => {
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: message,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    console.log(downloadURL);
    if (message || downloadURL) {
      messageRef
        .child(props.channel.id)
        .push()
        .set(createMessage(downloadURL))
        .then(() => setMessage(""))
        .catch((error) => console.log(error));
    }
  };
  // const onKeypress = (e) => {
  //   console.log(e.key);
  // };

  const uploadImage = (file, contenttype) => {
    const filepath = `chat/image/${uuid()}.jpg`;

    storegeRef
      .child(filepath)
      .put(file, {
        contenttype: contenttype,
      })
      .then((data) => {
        data.ref
          .getDownloadURL()
          .then((url) => {
            onSubmit(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionButtons = () => {
    return (
      <>
        <Button
          onClick={() => {
            onSubmit();
          }}
          icon="send"
        />
        <Button icon="upload" onClick={() => setFileData(true)} />
      </>
    );
  };

  return (
    <Segment className="uploadsegment">
      <Form className="uploadform">
        <Input
          fluid="true"
          label={actionButtons()}
          labelPosition="right"
          className="uploadinput"
          placeholder="Enter Message..."
          onChange={onChange}
          name="message"
          value={message}
          // onKeypress={onKeypress}
        />
      </Form>

      <ImageUpload
        uploadImage={uploadImage}
        open={filedata}
        onClose={() => setFileData(false)}
      />
    </Segment>
  );
}
const mapsStateToProps = (state) => {
  return {
    user: state.userReducer.curUser,
    channel: state.channelReducer.curChannel,
  };
};

export default connect(mapsStateToProps)(MessageInput);
