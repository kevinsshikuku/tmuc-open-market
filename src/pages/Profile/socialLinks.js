import React,{useState} from 'react';
import {useMutation} from "@apollo/client";
import {CircularProgress} from '@material-ui/core';
import jwtDecode  from 'jwt-decode';
import {Facebook, Instagram, Twitter} from '@material-ui/icons';

import {ADD_LINKS }from "../../graphql/user";
import { SET_AUTH_USER} from '../../store/auth';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";

import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../store';



/* -------------------------------------------------------------------------- */
const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
main:{
 margin: "5rem 0 2rem 0",
 display: "flex",
 justifyContent: "center",
 alignItems:"center",
 flexDirection: "column",
},
edit_profile_spinner:{
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignDtems: "center",
  height: "50vh",
},

 edit_input:{
 display: "flex",
 flexDirection: "row",
 margin: "0 0 2rem 0",
},
edit_icon:{
  margin: "1rem"
},
input:{
  borderRadius:"5px",
  border:"1px solid gray",
  outline:"none",
  width:"calc(100vw - 30vw)",
  padding:theme.spacing(1,2)
},
submit_btn:{
    marginLeft: "auto",
    marginRight: "2rem",
    marginTop: "2rem",
    padding:theme.spacing(1,2),
    border:"none",
    borderRadius:"5px",
    outline:"none",
    boxShadow:"1px 1px 4px gray",
    background:"none"
},
massage: {
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}
}));
/* -------------------------------------------------------------------------- */



/** Edit profile component */
const SocialLinks = () => {
   const classes = useStyles();
   UsedocumentTitle("Edit Profile");
   const [{auth}, dispatch] = useStore();
   const id = auth.user.id;
   const [errors, setErrors] = useState("");
   const [message, setMessage] = useState(null)
   const [values, setValues] = useState({ facebook:"", instagram:"", twitter:"", id});

/** change hundler... */
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };



const dispatchAction = (token) =>{
  dispatch({
    type:SET_AUTH_USER,
     payload:token
  })
}


/** Use mutation */
  let [addLinks, { loading }] =  useMutation(ADD_LINKS,{
      update(_, result){
        const token = result.data.editUserProfile.token;
        const decodedToken = jwtDecode(token);
        localStorage.removeItem("jwt");
        // localStorage.removeItem("apollo-cache-persist");
        localStorage.setItem('jwt',token);
        dispatchAction(decodedToken)
    },
     variables:values,
        onError(err){
          setErrors(err.graphQLErrors)
        },
      });


  const handleSubmit = async (e) => {
     e.preventDefault();
     addLinks();
     setErrors("");
     setMessage("Added succesfully refresh to see");
     setValues({})
  };


/**api errors */
const renderErrors = apiError => {
    let errorMessage;
    if (errors) {
      errorMessage = errors[0].message;
    }
    else if (apiError) {
      errorMessage = apiError.message;
    }
    if (errorMessage) {
      return (
         <i>{`${errorMessage} !!`}</i>
      );
    }
    return null;
  };




  let loader;
  if(loading){
    return(
      loader =
      <div className={classes.main}>
       <div className={classes.edit_profile_spinner}>
         <CircularProgress/>
         <h3>Adding your social links</h3>
       </div>
      </div>
    )
  }

 return (
  <div>
    <main className={classes.main}>
      {loading ? loader :

      <form onSubmit={handleSubmit}>
      <div className={classes.massage}>
        { errors.length > 0  && (
              <p style={{color:"red"}} >{renderErrors(errors)}</p>
            )}
       {<h6 style={{color:"blueviolet"}} >{message}</h6>}
      </div>
     <br/>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <Facebook/> </div>
                <div className={classes.edit_details}>
                  <h3>Facebook</h3>
                  <input
                     className={classes.input}
                     type="text"
                     placeholder="Add your facebook username"
                     name="facebook"
                     onChange={handleChange}
                     value={values.facebook}/>
                </div>
            </div>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <Instagram/> </div>
                <div className={classes.edit_details}>
                  <h3>Instagram</h3>
                  <input
                     className={classes.input}
                     type="text"
                     placeholder="Add your Instagram username"
                     name="instagram"
                     onChange={handleChange}
                     value={values.instagram}/>
                </div>
            </div>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <Twitter/> </div>
                <div className={classes.edit_details}>
                  <h3>Twitter</h3>
                  <input
                     type="text"
                     className={classes.input}
                     placeholder="Add your Twitter handle"
                     onChange={handleChange}
                     name="twitter"
                     value={values.twitter}/>
                </div>
            </div>
            <button
                type="submit"
                className={classes.submit_btn}
                disabled={!values.twitter && !values.facebook && !values.instagram}>
              Add</button>
      </form>
      }
      {values.facebook} , {values.instagram} , {values.twitter}
    </main>
  </div>
 )
}

export default SocialLinks;
