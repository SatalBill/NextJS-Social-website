import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import EmojiField from './EmojiField'
// import WebRTC from '../../../webrtc/webrtc'

const ChatInput = (props) => {
    const dispatch = useDispatch();
    const users = useSelector(state=>state.users);
    const onChange = (val)=>{
        // val = val.split('\n').join('<br>')
        // console.log(val, '---------', val.split('\n').join('<br>'))
        // console.log('isRead : ', props.chatOpen)
        if(users.length>0){
            dispatch({type: 'chat_add', value: {username: 'Me', userid:'me', text: val, align: 'right', time: Date.now(), isRead: props.chatOpen}})
            // WebRTC.getInstance().sendMessage({message: val, isRead: props.chatOpen});
        }
    }
    const inputRef = useRef(null);
    return (
        <div className='chatinput'>
            <EmojiField 
                onChange={onChange}
                fieldType='textarea' 
                ref={inputRef}
                placeholder='Type messages here...'
            />
        </div>
    );
}
export default ChatInput;