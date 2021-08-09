import React from 'react'


/** custom Footer component */
function CustomFooter({name}) {
 return (
  <div className="footer">
    <h6 style={{fontWeight:"lighter"}} > <span style={{color:"red"}}> copyright: {name}</span></h6>

  </div>
 )
}

export default CustomFooter;
