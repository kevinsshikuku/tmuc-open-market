import React from 'react';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import{ Link , useLocation} from "react-router-dom"



/** Floating action button */
function FabComponent() {
 const location = useLocation();

 return (
   <div>
     {  !(location.pathname === "/chat" ) &&
      <div className="fab">
            <Link to={ "/chat"}>
                  <Fab color="primary" aria-label="add">
                      <ChatIcon />
                </Fab>
          </Link>
      </div>
    }
   </div>
 )
}

export default FabComponent;