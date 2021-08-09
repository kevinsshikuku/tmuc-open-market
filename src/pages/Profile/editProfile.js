import React,{useState} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useMutation, useQuery} from "@apollo/client";
import {TextareaAutosize, CircularProgress} from '@material-ui/core';
import jwtDecode  from 'jwt-decode';
import {LocationOn, BusinessCenter, EmailOutlined, AccountCircleRounded} from '@material-ui/icons';

import { Skeleton} from "../../components/Skeleton/skeleton";
import RouteHeader from "../../components/Header/routeHeader";
import {EDIT_USER_PROFILE, GET_AUTH_USER, GET_USER  }from "../../graphql/user";
import { SET_AUTH_USER} from '../../store/auth';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";

import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../store';
import Routes from "../../store/routes";



/* -------------------------------------------------------------------------- */
const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
main:{
 margin: "4rem 0 2rem 0",
 display: "flex",
 justifyContent: "center",
 alignItems:"center",
 flexDirection: "column",
},
edit_profile_avator:{
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 flexDirection: "column",
 margin: "2rem",
 cursor: "pointer",
},
edit_profile_spinner:{
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignDtems: "center",
  height: "50vh",
},
edit_profile_textarea:{
  border:"none",
  resize: "none",
  background: "#e8e8e8aa",
  outline:"none",
  width:"calc(100vw - 30vw)",
  padding:theme.spacing(1,2),
  borderRadius: "5px",
  marginRight: "1rem",
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
}
}));
/* -------------------------------------------------------------------------- */



/** Edit profile component */
function EditProfile() {
   const path = useRouteMatch();
   const routeName = path.params.username
   const classes = useStyles();
   const {goBack} = Routes();
   UsedocumentTitle("Edit Profile")
   const [{auth}, dispatch] = useStore();
  //  const [ , ] = useStore();
   const [errors, setErrors] = useState("");
   const userId = auth.user.id;
   console.log(auth.user.id)
  //  const value = useContext(AuthUserContext);
   const [values, setValues] = useState({ fullname:"", location:"", email:"", businessdescription:"", id:userId});

 const { loading:authuserLoading} = useQuery(GET_USER,{
   variables:{
     username:routeName
   }
 });

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
  let [submitUser,{ loading }] =  useMutation(EDIT_USER_PROFILE,{
      update(_, result){
        const token = result.data.editUserProfile.token;
        const decodedToken = jwtDecode(token);
        localStorage.removeItem("jwt");
        localStorage.removeItem("apollo-cache-persist");
        localStorage.setItem('jwt',token);
        dispatchAction(decodedToken)
    },
     variables:values,
     refetchQueries:[
       {query:GET_AUTH_USER}
     ],
        onError(err){
          setErrors(err.graphQLErrors)
        },
      });


  const handleSubmit = async (e) => {
     e.preventDefault();
     submitUser();
     setErrors("");
     goBack();
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


  /** Loading section */
  let loader
  if(authuserLoading){
    loader = (
      <>
      <RouteHeader tag={"Edit Profile"}/>
      <Skeleton/>
    </>
    )
    return loader
  }

   const   username  = auth.user.username;


  let load;
  if(loading){
    return(
      loader =
      <div className={classes.main}>
      <RouteHeader tag={"Edit Profile"}/>
      <div className={classes.edit_profile_avator}>
        <h2 style={{textTransform:"capitalize"}} >{username}</h2>
      </div>
       <div className={classes.edit_profile_spinner}>
         <CircularProgress/>
         <h3>Editing...</h3>
       </div>
      </div>
    )
  }
 return (
  <div>
    <RouteHeader tag={"Edit Profile"}/>
    <main className={classes.main}>
      <div className={classes.edit_profile_avator}>
        <h2  style={{textTransform:"capitalize"}}  >{username}</h2>
      </div>
      {loading ? load :

      <form onSubmit={handleSubmit}>

        { errors.length > 0  && (
              <p style={{color:"red"}} >{renderErrors(errors)}</p>
            )}
            <br/>
            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <AccountCircleRounded/> </div>
                <div className={classes.edit_details}>
                  <h3>Fullname</h3>
                  <input
                     className={classes.input}
                     type="text"
                     placeholder="Add your fullname"
                     name="fullname"
                     onChange={handleChange}
                     value={values.fullname}/>
                </div>
            </div>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <EmailOutlined/> </div>
                <div className={classes.edit_details}>
                  <h3>Email adress</h3>
                  <input
                     className={classes.input}
                     type="email"
                     placeholder="Add youremail adress"
                     name="email"
                     onChange={handleChange}
                     value={values.email}/>
                </div>
            </div>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <LocationOn/> </div>
                <div className={classes.edit_details}>
                  <h3>Location</h3>
                  <input
                     type="text"
                     className={classes.input}
                     placeholder="Add your location"
                     onChange={handleChange}
                     name="location"
                     value={values.location}/>
                </div>

            </div>
            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <BusinessCenter/> </div>
                <div className={classes.edit_details}>
                  <h3>Business description</h3>
                  <TextareaAutosize
                        className={classes.edit_profile_textarea}
                        type="text"
                        name="businessdescription"
                        onChange={handleChange}
                        placeholder="Add your Business description"
                        value={values.businessdescription}
                        rowsMin={2}/>
                </div>
            </div>
        <button type="submit" className={classes.submit_btn} >Submit</button>
      </form>
      }
    </main>
  </div>
 )
}

export default EditProfile;
