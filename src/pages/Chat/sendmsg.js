import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { TextareaAutosize, CircularProgress } from  "@material-ui/core";

import {CREATE_MESSAGE, GET_MESSAGES} from "../../graphql/messages";
import "./chat.css";


/** Create a message component */
const  Sendmessage = () => {
  const [ body, setBody] = useState("")

 const handleChange = (e) => {
       setBody( e.target.value);
 }


 const [sendMessage, {data, loading}] =  useMutation(CREATE_MESSAGE, {
    variables: { body },
    update(cache,{data}){
      //add new data to existing data
      const newMessage = data?.createMessage
      const existingComments = cache.readQuery({
        query:GET_MESSAGES});
      cache.writeQuery({
        query:GET_MESSAGES,
        data:{
          getMessages:
                [ newMessage,...existingComments.getMessages]
        }
      })
    }
 })


const  handleSubmit = (e) => {
  e.preventDefault()
  sendMessage();
  setBody("");
}


 return (
  <div className="addMessagewrapper">
    <div className="addmessage">
        <form className="messageForm" onSubmit={handleSubmit}>
                    <TextareaAutosize autoFocus value={body} onChange={handleChange}  name="message" className="textarea"/>

                    {!data && loading ?
                      <button className="loadingbutton" ><CircularProgress  size="1rem" color="primary"/></button> :
                      <button type="submit"  disabled={!body || body.trim() === ""} className="messagebutton" >Send </button>}
        </form>
        {(!data && loading) &&
          <div className="mloader">
            { <CircularProgress/>}
         </div>
        }
        { data &&
          <div className="mloader">
            {data && !loading && <h1>Sent succesfully</h1>}
        </div>}
    </div>
  </div>
 )
}

export default Sendmessage;
