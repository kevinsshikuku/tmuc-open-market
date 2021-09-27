import React from 'react';
import "./acodion.css";


/** Image overlay */
function Overlay({image, btn, state, alt}) {

 return (
  <div>
     { state &&
     <div className="overlay" >
       {
       image &&
       <>
         <div className="close_btn" > {btn} </div>
         <img src={image} alt={alt} width="100%" height="50%"/>
       </>
       }
     </div>
     }
  </div>

 )
}

export default Overlay;
