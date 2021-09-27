import gql from 'graphql-tag';

/**
 * Creates a following between two users
 */
export const CREATE_FOLLOW = gql`
  mutation($userId:ID!, $followerId:ID!) {
    createFollow(userId: $userId, followerId: $followerId) {
      id
    }
  }
`;

/**
 * deletes a following
 */
export const DELETE_FOLLOW = gql`
  mutation($id: ID!) {
    deleteFollow(id: $id) {
      id
    }
  }
`;
