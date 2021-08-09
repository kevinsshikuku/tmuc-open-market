import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton} from "../../components/Skeleton/skeleton";

import  "./buyers.css";
import Header from "../../components/Header";
import Buycard from "../../components/Postcard/buyCard";

import { GET_BUYS} from "../../graphql/buy";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {NotificationsTwoTone} from '@material-ui/icons';






/** Buyer component */
function Buyers() {
        UsedocumentTitle("Home");

        const variables = {
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading } = useQuery(GET_BUYS,{
          variables,
          // fetchPolicy:"cache-and-network",
          });
        const skeleton = (
          <>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </>
        )

        let loader;
        if(!data || loading ){
          return loader = (
            <div>
              <Header notification_icon={<NotificationsTwoTone style={{color:"gray"}} />}/>
              {skeleton}
            </div>
          )
        }

const { buys} = data.getBuys;
  const main =  buys && (
  <div className="homeContainer">
          { buys.map( (buy, i) =>
            <div className="card" key={buy.id}>
                  { <Buycard  buy={buy}/>}
            </div>
            )}
  </div>
  )
 return (
<>
  <Header/>
  {loading && loader}
  {data && !loading  && main}
  {(!loading && !data) && loader }
</>
 )
}

export default  React.memo(Buyers);
