import React from "react";
import   "./header.css";

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Routes from "../../store/routes";



/**ProfileHeader Header... */
const ProfileHeader = ({tag}) => {
const { backHome, } = Routes()


return(
<>
 <div className="othertHeader">
   <div className="loggedOutTab">
      <p onClick={backHome}><span className="logo"><ArrowBackIos/></span></p>
      <span className="logo"> {tag} </span>
   </div>
 </div>
</>
)
}

export default ProfileHeader;