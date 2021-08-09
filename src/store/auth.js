import jwtDecode  from 'jwt-decode';


/** Actions types */
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const CLEAR_AUTH_USER = 'CLEAR_AUTH_USER';

/** Initial State */
export const authInitialState = {
  user: null,
};



if(localStorage.getItem("jwt")){
   const decodedToken = jwtDecode(localStorage.getItem("jwt"));
   if(decodedToken.exp * 10000 < Date.now()){
     localStorage.removeItem("jwt")
   }else{
   authInitialState.user = decodedToken
   }
}

/** User Reducer */
export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      // const decodedToken = jwtDecode(action.payload.token);
      // authInitialState.user = decodedToken
      console.log(action.payload)
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_AUTH_USER: {
      localStorage.removeItem("jwt");
      return{
        ...state,
        user: null,
      };
    }

    default:
      throw new Error(`Unknown action type ${action.type}`)
      // return state;
  }
};
