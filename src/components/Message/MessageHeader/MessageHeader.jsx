import React from 'react'
import { Segment, Icon, Header, Input } from 'semantic-ui-react'
import './MessageHeader.css'

function MessageHeader() {
    return (
        <Segment className='segment'>
            <Header fulid='true' as='h2'>
                <span>#REACT <Icon name='star outline' /></span>
                <Header.Subheader className='subheader'>1111users</Header.Subheader>
            </Header>
            <Header className='inputheader'>
                <Input name='search' icon='search' size='mini' placeholder='Search Messages' className='searchinput'/>
            </Header>
        </Segment>
    )
}

export default MessageHeader
