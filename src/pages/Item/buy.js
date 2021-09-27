import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useQuery}  from '@apollo/client';

import {GET_BUY } from '../../graphql/buy';
import RouteHeader from "../../components/Header/routeHeader";
import { weekDay} from '../../Utils/date';
import "./item.css"
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {SkeletonPost, SkeletonBar2, SkeletonBuyersCard} from "../../components/Skeleton/skeleton";



/**single Item component */
function BuyItem() {
 const path = useRouteMatch();
 const _id = path.params.id.split(':').pop();
 UsedocumentTitle("Item")

 const { data,loading} = useQuery(GET_BUY,{
   variables:{
     id: _id
   }
 });


  let loader;
  if(loading){
    return (
    <>
    <RouteHeader tag="product details"/>
    <br/> <br/>
    <SkeletonPost/>
    <SkeletonBar2/>
    </>
    )
  }




const {pricerange, title, description, features,location, createdAt} = data.getBuy;
const weekday = weekDay(createdAt)

 const itemFeatures = features && features.split("#")
 const main = (
  <>
    <div className="buyCard">
        <div className="cardMedia" >
          <SkeletonBuyersCard title={title}/>
       </div>

        <div className="itemStats">
          <p>Posted on -  <b>{weekday}</b></p>
        </div>


        {pricerange &&
        <div className="item_price">
            <b>Price-range</b>
               <div style={{color:"blue"}} >{ pricerange && <p>Ksh.{pricerange}</p>}</div>
        </div>}

        { location &&
        <div className="itemlocation">
          <p style={{fontWeight:"bolder"}}>Located:</p>
          {location ? `Located: ${location}` : "Location not specified..."}
        </div>}

       {description &&
        <div className="itemDescription">
          <p style={{fontWeight:"bolder"}}>Item description:</p>
          {description}
        </div>
       }

        {features &&
        <div className="itemFeatures">
          <p style={{fontWeight:"bolder"}}>Desired features:</p>
            <ul>
              {itemFeatures.map((item, i) => (
                 <li key={i} >{item}</li>
              ))}
            </ul>

        </div>
        }

    </div>
  </>

)


 return (
  <>
  <RouteHeader tag={"product details"}/>
  {loading ? loader : main}
  </>
 )
}

export default BuyItem;

