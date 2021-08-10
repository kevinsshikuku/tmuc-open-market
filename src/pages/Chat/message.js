import React from 'react';
import { timeAgo } from '../../Utils/date';
import {Avatar } from '@material-ui/core';
import "./chat.css";

function Message({message}) {
  return (
    <div className="message">
       <div className="mbody"><p>{message.body}</p></div>

       <div className="meta">
         <div className="avator">
            <Avatar src={message?.sender?.image}/>
            <p>{ message.sender ? message.sender.username : "---"}</p>
         </div>
         <div className="time"> {timeAgo(message?.createdAt)} </div>
       </div>
    </div>
    )}

export default Message
