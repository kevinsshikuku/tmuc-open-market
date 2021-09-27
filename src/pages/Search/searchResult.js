import React from 'react';
import shoes from "../../Assets/netlify.jpg";
import {useHistory} from "react-router-dom";
import {ShareRounded}  from "@material-ui/icons";



/** Search result */
function SerchResult({post}) {
 const history = useHistory();
 const { id, title, price, image} = post;
 const toPost = () =>{
    history.push(`/item/${id}`)
 }

 return (
<>
  <div className="post_result" onClick={toPost}>
       <img width="30%" src={image || shoes} alt={post.title} />
       <div className="post_result_detais">
         <p>{`Ksh. ${price}`}</p>
       </div>
       <p className="post_result_time"><ShareRounded/></p>
  </div>
  <p>{title}</p>
  <hr/>
</>
 )
}

export default SerchResult;
