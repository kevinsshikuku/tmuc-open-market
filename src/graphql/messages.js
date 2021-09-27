import gql from 'graphql-tag';

/**
 * Gets  public chat conversations conversation
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
      replies{
        id
        author{
          id
          username
          image
        }
        body
        createdAt
      }
      body
      createdAt
    }
  }
`;

/**
 * Gets public chat message
 */
export const GET_MESSAGE = gql`
  query($messageId: ID!){
    getMessage(messageId: $messageId){
      id
      sender {
        id
        username
        fullname
        image
        createdAt
      }
      replies{
        id
        author{
          id
          username
          image
        }
        body
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

export const SEND_REPLY = gql`
  mutation($body: String! $messageId: ID!) {
    sendReply(body: $body messageId: $messageId) {
      id
      author {
        id
        username
      }
      message {
        id
        body
        replies{
          id
          body
        }
      }
      body
      createdAt
    }
  }
`;
