import gql from 'graphql-tag';

/**
 * Creates a like
 */
export const CREATE_LIKE = gql`
  mutation($postId:ID!, $userId:ID!){
    createLike(userId:$userId, postId:$postId ){
      id
    }
  }
`;

/**
 * Deletes a like
 */
export const DELETE_LIKE = gql`
  mutation($id: ID!) {
    deleteLike(id: $id) {
      id
    }
  }
`;
