import React from 'react';
import { ArrowBack} from '@material-ui/icons';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import './about.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 description: {
     color:"red",
    fontSize: "xx-large",
    fontweight: "bolder",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
 },
app_Info_component: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#2ceaff",
},

app_info_bar: {
  position: "fixed",
  padding:"1rem ",
  top:0,
  width: "100vw",
  backgroundColor:"none",
},

app_info_bar_p: {
  display:"inline-block",
  left: 0,
  color:"#000000",
  cursor:"pointer"
}

}))


/** more infor about windoshoppe */
function AppInfo() {
    const {goBack} = Routes();
    const classes = useStyles();
    UsedocumentTitle("AppInfo")


    return (
    <>
    <div >
        <div className={classes.app_info_bar} >
            <p className={classes.app_info_bar_p}  onClick={goBack}> <ArrowBack/> </p>
        </div>
        <div className={classes.app_Info_component}>
            <h1>TMUC open market</h1>
            <p className={classes.description}>Buy and Sell Anything!</p>
            <p  className={classes.description}> at best prices</p>
            <br/> <br/>
            <i> &copy; 2021 TMUC open market </i>
        </div>
    </div>
    </>
 )
}

export default AppInfo;
