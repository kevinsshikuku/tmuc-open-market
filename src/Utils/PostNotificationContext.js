import React,{useEffect, useState,createContext} from "react";
import {useSubscription}  from '@apollo/client';
import {GET_NEW_POST_SUBSCRIPTION} from "../graphql/post";
import {Snackbar, SnackbarContent} from '@material-ui/core';
import "./utils.css";

/** Post notification context... */
export const PostNotificationContext = createContext();

/** Gives a global new post notification */
export const PostNoficiactionProvider = ({children}) => {
  const {data, loading} = useSubscription(GET_NEW_POST_SUBSCRIPTION, {
    
  });
  const [open, setOpen] = useState(false);

   useEffect(() => {
       if(!loading && data){
         setOpen(true)
         return
       }
   },[data, loading])

   const hundleClose = (e) => {
       setOpen(false)
   }


 return(
   <PostNotificationContext.Provider value={ {loading ,data}}>
       <Snackbar
         open={open}
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'left'
         }}
         onClose={hundleClose}
         autoHideDuration={5000}
         className="snack_bar"
        >
          <SnackbarContent
           style={{backgroundColor:"blueviolet"}}
           message = {"New item ! "}
          />
        </Snackbar>
        {children}
   </PostNotificationContext.Provider>
 );
}