import React, {useState} from 'react';
import { timeAgo } from '../../Utils/date';
import {Avatar } from '@material-ui/core';
import {ReplySharp, ArrowDropDownRounded, ArrowDropUp } from '@material-ui/icons';
import Reply  from './reply';
import "./chat.css";

function Message({message}) {
const [open, setOpen] = useState(false);
const [reply, setReply] = useState(false);
const { sender, replies } = message
  return (
    <>
    <div className="message">
        <div className="time"> {timeAgo(message?.createdAt)} </div>
       <div className="mbody"><p>{message.body}</p></div>

       <div className="meta">
            {sender &&
            <div className="avator">
                <Avatar src={message?.sender?.image}/>
                <p>{ message.sender.username}</p>
            </div>}
            <div className="replyArrow">
               <ReplySharp fontSize="large" onClick={() => setReply(!reply)}/> <i>{replies.length}</i>
            </div>

            {!open ? <div> <ArrowDropDownRounded fontSize="large" onClick={() => setOpen(!open)}/></div> :
              <div> <ArrowDropUp fontSize="large" onClick={() => setOpen(!open)}/></div>}
       </div>
       {open &&
       <>
         <br/>
         <p>Replies</p>
         {message?.replies.map(( reply, i) => (
             <div className="reply"> <p>{reply.body}</p> </div>
         ))}
        <div> <ArrowDropUp fontSize="large" onClick={() => setOpen(!open)}/></div>
       </>
       }
    </div>
    <br/>
   {reply && <Reply messageId={message?.id}/>}
    </>
    )}

export default Message;
