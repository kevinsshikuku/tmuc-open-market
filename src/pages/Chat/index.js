import React, { useState} from 'react';
import {useQuery}  from '@apollo/client';

import Header from "../../components/Header";
import { GET_MESSAGES} from "../../graphql/messages";
import Message from "./message";
import "./chat.css";
import Fab from "./Fab";
import { Close} from "@material-ui/icons";
import LinearProgress from '@material-ui/core/LinearProgress';
import SendMessage from "./sendmsg";




function Index() {
  const [show, setShow] = useState(false);
  const { data,loading} = useQuery(GET_MESSAGES);

 if(loading){
   return(
     <>
      <Header/>
      <div className="Cloading">
        <p>OPEN CHAT</p>
        <LinearProgress className="progress"/>
      </div>
     </>
   )}

  return (
    <>
    <Header/>
    { !show && <div onClick={() => setShow(true)}> <Fab/> </div>}
    {show &&
    <div className="nav">
        <p onClick={() => setShow(false)}> <Close/> </p>
    </div>}

    {!show &&
     <div className="chat_wrapper">
       { data?.getMessages?.map( (message, i) => (
                    <div  key={i}  className="text">
                          { <Message  message={message}/>}
                    </div>
                    ))}
     </div>}
     {show && <SendMessage/>}
  </>
  )
}

export default Index
