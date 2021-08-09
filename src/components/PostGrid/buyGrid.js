import React from 'react';
import {useStore} from "../../store";

import {SkeletonPost} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import DeleteButton from "../Delete/Delete";
import  "./postGrid.css";


/** This is a user post grid component */
const  Buygrid = ({buy})  => {
      const [{auth}] = useStore();
      const { id, author, pricerange,  title,features, createdAt} = buy;
      const weekday = weekDay(createdAt);
      const featuresList = features?.split("#")

 return (
  <>
    <div className="media_wrapper">
        <div className="media">
            {<SkeletonPost title={title}/>}
        </div>

           <div className="action_btns">
              {pricerange && <p>{`Ksh ${pricerange}`}</p>}
              <p>{weekday}</p>
              {(auth.user.username ===  author.username) && <DeleteButton buyId={id}/>}
           </div>



        {features &&
         <div className="grid_post_price" >
          <b>Desired feature:</b>
          <ul>
            {featuresList.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>}
    </div>
  </>
 )
}

export default Buygrid;
