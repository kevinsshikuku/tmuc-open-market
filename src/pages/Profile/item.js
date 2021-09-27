import React from 'react';
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/client";
import RouteHeader from "../../components/Header/routeHeader";
import LazyLoad from 'react-lazyload';

import {GET_POST} from "../../graphql/post";
import Comments from "../../components/Comment/comments";
import {CreateComment} from "../../components/CreateCommnet/createComment";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import { SkeletonPost, SkeletonBar2} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
auth_user__item_info:{
  display: "flex",
  flexDirection: "row",
  marginBottom:"2rem",
  justifyContent: "space-around",
},
auth_user_item_description:{
  margin:".5rem 2rem"
},
auth_user_item_price:{
  margin:".5rem 2rem"
},
auth_user_item_features:{
  margin:".5rem 2rem"
},
i:{
  textDecoration: "line-through",
  marginleft:" 20px"
},
ul:{
  marginLeft: "3rem",
},
createComment:{
  width: "100vw",
},
auth_user_item_media:{
  marginTop: "3.5rem",
}
}))



/** Auth user single item */
function AuthUserSingleItem() {
 const history = useHistory();
 const classes = useStyles();
 UsedocumentTitle("Item")
 const ID = history.location.pathname.split("/").pop();


const {data, loading} = useQuery(GET_POST, {
          variables:{id:ID},
          fetchPolicy:"cache-first",
          pollInterval:500000,
          notifyOnNetworkStatusChange:true,
  });

  let loader;
  if(loading){
    return(
        loader =
          <div>
            <RouteHeader tag={"Product details"}/>
            <br/> <br/>
            <SkeletonPost/>
            <SkeletonBar2/>
          </div>
    )
  }

const {id,  description, likes,comments,inStock, image,price, title, crossedPrice, features, createdAt} = data?.getPost;
const weekday = weekDay(createdAt)
const itemFeatures = features && features.split("#");
const slicedTitle = title.slice(0,50)


const main = (
  <div>
    <div className={classes.auth_user_item_media}>
          {image ? <LazyLoad height="50%" >
            <image
              alt="alt_tag"
              src={image}
              width="100%"
            />
          </LazyLoad> : <SkeletonPost title={slicedTitle}/>}

      <div className={classes.auth_user__item_info}>
        <b>{weekday}</b>
        <p>{`Likes: ${likes.length}`}</p>
        <p>{`Comments: ${comments.length}`}</p>
      </div>
    </div>

    <div>
      <div className={classes.auth_user_item_description}>
        {inStock && <p>{inStock} <b>in stock</b> </p>}
      </div>
      <div className={classes.auth_user_item_description}>
        <h2>Description:</h2>
        <p>{description}</p>
      </div>

      { <div className={classes.auth_user_item_price}>
        {(price || crossedPrice) && <h3>Price:</h3>}
        {price  && <h4>{`Ksh ${price}`}</h4>}
        {crossedPrice && <i className={classes.i}>{`Ksh ${crossedPrice}`}</i>}
      </div>}


      <div>
        {features &&
        <div className={classes.auth_user_item_features}>
          <p style={{fontWeight:"bolder"}}>Item features:</p>
            <ul className={classes.ul}>
              {itemFeatures.map((item, i) => (
                 <li key={i} >{item}</li>
              ))}
            </ul>

        </div>}
      </div>


      <div className={classes.createComment}>
        <CreateComment postId={id} comments={comments}/>
      </div>
      <div className={classes.itemComments}>
        <div>
          {comments.length && comments.map( (comment) => (
              <div className="comment" key={comment.id}>
                 <Comments comment={comment}/>
              </div>
          ))}
        </div>
      </div>

    </div>
  </div>

)

 return (
<>
<RouteHeader tag={"Product details"}/>
{loading ? loader : main}
</>
 )
}

export default AuthUserSingleItem;
