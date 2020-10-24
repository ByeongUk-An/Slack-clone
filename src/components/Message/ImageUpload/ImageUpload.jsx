import React, { useState } from "react";
import { Button, Input, Modal, Icon } from "semantic-ui-react";
import mime from "mime-types";

function ImageUpload(props) {
  const [files, setFiles] = useState(null);
  const accepted = ["image/png", "image/jpeg"];
  const onFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(file);
    }
  };
  const onSubmit = () => {
    if (files && accepted.includes(mime.lookup(files.name))) {
      props.uploadImage(files, mime.lookup(files.name));
      props.onClose();
      setFiles(null);
    }
  };
  return (
    <Modal basic open={props.open} onClose={props.onClose}>
      <Modal.Header>Choise image</Modal.Header>
      <Modal.Content>
        <Input
          type="file"
          name="file"
          onChange={onFile}
          fluid
          label="File Type(png, jpeg)"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onSubmit}>
          <Icon name="checkmark" />
          ADD
        </Button>
        <Button color="red" onClick={props.onClose}>
          <Icon name="remove" />
          CLOSE
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ImageUpload;
