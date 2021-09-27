import React from 'react';
import   "./header.css";
import {InfoOutlined,Share, People, SearchTwoTone, Settings, ShoppingCart,ShoppingBasket, Chat, PersonOutlined} from '@material-ui/icons';
import Routes from "../../store/routes";
import {useHistory} from "react-router-dom";


/** Side bar component */
export function SideBar() {
 const {sell, search, AboutUs, toAppInfo,settings,toProfile, buy, chat, toPeople} = Routes()
 return (
  <div>
    <input className="menu_btn" type="checkbox" id="loggedIn_menu_btn"/>
    <label htmlFor="loggedIn_menu_btn" className="menu_icon">
         <span className="nav_icon"> </span>
    </label>

        <ul className="menu">
              <li onClick={sell}> <ShoppingBasket/> <p>Sell</p></li>
              <li onClick={buy}> <ShoppingCart/> <p>Buy</p> </li>
              <li onClick={chat}> <Chat/> <p>Chat</p> </li>
              <li onClick={toPeople}> <People/> <p>People</p> </li>
              <li onClick={search} > <SearchTwoTone/> <p>Search</p></li>

              <li onClick={toProfile}> <PersonOutlined/> <p>My profile</p> </li>
              <li onClick={settings}> <Settings/> <p>Edit profile</p> </li> <br/>

              <li onClick={AboutUs}> <InfoOutlined/> <p>About us</p> </li>
              <li onClick={toAppInfo}><Share/> <p>App info </p></li>
              <div className="emptyDiv"> &copy; shoppin 2021 </div>
        </ul>
  </div>
 )
}




/** Login /Logout */
export const LogeddeOutSideBar = () => {
 const history = useHistory()
 const path = history.location.pathname;
  const {signup, Login} = Routes();
 return(
<>
    <input className="menu_btn" type="checkbox" id="loggedIn_menu_btn"/>
    <label htmlFor="loggedIn_menu_btn" className="menu_icon">
         <span className="nav_icon"> </span>
    </label>
        <ul className="menu">
              {path === "/signin" ?
              <i style={{color:"gray"}}><li>Login</li></i> :
              <i onClick={Login}><li>Login</li></i>
              }
              {path === "/signup" ?
              <i style={{color:"gray"}}><li>SignUp</li></i> :
              <i onClick={signup} ><li>SignUp</li></i>
              }
        </ul>
</>
 )
}