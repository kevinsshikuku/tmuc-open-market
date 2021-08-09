import React,{useState} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import {TextareaAutosize} from '@material-ui/core';
import {Description,DescriptionOutlined, InfoTwoTone,MoneyOff, MoneyOffOutlined,StorageOutlined } from '@material-ui/icons';

import RouteHeader from "../../components/Header/routeHeader";
import {UPDATE_POST, GET_POST  }from "../../graphql/post";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";

import { makeStyles } from '@material-ui/core/styles';
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



/** Edits specific user post */
function EditPost() {
   const path = useRouteMatch();
   const postId = path.params.id;
   const classes = useStyles();
   const {goBack} = Routes();
   UsedocumentTitle("Edit post");

   const [errors, setErrors] = useState("");
   const [values, setValues] = useState({ title:"", description:"", inStock:"", price:"", crossedPrice:"", postId, features:""});


/** change hundler... */
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };



/** Use mutation */
  let [updatePost] =  useMutation(UPDATE_POST,{
     variables:values,
     refetchQueries:[
       {query:GET_POST, variables:{id: postId}}
     ],
        onError(err){
          console.log(err.graphQLErrors);
          setErrors(err.graphQLErrors);
        },
      });


  const handleSubmit = async (e) => {
     e.preventDefault();
     updatePost();
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


 return (
  <div>
    <RouteHeader tag={"Edit Item"}/>
    <main className={classes.main}>
      {
      <form onSubmit={handleSubmit}>
       <h4>Fill all fields then submit !</h4>

        { errors.length > 0  && (
              <p style={{color:"red"}} >{renderErrors(errors)}</p>
            )}
            <br/>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <InfoTwoTone/> </div>
                <div className={classes.edit_details}>
                  <h3>Name</h3>
                  <input
                     className={classes.input}
                     type="text"
                     placeholder="Product name"
                     name="title"
                     onChange={handleChange}
                     value={values.title}/>
                </div>
            </div>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <StorageOutlined/> </div>
                <div className={classes.edit_details}>
                  <h3>Availale in stock</h3>
                  <input
                     className={classes.input}
                     type="text"
                     placeholder="Total number"
                     name="inStock"
                     onChange={handleChange}
                     value={values.inStock}/>
                </div>
            </div>

            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <MoneyOff/> </div>
                <div className={classes.edit_details}>
                  <h3>New price</h3>
                  <input
                     type="text"
                     className={classes.input}
                     placeholder="Price"
                     onChange={handleChange}
                     name="price"
                     value={values.price}/>
                </div>
            </div>
            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <MoneyOffOutlined/> </div>
                <div className={classes.edit_details}>
                  <h3>Old price</h3>
                  <input
                     type="text"
                     className={classes.input}
                     placeholder="Initial price"
                     onChange={handleChange}
                     name="crossedPrice"
                     value={values.crossedPrice}/>
                </div>
            </div>
            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <Description/> </div>
                <div className={classes.edit_details}>
                  <h3>Product description</h3>
                  <TextareaAutosize
                        className={classes.edit_profile_textarea}
                        type="text"
                        name="description"
                        onChange={handleChange}
                        placeholder="Describe your product"
                        value={values.description}
                        rowsMin={2}/>
                </div>
            </div>
            <div className={classes.edit_input}>
                <div className={classes.edit_icon}> <DescriptionOutlined/> </div>
                <div className={classes.edit_details}>
                  <h3>New product features</h3>
                  <TextareaAutosize
                        className={classes.edit_profile_textarea}
                        type="text"
                        name="features"
                        onChange={handleChange}
                        placeholder="Product features separate with #"
                        value={values.features}
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

export default EditPost;
