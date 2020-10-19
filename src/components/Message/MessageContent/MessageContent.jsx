import React from 'react'
import './MessageContent.css'
import { Comment } from 'semantic-ui-react'
import TimeAgo from 'javascript-time-ago'
import ko from 'javascript-time-ago/locale/ko'

TimeAgo.locale(ko);

const timeAgo = new TimeAgo();

function Message(props) {
    return (
        <Comment>
            <Comment.Avatar src={props.message.user.avatar}></Comment.Avatar>
        </Comment>
    )
}

export default Message


