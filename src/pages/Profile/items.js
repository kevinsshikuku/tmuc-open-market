import React from 'react';
import RouteHeader from "../../components/Header/routeHeader";
import Postgrid from "../../components/PostGrid/postGrid";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {ShoppingBasket} from "@material-ui/icons";


/**AuthUser items */
function UserItems({posts}) {
const count = posts.length;
UsedocumentTitle("Items")

 return (
  <>
  <RouteHeader tag={ <p><ShoppingBasket/> {count} </p>  }/>
  <div className="auth_prifile_grid">
          { posts && posts.map( (post) =>
            (<div className="ProfileGridcard" key={post.id}>
                { <Postgrid  post={post} count={count}/>}
            </div>)
            )}
  </div>
  </>
 )
}

export default UserItems;
