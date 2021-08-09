import React,{useContext} from 'react';
import Header from "../../components/Header/routeHeader";
import {PostNotificationContext} from "../../Utils/PostNotificationContext";
// import { timeAgo } from '../../Utils/date';
import "./postNotification.css";


const PostNotification = () => {
      const {data} = useContext(PostNotificationContext);

      console.log(data)

 return(
    <div>
     <Header tag={"Notificatins"}/>
      <div className="notification_container" >
            {/* <div>
               <p>{info?.title}</p>
               <b>{timeAgo(info?.createdAt)}</b>

            </div>
         <div className="notification_img">
            <img src={Netlify} width="100" height="50%"/>
         </div> */}
         <h1>New item created !!</h1>
      </div>
    </div>
 )
}
export default React.memo(PostNotification);
