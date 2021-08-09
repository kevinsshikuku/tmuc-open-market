import React from 'react';



import { useStore} from '../../store';
import { CLEAR_AUTH_USER } from '../../store/auth';


/**
 * Component that signsOut the user
 */
const SignOut = () => {
  const [, dispatch] = useStore();
  const handleSignOut = () => {
    dispatch({ type: CLEAR_AUTH_USER });
  };


  return (
    <>

<button onClick={handleSignOut}>
   <p style={{color:"#3f51b5"}}>Log out</p>
</button>
   </>
  );
};


export default SignOut;


