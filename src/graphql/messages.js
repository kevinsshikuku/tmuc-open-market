import gql from 'graphql-tag';

/**
 * Gets user's public chat conversations conversation
 */
export const GET_MESSAGES = gql`
  query{
    getMessages{
      id
      sender {
        id
        username
        fullname
        image
        createdAt
      }
      body
      createdAt
    }
  }
`;

/**
 * Gets user's specific conversation in real time
 */
export const GET_MESSAGES_SUBSCRIPTION = gql`
  subscription($authUserId: ID!, $userId: ID!) {
    messageCreated {
      id
      sender {
        id
        username
        fullName
        image
        createdAt
      }
      body
      createdAt
    }
  }
`;

/**
 * sends message to public chat
 */
export const CREATE_MESSAGE = gql`
  mutation($body: String!) {
    createMessage(body: $body) {
      id
      sender {
        id
        username
        fullname
        image
        createdAt
      }
      body
      createdAt
    }
  }
`;


