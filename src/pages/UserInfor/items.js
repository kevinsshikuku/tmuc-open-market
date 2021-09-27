import React from 'react';
import {useQuery}  from '@apollo/client';
import RouteHeader from "../../components/Header/routeHeader";
import { GET_USER_POSTS } from '../../graphql/user';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Postgrid from "../../components/PostGrid/postGrid";
import {useRouteMatch} from 'react-router-dom';
import {Skeleton } from "../../components/Skeleton/skeleton";
import {ShoppingBasketOutlined} from "@material-ui/icons";

/**User items */
function UserItems() {

const location = useRouteMatch();
const username = location.params.username.split(':').pop();
const variables = {
  username,
  skip: 0,
  limit: HOME_PAGE_POSTS_LIMIT,
};


 const { data,loading} = useQuery(GET_USER_POSTS,
 {
   fetchPolicy:"cache-and-network",
   variables,
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

 const {posts, count} = data?.getUserPosts;



const main = (
  <div className="prifileGrid" style={{marginTop:"3.2rem"}}>
          { data && posts.map( (post, i) =>
            (<div className="ProfileGridcard" key={`${post.id}${i}`}>
                { <Postgrid  post={post} count={count}/>}
            </div>)
            )}
  </div>
)

 return (
  <>
  <RouteHeader tag={<p> <ShoppingBasketOutlined/> {count} available</p> } />
  {loading ? loader : main}
  </>
 )
}

export default UserItems;
