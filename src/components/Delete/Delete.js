import React from 'react';
import {useMutation} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

import {GET_POSTS, DELETE_POST} from "../../graphql/post";
import {GET_BUYS} from "../../graphql/buy";
import {GET_AUTH_USER} from "../../graphql/user";
import {DELETE_COMMENT} from "../../graphql/comment";
import {DELETE_BUY} from "../../graphql/buy";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Routes from "../../store/routes";



const useStyles = makeStyles((theme) => ({
  btn:{
    fontWeight:"bold",
    color:"red"
  },
}))




/** Delete button component */
function DeleteButton({id,commentId, buyId}){
 const classes = useStyles();
 const {goBack} = Routes()



//..................... dynamic muation ......................
const mutation = commentId ? DELETE_COMMENT : buyId  ? DELETE_BUY :  DELETE_POST;
const _id = id || commentId || buyId;
 const [deletePostOrCommentMutation, {loading, data}] = useMutation(mutation,{
    variables:{
        id: _id
        },
    refetchQueries:[
            {query:GET_POSTS,
             variables:{ skip: 0, limit: HOME_PAGE_POSTS_LIMIT} },
            {query:GET_BUYS,
             variables:{ skip:0, limit:HOME_PAGE_POSTS_LIMIT}
            },
            {query:GET_AUTH_USER},

            ],
     onError(err){
         console.log(err)
         }
 });


const hundleDelete = () => {
    deletePostOrCommentMutation();
    if(buyId){
       goBack()
    }
}

 return(
  <>
        <p className={classes.btn} onClick={hundleDelete}>
            {loading ? "Deleting..." : data ? "Deleted" : "Delete"}
        </p>
  </>
   )
}
export default DeleteButton;