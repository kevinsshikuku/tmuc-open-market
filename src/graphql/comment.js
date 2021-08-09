import gql from 'graphql-tag';

/**
 * Creates a comment
 */
export const CREATE_COMMENT = gql`
  mutation(
        $comment:String!
        $postId: ID!
        $author: ID!
  ) {
    createComment(comment:$comment, postId:$postId, author:$author) {
      id
      comment
    }
  }
`;




 

/**
 * Deletes a comment
 */
export const DELETE_COMMENT = gql`
  mutation($id: ID! ) {
    deleteComment(id: $id) {
      id
    }
  }
`;
