import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { TextareaAutosize, CircularProgress } from  "@material-ui/core";
import {DoneAll} from "@material-ui/icons";

import {SEND_REPLY, GET_MESSAGE} from "../../graphql/messages";
import "./chat.css";


/** Create a reply component */
const  Reply = ({messageId}) => {
  const [ body, setBody] = useState("")

 const handleChange = (e) => {
       setBody( e.target.value);
 }

 const [sendReply, {data, loading}] =  useMutation(SEND_REPLY, {
    variables: { body, messageId },
    refetchQueries:[
      {query: GET_MESSAGE, variables:{messageId}}
    ]
 })


const  handleSubmit = (e) => {
  e.preventDefault()
  sendReply();
  setBody("");
}


 return (
  <div className="addReplywrapper">
    <div className="addmessage">
        <form className="messageForm" onSubmit={handleSubmit}>
                    <TextareaAutosize autoFocus value={body} onChange={handleChange}  name="message" className="textarea"/>

                    {(!data && loading) &&
                      <button className="loadingbutton" disabled={!body || body.trim() === ""}><CircularProgress  size="1rem" color="primary"/></button> }

                     {(!data && !loading )&& <button type="submit"  disabled={!body || body.trim() === ""} className="messagebutton" >Send </button>}

                    {(data && !loading) && <button  disabled={!body || body.trim() === ""}
                    className="loadingbutton" ><DoneAll color="primary"/></button>}
        </form>
        { data &&
          <div className="mloader">
            {data && !loading && <h1 style={{color:"blue"}}>Reply sent succesfully</h1>}
        </div>}
    </div>
  </div>
 )
}

export default Reply;
