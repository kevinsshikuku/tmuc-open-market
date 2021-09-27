import {useHistory} from "react-router-dom";
import {useStore} from "../store";
import useGAEvents from "../Hooks/useGAEvents"
/** Application routes */


function Routes() {
const history = useHistory();
 const [{auth}] = useStore();
 const GAEventTracker = useGAEvents("Route")

const route = {
      backHome: (e) =>{
       history.push('/')
    },
     sell: (e) => {
     GAEventTracker("Page navigation", e.target.baseURI)
      return history.push('./sell')
   },
    buy: (e) => {
      GAEventTracker("Page navigation", e.target.baseURI)
      return history.push('./buy')
   },
    chat: (e) => {
      GAEventTracker("Page navigation", e.target.baseURI)
      return history.push('./chat')
   },
    buyers: (e) => {
      GAEventTracker("Page navigation", e.target.baseURI)
      return history.push('./buyers')
   },
    search:  (e) =>{
       GAEventTracker("Page navigation", e.target.baseURI)
       history.push('/search')
    },
    AboutUs:  (e) =>{
       GAEventTracker("Page navigation", e.target.baseURI)
       history.push('/aboutus')
    },
    toPrile:  (e) =>{
       GAEventTracker("Page navigation", e.target.baseURI)
       history.push(`/profile/${auth.user.username}`)
    },
    toAppInfo: (e) =>{
        GAEventTracker("Page navigation", e.target.baseURI)
       history.push(`/windoshoppe`)
    },
    settings: (e) =>{
       GAEventTracker("Page navigation", e.target.baseURI)
       history.push(`/profile/${auth.user.username}/editprofile`)
    },
    toProfile:  (e) =>{
        GAEventTracker("Page navigation", e.target.baseURI)
       history.push(`/profile/${auth.user.username}`)
    },
    toPeople: (e) => {
       GAEventTracker("Page navigation", e.target.baseURI)
      history.push("/people")
   },
   signup: (e) =>{
      GAEventTracker("Page navigation", e.target.baseURI)
      history.push('/signup')
   },
   Login: (e) =>{
      GAEventTracker("Page navigation", e.target.baseURI)
      history.push('/signin')
   },
   goBack: (e) => {
      history.goBack()
   }
 }

 return route
}

export default Routes
