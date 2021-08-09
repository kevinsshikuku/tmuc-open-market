import React from 'react'
import {useHistory} from "react-router-dom";
import Routes from "../../store/routes";
import { useStore } from '../../store';
import {SideBar, LogeddeOutSideBar} from "./SideBar";
// import {PostNotificationContext} from "../../Utils/PostNotificationContext";
import {} from '@material-ui/icons';
import   "./header.css";


/** Dynamic Header components */
function Header() {
 const [{auth}] = useStore()
 const history = useHistory();
 const path = history.location.pathname
 const {buyers, backHome} = Routes();


const header_logic = (
<>
 <div className="loggedInHeader">
    <div className="loggedInTabs">
      { path === "/" ?
      <p><span style={{color:"blue"}} className="logo"> SELLERS </span></p> :
      <p  onClick={backHome}><span className="logo">SELLERS</span></p>}

      { path === "/buyers" ?
      <p><span className="logo" style={{color:"blue"}}> BUYERS </span></p> :
      <p  onClick={buyers}><span className="logo">BUYERS</span></p>}


    </div>
    {auth.user ? <SideBar/> : <LogeddeOutSideBar/>}
 </div>
</>
);

  return header_logic
}

export default Header;
