import React from 'react';
import {useQuery}  from '@apollo/client';
import RouteHeader from "../../components/Header/routeHeader";
import { GET_USER_BUYS } from '../../graphql/user';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Buygrid from "../../components/PostGrid/buyGrid";
import {useRouteMatch} from 'react-router-dom';
import { Waypoint} from "react-waypoint";
import { Skeleton} from "../../components/Skeleton/skeleton";
import {ShoppingBasketOutlined} from "@material-ui/icons";


/**User items */
function UserBuys() {

const location = useRouteMatch();
const username = location.params.username.split(':').pop()
const variables = {
  username,
  skip: 0,
  limit: HOME_PAGE_POSTS_LIMIT,
};


 const { data,loading, fetchMore}= useQuery(GET_USER_BUYS,
 {
   variables,
   fetchPolicy:"cache-and-network"
   });


let loader;
 if(loading){
   return(
     <div>
       <RouteHeader tag={` 0 Items`}/>
       <Skeleton/>
       <Skeleton/>
       <Skeleton/>
       <Skeleton/>
       <Skeleton/>
       <Skeleton/>
       <Skeleton/>

     </div>
   )
 }

 const {buys, count, cursor} = data.getUserBuys;

const main = (
  <div className="prifilebuyGrid" style={{marginTop:"3.2rem"}}>
          { data && buys.map( (buy, i) =>
            (<div className="ProfileGridcard" key={buy.id}>
                { <Buygrid  buy={buy} count={count}/>}
                  { i === buys.length - 10 &&
                    <Waypoint onEnter={
                      () => fetchMore({
                        variables:{
                          after: cursor,
                          limit: HOME_PAGE_POSTS_LIMIT
                      },
                      updateQuery:(pv,{fetchMoreResult}) => {
                        if(!fetchMoreResult){
                          return pv
                        }
                        return {
                          getUserBuys:{
                           __typename: "userPostConnection",
                           buys: [ ...pv.getUserBuys.buys, ...fetchMoreResult.getUserBuys.buys ],
                           hasMore: fetchMoreResult.getUserBuys.hasMore,
                           cursor: fetchMoreResult.getUserBuys.cursor
                          }
                        }
                      }
                  })} />

                  }
            </div>)
            )}
  </div>
)

 return (
  <>
  <RouteHeader tag={<p> <ShoppingBasketOutlined/> wants to buy {count} </p> } />
  {loading ? loader : main}
  </>
 )
}

export default UserBuys;