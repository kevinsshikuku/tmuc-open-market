import React,{useState} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useQuery} from "@apollo/client";
import { GET_USER} from "../../graphql/user";

import Avatar from '@material-ui/core/Avatar';
import { InfoOutlined, ShoppingBasketOutlined,  AddShoppingCartSharp, EmailOutlined, Phone, SettingsSharp, PeopleAltOutlined,Twitter, Facebook, Instagram, PersonAdd }   from "@material-ui/icons";

import Footer from "../../components/Footer/index";
import ProfileHeader from "../../components/Header/profileHeader";
import Info from "../windoshoppe/info";
import Items from "./items";
import LikedItems from "./likedItems";
import UserBuys from "./buys";
import Clients from "./clients";
import SocialLinks from "./socialLinks";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {  Skeleton } from "../../components/Skeleton/skeleton";
import ImageUpload from "./imageUpload";
import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
import Netlify from "../../Assets/netlify.jpg"
import Img from "react-cool-img";


const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft:0,
    backgroundColor:"#2ceaff"
  },
  avator:{
     display:"flex",
     flexDirection:"row",
     marginBottom:"4rem",
  },
  avator_p: {
     marginLeft:"1rem",
     marginTop:"auto",
  },
  edit_profile_btn: {
      color:"blue",
      cursor:"pinter",
      textAlign:"baseline",
      margin:theme.spacing(2,0),
      fontSize:"2rem"
  },
  paragraph:{
   display:"flex",

   alignItems:"center"
  },
  p:{
    padding: theme.spacing(.5, 1),
    backgroundColor:"#0000ff67",
    border:"1px solid blue",
    borderRadius:"5px",
    boxShadow: "1px 1px 4px #3e3e8c",
    color:"black",
    cursor: "pointer",
    fontWeight: "bolder",
    fontFamily: "sansSerif",
    width:"30%",
    margin:"auto",
    marginTop:"2rem"
  },
  business_contact: {
    marginLeft:"2rem",
    marginTop:".4rem"
  }
}));


/* ------------------------------------------------------------------------------ */
/** ..AuthProfile component........................... */
function AuthProfileComponent() {
   const path = useRouteMatch();
   const classes = useStyles();
   const history = useHistory();
   const name = path.params.username.split(':').pop();
   const [tab, setTab] = useState(0);
   UsedocumentTitle("Profile")

 const { data,loading} = useQuery(GET_USER,{
   fetchPolicy:"network",
     variables:{
       username:name
   }
 });

/** Loading section */
      let loader;
      if(loading){
         return (
            <>
            <ProfileHeader tag={"settings"}/>
            <Skeleton/>
           </>
         )
      }
 const {  username, email,twitter, facebook, instagram, phonenumber, fullname, posts, businessdescription, image,coverImage, likes, buys} = data.getUser;

 const postsLikes = posts.map( p => p.likes.length).reduce((cur, prev) => ( cur + prev ),0);


 const toEditProfile = () =>{
   history.push(`/profile/${username}/editprofile`)
   }

const likedPosts = likes.map( like => like.post)


/** Main section */
const main =
     <>
            <div className="topBar">

                  <div onClick={() => setTab(0)}>
                     <SettingsSharp/>
                     <h4 style={{color: tab === 0 ? "blue" : ""}} >Settings</h4>
                  </div>

                  <div onClick={() => setTab(1)}>
                     <ShoppingBasketOutlined/>
                     <h4 style={{color: tab === 1 ? "blue" : ""}} >Sales</h4>
                  </div>
                  { buys && <div onClick={() => setTab(2)}>
                     <AddShoppingCartSharp/>
                     <h4 style={{color: tab === 2 ? "blue" : ""}} >Buying</h4>
                  </div>}
            </div>

       { tab === 0 &&
        <>
         <div className="coverPhoto" >

            {<>
               {coverImage ?
                  <Img
                     style={{
                     backgroundColor:"#a2a2a282",
                     height:"140px",
                     width:"100%"
                     }}
                     height="140px"
                     width="100%"
                     src={coverImage}
                     alt={username}
                     debounce={1000}
                  />
               : <img src={Netlify} width="100%" alt={username} />}
               <ImageUpload isCover={true} />
            </>
            }

         </div>
        <div className="profile_Infor">
            <div className="bioData">
            <div className={classes.avator}>
               <div> <Avatar className={classes.small} src={image} />  <ImageUpload isCover={false}/> </div>
               <div className={classes.avator_p}>
                  <h4>{username}</h4>
                  {fullname && fullname}
                  <li>
                     {twitter && <ul><a href={`https://twitter.com/${twitter}`} ><Twitter style={{color:"blueviolet"}}/></a></ul>}
                     {facebook && <ul><a href={`https://facebook.com/${facebook}`} ><Facebook color="primary"/></a></ul>}
                     {instagram && <ul><a href={`https://instagram.com/${instagram}`} ><Instagram color="secondary"/></a></ul>}
                  </li>
                  <div style={{clear:"both"}} >{businessdescription ?
                  <h6>{businessdescription}</h6> : "Doing business on windoshoppe" }</div>
               </div>
            </div>



               { email && phonenumber &&
               <>
                  <h3>My business contacts</h3>
                  <div className={classes.business_contact}>
                    <p className={classes.paragraph}> <EmailOutlined/> __ {email} </p>
                    <p className={classes.paragraph}> <Phone/> __ {phonenumber}</p> <br/>
                  </div>
               </>
               }

               {
               <>
                  <h2> Business information</h2>
                  <div className={classes.business_contact}>
                    <p> Selling {posts?.length} </p>
                    <p> Buying {buys?.length}</p>
                    <p>Total likes received from items I sell {postsLikes}</p>
                    <p>Total items I Liked {likes.length}</p> <br/> <br/>
                  </div>
               </>
               }

         <h2 className={classes.paragraph} onClick={() => setTab(4)}> <ShoppingBasketOutlined/> __ Items I Liked</h2><br/>
         <h2 className={classes.paragraph} onClick={() => setTab(5)}> <PeopleAltOutlined/> __ People who liked my items</h2><br/>
         <h2 className={classes.paragraph} onClick={() => setTab(3)}> <InfoOutlined/> __ infor</h2> <br/>
         <h2 className={classes.paragraph} onClick={() => setTab(6)} style={{color:"blueviolet"}} > <PersonAdd/> __ Add social Links</h2>
            </div>


            <div className={classes.edit_profile_btn}>
               <p onClick={toEditProfile} className={classes.p}>Edit Profile</p>
            </div>


       </div>
       </>
       }
       {tab === 1 && <Items posts={posts}/>}
       {tab === 2 && <UserBuys buys={buys}/>}
       {tab === 3 && <Info/> }
       {tab === 4 && <LikedItems posts={likedPosts}/> }
       {tab === 5 && <Clients posts={posts}/> }
       {tab === 6 && <SocialLinks/> }
     </>

 return (
  <>
     <ProfileHeader tag={"Settings"}/>
     <main>
       {loading ? loader : main}
     </main>
     <Footer/>
  </>
 )
}

export default AuthProfileComponent;
