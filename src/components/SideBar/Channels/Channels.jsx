import React, {useState} from 'react'
import './Channels.css'
import {connect} from 'react-redux';
import { Menu,Icon,Modal,Form, Segment,Button} from 'semantic-ui-react';
import firebase from '../../../server/firebase';

function Channels(props) {
    const [openstate,setOpenState] = useState(false);
    const [channelstate,setChannelState] = useState({name:'',discription:''});
    const [loading,setLoading] = useState(false);
    const channelRef = firebase.database().ref('channels')
    console.log(channelstate);
    const openmodal = () => {
        setOpenState(true)
    }
    const closemodal = () => {
        setOpenState(false)
    }

    const checkFormValida = () => {
        return channelstate && channelstate.name && channelstate.discription;
    }

    const onSubmit = () => {

        if(!checkFormValida){
            return;
        }

        const key = channelRef.push().key;
        const channel = {
            id: key,
            name: channelstate.name,
            discription: channelstate.discription,
            created: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }

        setLoading(true);
        channelRef.child(key).update(channel)
        .then(() => {
            setChannelState({
                name:'',
                discription:'',
            })
            closemodal();   
            setLoading(false);
        })
        .catch(error => console.log(error))
    }
    
    const handleInput = (e) => {
        const {target: {name, value}} = e;
        setChannelState((curstate)=>{
            const newstate = {...curstate, [name]: value}
            return newstate;
        })
        
    }
    return (
        <>
        <Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="exchange" /> Channels
                </span>
                (0)
            </Menu.Item>
            <Menu.Item>
                <span className='add_btn' onClick={openmodal}>
                    <Icon name="add" /> Add
                </span>
            </Menu.Item>
        </Menu.Menu>
        <Modal open={openstate} onClose={closemodal}>
            <Modal.Header>
                Create Channel
            </Modal.Header>
            <Modal.Content>
            <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="name"
              onChange={handleInput}
              value={channelstate.name}
              type="text"
              placeholder="Input Channel Name"
            />

            <Form.Input
              name="discription"
              onChange={handleInput}
              value={channelstate.discription}
              type="text"
              placeholder="Input Channel Discription"
            />
          </Segment>
        
        </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button loading={loading} onClick={onSubmit}>
                    <Icon name='checkmark'/> save
                </Button>
                <Button onClick={closemodal}>
                    <Icon name='remove'/> cancle
                </Button>
            </Modal.Actions>
        </Modal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.curUser
    }
}

export default connect(mapStateToProps)(Channels)

