import React from 'react'
import MessageHeader from './MessageHeader/MessageHeader'
import MessageInput from './MessageInput/MessageInput'
import { Segment, Comment } from 'semantic-ui-react'
import './Message.css'

function Message() {
    return (
        <div>
            <MessageHeader />
            <Segment className='commentcontent'>
                <Comment.Group>

                </Comment.Group>
           </Segment>
            <MessageInput/>
        </div>
    )
}

export default Message

