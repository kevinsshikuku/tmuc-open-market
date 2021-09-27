import React from 'react';
import RouteHeader from "../../components/Header/routeHeader";
import Postgrid from "../../components/PostGrid/postGrid";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {ShoppingBasket} from "@material-ui/icons";


/**AuthUser items */
function LikedItems({posts}) {
const count = posts.length
UsedocumentTitle("Items liked")

 return (
  <>
  <RouteHeader tag={<p><ShoppingBasket/> {count} </p>  }/>

  <div className="auth_prifile_grid">
          { posts && posts.map( (post) =>
            (<div className="ProfileGridcard" key={post.createdAt}>
                { <Postgrid  post={post} count={count} likedItem={true} />}
            </div>)
            )}
  </div>
  </>
 )
}

export default LikedItems;
