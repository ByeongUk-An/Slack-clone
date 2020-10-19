import React,{useState} from 'react'
import {Input,Segment,Button,Form} from 'semantic-ui-react'
import './MessageInput.css'
import firebase from '../../../server/firebase'
import {connect} from 'react-redux'
function MessageInput(props) {
    const [message, setMessage] = useState(null);
    const messageRef = firebase.database().ref('message');
    const onChange = (e) => {
        const { value } = e.target;
        setMessage(value);
    }

    const createMessage = () => {
        return {
            user: {
                avatar: props.user.photoURL,
                name: props.user.displayName,
                id: props.user.uid
            },
            content: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP 
        }
    }

    const onSubmit = () => {
        if (message !== null) {
            messageRef.child(props.channel.id)
                .push()
                .set(createMessage())
                .then(() => setMessage(""))
                .catch(error => console.log(error))
        }
    }
    // const onKeypress = (e) => {
    //     console.log(e.key)
    // }

    const actionButtons = () => {
        return (
        <>
        <Button onClick={onSubmit} icon="send"/>
        <Button icon="upload" />       
        </>
        )
    }

    return (
        <Segment className='uploadsegment'>
            <Form className='uploadform' onSubmit={onSubmit}>
            <Input
                fluid='true'
                label={actionButtons()}
                labelPosition='right'
                className='uploadinput'
                placeholder='Enter Message...'
                onChange={onChange}
                name='message'
                value={message}
                // onKeypress={onKeypress}
            />
            </Form>
            
        </Segment>
    )
}
const mapsStateToProps = (state) => {
    return {
        user: state.userReducer.curUser,
        channel: state.channelReducer.curChannel
    }
}


export default connect(mapsStateToProps)(MessageInput)
