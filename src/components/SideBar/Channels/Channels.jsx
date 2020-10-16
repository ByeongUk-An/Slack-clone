import React, {useState,useEffect} from 'react'
import './Channels.css'
import {connect} from 'react-redux';
import { Menu,Icon,Modal,Form, Segment,Button, MenuItem} from 'semantic-ui-react';
import firebase from '../../../server/firebase';
import {setChannel} from '../../../store/action'

function Channels(props) {
    const [openstate,setOpenState] = useState(false);
    const [channelstate,setChannelState] = useState({name:'',discription:''});
    const [loading, setLoading] = useState(false);
    const [channeldata, setChannelData] = useState([]);

    const channelRef = firebase.database().ref('channels');

    
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

    const channelPrint = () => {
        if (channeldata.length >= 1) {
            return channeldata.map((channel) => {
                return <MenuItem key={channel.id} name={channel.name} onClick={()=> props.selectChannel(channel)} active={channel.id === props.channel.id}></MenuItem>
            })
        }
    }
    
    useEffect(() => {
        channelRef.on('child_added', (snap) => {
            setChannelData(curstate => {
              
                const newstate = [...curstate, snap.val()]
                
                if (newstate.length === 1) {
                    props.selectChannel(newstate[0])
                }
                return newstate;
            })
        })
    },[])
    return (
        <>
        <Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="exchange" /> Channels
                </span>
                ({channeldata.length})
            </Menu.Item>
                {channelPrint()}
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
        user: state.userReducer.curUser,
        channel: state.channelReducer.curChannel
    }
}

const mapdispatchToProps = dispatch => {
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
        
    }
}

export default connect(mapStateToProps,mapdispatchToProps)(Channels)

