import React from 'react';
import {useHistory} from "react-router-dom";
import {useStore} from "../../store"
import { SkeletonPost} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import DeleteButton from "../Delete/Delete";
import ReactGA from 'react-ga';
import  "./postGrid.css";
import { makeStyles } from '@material-ui/core/styles';
import Img from "react-cool-img";


const useStyles = makeStyles((theme) => ({
  edit:{
    color:"blueviolet",
    fontWeight:"bold"
  },
}))

/** This is a user post grid component */
const  Postgrid = ({post, likedItem})  => {
      const history = useHistory();
      const [{auth}] = useStore();
      const classes = useStyles();
      const { id, image,inStock, author, crossedPrice, price, title,  createdAt} = post;
      const weekday = weekDay(createdAt);
      const edit = () => {
          history.push(`/${auth.user.username}/edit/${id}`)
      }
      const toSingleItem = () =>{
          ReactGA.event({
            category:"Item",
            action:"view",
            transport:"beacon",
            label:"Repeat user",
          })
          if(likedItem){
            return
          }else{
             history.push(`/${auth.user.username}/${id}`)
          }
        }

 return (
  <>
    <div className="media_wrapper">
        <div className="media" onClick={toSingleItem}>
            { image ?
            <Img
              style={{
                backgroundColor:"#a2a2a282",
                width:"100%",
                height:"30%"
              }}
              width="100%"
              height="50%"
              src={image}
              alt={title}
              debounce={1000}
            />
              : <SkeletonPost title={title}  />
             }
          </div>
        <div className="prices">
        <p><b>{`Ksh ${price}`}</b></p>
        {crossedPrice && <p className="crossed_price" >{`Ksh ${crossedPrice}`}</p>}
        {(auth.user.username ===  author?.username) && <DeleteButton id={id}/>}
        {(auth.user.username ===  author?.username) &&
        <p onClick={edit} className={classes.edit} >Edit</p>}

        </div> <br/>
        <div style={{marginLeft:"2rem"}}>
            {inStock && <p> {inStock} <b>availbale in stock</b></p>}
        </div>
        <div className="grid_post_title">
            <p>{weekday}</p>
            <br/>
            { image && title &&
              <>
                <b>Name:</b>
                <p>{title}</p>
              </>
            }
        </div>
    </div>
  </>
 )
}

export default Postgrid;
