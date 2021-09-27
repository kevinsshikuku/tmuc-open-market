import React from 'react';
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import "./people.css";



function Person({person}) {
 const {username, image, phonenumber} = person;
 const history = useHistory();

 const toProfile = () =>{
     history.push(`/${username}`)
 }


 return (
  <div className="person_wrapper" onClick={toProfile} >
      <div className="person_header">
         {image ? <Avatar alt={username} src={image} /> : <Avatar alt="avator"/>}
         <div className="person_contact">
            <h4>{username}</h4>
            <p>{phonenumber}</p>
         </div>
      </div>
  </div>
 )
}

export default Person
