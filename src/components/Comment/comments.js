import React from 'react';
import './comment.css';
import { useStore } from '../../store';
import DeleteButton from "../Delete/Delete";


/** List of comments */
function Comments({comment}) {
 const [{auth}] = useStore();
 return (
  <div className="commentWrapper">
    <div> <b>{`${comment.author.username}:`}</b>  </div>
    <div className="comment">

       {<p>{comment.comment}</p>}

      <div className="delete_btn">
        {(auth.user.username === comment.author.username ) &&
        <DeleteButton commentId={comment.id} />}
      </div>

    </div>
  </div>
 )
}

export default Comments;
