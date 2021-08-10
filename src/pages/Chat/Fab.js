import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddCommentIcon from '@material-ui/icons/AddComment';


/** Floating action button */
function FabComponent() {

 return (
   <div>
     {
      <div className="fab">
          <Fab color="primary" aria-label="add">
                <AddCommentIcon />
          </Fab>
      </div>
    }
   </div>
 )
}

export default FabComponent;