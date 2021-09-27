import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress, Avatar} from  "@material-ui/core"
import { SIGN_IN } from '../../graphql/user';
import { useStore } from '../../store';
import { SET_AUTH_USER } from '../../store/auth';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import Logo from "../../Assets/icon.png";
import jwtDecode  from 'jwt-decode';
import ReactGA from 'react-ga';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  signInContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(8, 0, 3, 0),
    width: "100vw",
  },
  signInLogo:{
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: "xx-large",
    cursor: "pointer",
    justifyContent: "center",
  },
  signInForm:{
    width: "80vw"
  },
  signInInput:{
      display: "block",
      border:"none",
      borderBottom:" 2px solid rgba(38, 38, 230, 0.857)",
      marginTop: "2rem",
      padding: "6px 0 0 0",
      outline: "none",
      fontSize: "large",
      height: "2em",
      width: "100%",
      color: "black",
      backgroundColor: "none",
  },
  aboutUs:{
    color:"blue",
    padding: theme.spacing(0 ,.5),
    borderRadius:"5px",
    cursor:"pointer",
    fontSize:"1rem"
  },
  signInButton:{
      border: "none",
      backgroundColor: "rgb(155, 69, 69)",
      padding: "10px",
      width: "7rem",
      outline: "none",
      borderRadius: "18px",
      boxShadow: "none",
      cursor: "pointer",
      margin:" 2rem 0  2rem 30% ",
  }
}))







/** Logs in existing user */
function SignIn() {
  const [values, setValues] = useState({ phoneOrUsername: '', password: '' });
  const [errors, setErrors] = useState('');
  const [, dispatch] = useStore();
  const classes = useStyles();
  UsedocumentTitle("SignIn");
  const {toAppInfo, AboutUs, signup} = Routes();


/**submit hundler */
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



/**useMutation hook */
 let [signInUser,{loading}] = useMutation(SIGN_IN, {
  update(_, {data}){
    const token = data.signin.token
    localStorage.setItem('jwt',token);
    const decodedToken = jwtDecode(token);
    dispatchAction(decodedToken)
    window.location.href = '/'
 },
 variables : values,
  onError(err){
     setErrors(err.graphQLErrors)
  },
   });


  const handleSubmit = (e) => {
      e.preventDefault();
      ReactGA.event({
        category:"Form",
        action:"signin",
        transport:"beacon",
        label:"New user",
      })
      signInUser();
      setErrors('');
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
        <i>{errorMessage}</i>
      );
    }
    return null;
  };


let loader;
if(loading){
  return(
    <div>
      <Header/>
      <div className='loader'>
        <CircularProgress/>
        <p>Preparing to signin ...</p>
        <Footer/>
      </div>
    </div>
  )
}

const main = (

<div className={classes.signInContainer}>
      <div>
        <div  onClick={toAppInfo}  className={classes.signInLogo}>
          <span> <Avatar alt="logo" src={Logo} className={classes.large}/> </span>
          <p>SHOPIIN</p>
        </div>
        <form onSubmit={handleSubmit}  className={classes.signInForm} >

           {errors.length > 0  && (
              <p className="error">{renderErrors(errors)}</p>
            )}

            {
            <>
            <input
            placeholder="phone/username"
            name= "phoneOrUsername"
            type="text"
            value ={values.phoneOrUsername}
            onChange={handleChange}
            className={classes.signInInput}
            />

            <input
            placeholder="password"
            name= "password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={classes.signInInput}
            />
            <button type="submit" className={classes.signInButton}>  Login </button>
            </>
            }


        </form>
        <p style={{textAlign:"center"}}>
                Dont have an accout yet? <i className="Link" onClick={signup} > Create</i>
        </p> <br/>

       <p onClick={AboutUs} className={classes.aboutUs} >About us</p>
      </div>

</div>

)



 return (
  <>
    <Header/>
    {loading ? loader : main}
    <Footer/>
  </>
 );
}
export default SignIn;

