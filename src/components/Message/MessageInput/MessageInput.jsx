import React from 'react'
import {Input,Segment,Button} from 'semantic-ui-react'
import './MessageInput.css'
function MessageInput() {

    const actionButtons = () => {
        return (
        <>
        <Button icon="send"/>
        <Button icon="upload" />       
        </>
        )
    }

    return (
        <Segment className='uploadsegment'>
            <Input fulid={true} label={actionButtons()} labelPosition='right' className='uploadinput' placeholder='Enter Message...' />
            
        </Segment>
    )
}

export default MessageInput
