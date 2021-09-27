import React,{useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import {CloudinaryContext} from "cloudinary-react";
import './App.css';
import ReactGA from 'react-ga';
import {PostNoficiactionProvider} from './Utils/PostNotificationContext';
import { NotFound, HomePage } from './pages/Home';
import FabComponent from "./components/Fab";
import Chat from "./pages/Chat";
import Buyers from "./pages/Buyers/Buyers";


ReactGA.initialize('UA-192087437-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const SignIn  = React.lazy( () => import("./pages/Auth/SignIn"));
const SignUp  = React.lazy( () => import("./pages/Auth/SignUp"));
const AboutUs = React.lazy( () => import("./pages/windoshoppe/about"));
const Sell = React.lazy( () => import("./pages/Sell/sell"));
const Buy = React.lazy( () => import("./pages/Buy/Buy"));
// const Buyers = React.lazy( () => import("./pages/Buyers/Buyers"));
const Search = React.lazy( () => import("./pages/Search/index"));
const Profile = React.lazy( () => import("./pages/UserInfor/profile"));
const UserItems = React.lazy( () => import( "./pages/UserInfor/items"));
const UserBuys = React.lazy( () => import( "./pages/UserInfor/buys"));
const Item = React.lazy( () => import( "./pages/Item/item"));
const BuyItem = React.lazy( () => import( "./pages/Item/buy"));
const AuthProfileComponent = React.lazy( () => import( "./pages/Profile/AuthUserProfile"));
const EditProfile = React.lazy( () => import("./pages/Profile/editProfile"));
const AuthUserSingleItem = React.lazy( () => import("./pages/Profile/item"));
const AppInfo = React.lazy( () => import( "./pages/windoshoppe/appInfo"));
const People = React.lazy( () => import("./pages/People/People"));
const PostNotification = React.lazy(()=> import('./pages/Notification/index'));
const EditPost = React.lazy(() => import('./pages/Profile/editPost'));
// const Chat = React.lazy(() => import("./pages/Chat"));


function App() {
   const history = useHistory();
   history.listen((location) => {

   if(location.pathname.includes('/item')){
      let rootURL = location.pathname.split("/")[1]
      ReactGA.pageview(rootURL)
   }else {
      ReactGA.set({page:location.pathname});
      ReactGA.pageview(location.pathname)
   }
   });


 const fall_back = (
    <div className="fallback">
     <div className="header"/>
     <p>SHOPIIN</p>
    </div>
 )


useEffect( () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
},[history] )

  return (
   <>
     <PostNoficiactionProvider>
         <CloudinaryContext cloudName="dsvun26ld" dpr="w-auto">
            <div className="App">
               <FabComponent/>
               <React.Suspense fallback={ <div>{fall_back}</div>}>
                     <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route exact path='/signin' component={SignIn}/>
                        <Route exact path='/signup' component={SignUp}/>
                        <Route exact path='/aboutus' component={AboutUs}/>
                        <Route exact path='/windoshoppe' component={AppInfo} />
                        <Route exact path='/search' component={Search}/>
                        <Route exact path='/sell' component={Sell}/>
                        <Route exact path='/buy' component={Buy}/>
                        <Route exact path='/buyers' component={Buyers}/>
                        <Route exact path='/people' component={People}/>
                        <Route exact path='/notification' component={PostNotification}/>

                        <Route exact path="/chat" component={Chat}/>

                        <Route exact path="/profile/:username/items" component={UserItems}/>
                        <Route exact path="/profile/:username/buys" component={UserBuys}/>
                        <Route exact path='/item/:id' component={Item}/>
                        <Route exact path='/buy/:id' component={BuyItem}/>

                        <Route exact path='/profile/:username' component={AuthProfileComponent}/>
                        <Route exact path='/:username/edit/:id' component={EditPost}/>
                        <Route exact path='/profile/:username/editprofile' component={EditProfile}/>
                        <Route exact path='/:username/:id' component={AuthUserSingleItem}/>
                        <Route exact path="/:username" component={Profile}/>
                        <Route path='*' component={NotFound}/>
                  </Switch>
               </React.Suspense>
            </div>
         </CloudinaryContext>
      </PostNoficiactionProvider>
   </>
  );
}

export default App;
