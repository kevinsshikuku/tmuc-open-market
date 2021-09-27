import React from "react";
import   "./header.css";
import {useHistory} from "react-router-dom";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';



/**RouteHeader  */
const RouteHeader = ({tag}) => {
const history = useHistory();

return(
<>
 <div className="othertHeader">
      <div className="loggedOutTab">
         <p onClick={ () => history.goBack()}><span className="logo"><ArrowBackIos/></span></p>
         <div><span className="logo"> {tag} </span></div>
      </div>
 </div>
</>
)
}

export default RouteHeader;