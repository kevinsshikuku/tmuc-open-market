import React from "react";
import   "./header.css";

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Routes from "../../store/routes";



/**Other Header... */
const OtherHeader = ({tag}) => {
const { backHome, } = Routes()


return(
<>
 <div className="othertHeader">
   <div className="otherHearderTab">
      <p onClick={backHome}><span className="back_arrow"><ArrowBackIos/></span></p>
      <h1 style={{fontSize:"large"}} className="other_header_tag"> {tag} </h1>
   </div>
 </div>
</>
)
}

export default OtherHeader;