import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton} from "../../components/Skeleton/skeleton";
import { useStore } from '../../store';

import Header from "../../components/Header";
import PostCard from "../../components/Postcard/postCard";
import { GET_POSTS} from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {CreateItem} from "../../components/CreateItem/CreateItem";
import  "./home.css";


/**Home component */
function Home() {
        UsedocumentTitle("Home");
         const [{auth}] = useStore();
         const variables = {
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
        };
        const { data,loading} = useQuery(GET_POSTS,{
          variables
          });


        const skeleton = (
          <>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </>
        )

        let loader;
        if(!data){
          return loader = (
            <div>
              <Header/>
              {skeleton}
            </div>
          )
        }


        if(loading){
          return loader = (
            <div>
              <Header/>
              {skeleton}
            </div>
          )
        }

const { posts } = data.getPosts;
  const main =  posts && (
  <div className="homeContainer">
          { posts.map( (post, i) => (
            <div className="card"  key={post.id} >
                  { <PostCard  post={post} index={i}/>}
            </div>
            ))}
  </div>
  )



 return (
<>
  <Header/>
  {loading && loader}
  {data && !loading  && main}
  {(!loading && !data) && loader }

  {auth.user &&
  <div className="createItemForm" >
    <CreateItem/>
  </div>}

</>
 )
}

export default Home;
