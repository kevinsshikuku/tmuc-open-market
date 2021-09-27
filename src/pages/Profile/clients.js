import React,{useState} from 'react';
import RouteHeader from "../../components/Header/routeHeader";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {PeopleAltOutlined, ThumbUpAltOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined} from "@material-ui/icons";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft:0,
    backgroundColor:"#2ceaff"
  },
  smallest: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft:0,
    backgroundColor:"#2ceaff"
  },
  }));


/**People who liked auth user items*/
const Clients = ({posts}) => {
UsedocumentTitle("Items liked");
const classes = useStyles();


 return (
  <>
  <RouteHeader tag={<PeopleAltOutlined/>}/>
  <div className="auth_prifile_grid">
          { posts && posts.map( (post) =>
            (<div className="client_grid_card" key={post.id}>
                <div className="Aliked_card">
                   <Avatar src={post.image} className={classes.small}/>
                  <div className="thumps_up">
                      <p> <ThumbUpAltOutlined/> {post.likes.length}</p>
                      <h1>{post.title}</h1>
                  </div>
                </div>
                {<LikeCard likes={post.likes}/>}
            </div>)
            )}
  </div>
  </>
 )
}

export default Clients;



/* -------------------------------------------------------------------------- */
function LikeCard({likes}){
const [open, setOpen] = useState(false);
const classes = useStyles();
 return(
   <>
     <div className="like_details" >
       <p className="like_details_btn" onClick={() => setOpen(!open)} >
       {open ?
         <h3><KeyboardArrowUpOutlined/> Close</h3>
           : <h3 style={{color:"blue"}}  ><KeyboardArrowDownOutlined/> Open </h3> }
       </p>

       { open && likes.map( (like) => (
         <div key={like.id} className="client_thumnail">
            <Avatar src={like?.user?.image} className={classes.smallest}/>
            <div className="like_details">
               { like.user.username ? <p>Name: {like.user.username} </p> : <p>No details</p>}
               { like.user.phonenumber && <p>phone: {like.user.phonenumber}</p>}
            </div>
         </div>
         ))}

     </div>
   </>
 )

}

