import React from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import { useStore } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import { ThumbUpAltSharp, ThumbUpAltOutlined } from '@material-ui/icons';
import { CREATE_LIKE, DELETE_LIKE } from '../../graphql/like';
import { GET_POST } from '../../graphql/post';


const useStyles = makeStyles((theme) => ({
  thumpsup:{
   marginRight:"1.5rem"
  }
}))

/** Like buton that performs like and unlike */
const LikeButton = ( { postId, likes} ) => {
      const  [{auth}]  = useStore();
      const history = useHistory();
      const classes = useStyles();

      const toSigup = () =>{
          history.push(`/signup`)
      }

      const hasLiked = likes.find(
        l => l.user.username === auth.user.username && l.post.id === postId
      );


//..............Detect which mutation to use...............................//
  const operation = hasLiked ? 'delete' : 'create';
  const options = {
    create: {
      mutation: CREATE_LIKE,
      variables: { postId, userId: auth.user.id },
    },
    delete: {
      mutation: DELETE_LIKE,
      variables: { id: hasLiked ? hasLiked.id : null },
    },
  };

const [createLike, {data, loading}] = useMutation(options[operation].mutation,{
      variables: { ...options[operation].variables},
      update(cache,{data}){
          const newLike = data?.createLike;
          const existingPost = cache.readQuery({
            query:GET_POST,
            variables:{id:postId}
          });
      cache.writeQuery({
        query:GET_POST,
        variables:{id:postId},
        data:{
          getPost:{
              likes:[...existingPost?.getPost.likes, newLike]
          }
        }
      })
      },
    //   refetchQueries:[{query:GET_POST, variables:{
    //       id:postId
    // }}]
})



//..........................button logic ........................................//
let likeButton;

  likeButton = auth.user ? (
      hasLiked || (loading && !data) ? (
           <ThumbUpAltSharp onClick={createLike} style={{color:"red"}} fontSize="large" className={classes.thumpsup} />
      ):(
           <ThumbUpAltOutlined onClick={createLike} style={{color:"gray"}} fontSize="large" className={classes.thumpsup}/>
      )
      ):(
         <ThumbUpAltSharp onClick={toSigup}  fontSize="large" className={classes.thumpsup}/>
  )

    return(
    <>
      {likeButton}
    </>
    )
}
export default LikeButton;