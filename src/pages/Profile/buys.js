import React from 'react';
import RouteHeader from "../../components/Header/routeHeader";
import Buygrid from "../../components/PostGrid/buyGrid";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {AddShoppingCartSharp }   from "@material-ui/icons";

/**AuthUser buys */
function UserBuys({buys}) {
const count = buys.length;
UsedocumentTitle("Items")

 return (
  <>
  <RouteHeader tag={<p><AddShoppingCartSharp/> {count} </p> }/>
  <div className="auth_prifile_grid">
          { buys && buys.map( (buy) =>
            (<div className="ProfileGridcard" key={buy.id}>
                { <Buygrid  buy={buy} count={count}/>}
            </div>)
            )}
  </div>
  </>
 )
}

export default UserBuys;
