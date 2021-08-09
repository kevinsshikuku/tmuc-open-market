import React,{createContext} from "react";
import {useQuery} from "@apollo/client";
import {GET_AUTH_USER} from "../graphql/user";

/** Auth user context... */
export const AuthUserContext = createContext();



/** Gives a global auth user */
export const AuthUserProvider = (props) => {

 const {data, loading} = useQuery(GET_AUTH_USER,{
   fetchPolicy:"network-only"
 });


 return(
   <AuthUserContext.Provider value={ {loading ,data}}>
        {props.children}
   </AuthUserContext.Provider>
 );
}