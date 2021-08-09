import gql from 'graphql-tag';

/**
 * Creates a view
 */
export const CREATE_VIEW = gql`
  mutation($postId:ID!, $userId:ID!){
    createView(userId:$userId, postId:$postId ){
      id
    }
  }
`;
