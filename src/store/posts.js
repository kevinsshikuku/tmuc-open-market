import React, {createContext, useReducer, useContext} from 'react'

//Two context one holding state other holding dispatch
//Auth state context
const PostStateContext = createContext();

//Dispatch state context
const PostDispatchContext = createContext();




//Message reducer
const   PostReducer = (state, action) =>{
   const { posts } = state
   switch(action.type){
       case "ADD_POST":
        let newPosts = [
          action.payload, ...posts
        ]

        return {
         ...state,
         posts:  newPosts
        }


      default:
       throw new Error(`unknown action type ${action.type}`)
   }
}


/** Provider that will export and use in the App.js */
export const PostProvider = ({children}) => {
  const [state, dispatch] = useReducer(PostReducer, { posts: []   })
   return(
    <PostDispatchContext.Provider value={dispatch}>
        <PostStateContext.Provider value ={state}>
                   {children}
        </PostStateContext.Provider>
    </PostDispatchContext.Provider>
   )
}


//Export what is held inside usecontext
export const usePostState = () => useContext(PostStateContext);
export const usePostDispatch = () => useContext(PostDispatchContext);

