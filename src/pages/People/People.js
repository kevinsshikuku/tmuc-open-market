import React from 'react';
import {useStore} from "../../store"
import {useQuery} from "@apollo/client";
import RouteHeader from "../../components/Header/routeHeader";
import {USER_SUGGESTIONS} from "../../graphql/user";
import Person from "./person";
import { PeopleSkeleton } from "../../components/Skeleton/skeleton";
import { EmojiEmotionsSharp } from "@material-ui/icons";

/** People component */
function People() {
   const [{auth}] = useStore();

   const variables = {
    userId: auth.user.id,
  };

  const {data, loading} = useQuery(USER_SUGGESTIONS, {
          variables,
    });

  let loader;
  if(loading){
   return(
     loader = <div>
                <RouteHeader tag={"People"}/>
                <br/> <br/>
                <div className="people_loader">
                   <PeopleSkeleton/>
                   <PeopleSkeleton/>
                   <PeopleSkeleton/>
                   <PeopleSkeleton/>
                   <PeopleSkeleton/>
                </div>
              </div>
   )
  }



const people = data.suggestPeople;

let noPeople;
if(!people.length && !loading){
  return (
     noPeople = <div>
                <RouteHeader tag={"People"}/>
                <div className="people_loader">
                   <br/> <br/> <br/> <br/> <br/>
                   <EmojiEmotionsSharp color="error"/>
                   <p style={{color:"brown"}} >ooops there are no sellers you my know !!!</p>
                </div>
              </div>
   )
}



 return (
  <div>
   <RouteHeader tag={"People"}/>
    <main>
       {loading ? loader : (
         <div>
            {data &&  people.map( person => (
                <div key={person.id}>
                  <Person person={person}/>
                </div>
            ))}
         </div>
       )}
       {noPeople}
    </main>
  </div>
 )
}

export default People
