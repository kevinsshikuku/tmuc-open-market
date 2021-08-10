import gql from 'graphql-tag';
import { postCommentsPayload, postAuthorPayload, likesPostPayload, postViewsPayload} from './post';

/**
 * Records to select from user
 */
const userPayload = `
  id
  username
  fullname
  phonenumber
  email
  facebook
  twitter
  instagram
  image
  imagePublicId
  coverImage
  coverImagePublicId
  location
  businessdescription
  createdAt
`;


/**
 * Gets specific user by username
 */
export const GET_USER = gql`
  query( $username: String) {
    getUser( username: $username) {
      ${userPayload}
      ${likesPostPayload}
      isOnline
      posts {
        id
        title
        inStock
        description
        features
        price
        crossedPrice
        imagePublicId
        image
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${likesPostPayload}
        ${postViewsPayload}
      }
      buys {
        id
        title
        description
        features
        pricerange
        createdAt
        ${postAuthorPayload}
      }
      following {
        id
        user
      }
      followers {
        id
        user
      }
    }
  }
`;

/** Gets user posts */
export const GET_USER_POSTS = gql`
  query($username: String!, $skip: Int, $limit: Int) {
    getUserPosts(username: $username, skip: $skip, limit: $limit) {
      count
      cursor
      hasMore
      posts {
        id
        title
        description
        features
        price
        inStock
        crossedPrice
        imagePublicId
        image
        createdAt
      }
    }
  }
`;

/**
 * Gets user buys
 */
export const GET_USER_BUYS = gql`
  query($username: String!, $skip: Int, $limit: Int) {
    getUserBuys(username: $username, skip: $skip, limit: $limit) {
      count
      buys {
        id
        title
        description
        features
        pricerange
        createdAt
        ${postAuthorPayload}
      }
    }
  }
`;


/**
 * Gets authenticated user
 */
export const GET_AUTH_USER = gql`
  query {
    getAuthUser {
      ${userPayload}
      ${likesPostPayload}
      isOnline
      posts {
        id
        title
        description
        features
        price
        crossedPrice
        imagePublicId
        image
        createdAt
        ${likesPostPayload}
      }
      buys {
        id
        title
        description
        features
        pricerange
        createdAt
        ${postAuthorPayload}
      }
      following {
        id
        user
      }
      followers {
        id
        user
      }
    }
  }
`;

/**
 * Gets all available users
 */
export const GET_USERS = gql`
  query($userId: String!, $skip: Int, $limit: Int) {
    getUsers(userId: $userId, skip: $skip, limit: $limit) {
      count
      users {
        id
        username
        location
        businessdescription
        phonenumber
        email
        image
        imagePublicId
        following {
          id
          user
        }
        followers {
          id
          user
        }
      }
    }
  }
`;

/**
 * Searches users by username or fullName
 */
export const SEARCH_USERS = gql`
  query($searchQuery: String!) {
    searchUsers(searchQuery: $searchQuery) {
      id
      username
      image
      imagePublicId
    }
  }
`;

/**
 * Uploads user photo
 */
export const UPLOAD_PHOTO = gql`
  mutation( $id: ID! $image: Upload! $isCover: Boolean ) {
    uploadUserPhoto(id:$id, image: $image, isCover:$isCover) {
      id
    }
  }
`;

/**
 * Sign up user
 */
 export const SIGN_UP =  gql `
 mutation( $username:String! $phonenumber:String! $password:String! $confirmPassword: String!){
      signup(
      username:$username
      phonenumber:$phonenumber
      password:$password
      confirmPassword:$confirmPassword
     ) {
       token
     }
  }
`;


/**
 * Sign in user
 */
export const SIGN_IN =  gql `
 mutation( $phoneOrUsername:String! $password:String!){
      signin(
      phoneOrUsername:$phoneOrUsername
      password:$password
     ){
      token
     }
  }
`;


/** Edits user profile */
export const EDIT_USER_PROFILE = gql`
 mutation($id:ID $fullname:String $email:String $location:String $businessdescription:String){
   editUserProfile(
     id:$id
     fullname:$fullname
     email:$email
     location:$location
     businessdescription:$businessdescription
   ){
     token
   }
 }
`;



/** Add links to user */
export const ADD_LINKS = gql`
 mutation($id:ID $twitter:String  $instagram:String $facebook:String ){
   addLinks(
     id:$id
     twitter:$twitter
     instagram:$instagram
     facebook:$facebook
   ){
     token
   }
 }
`;


/**
 * Request reset password
 */
export const REQUEST_PASSWORD_RESET = gql`
  mutation($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      message
    }
  }
`;

/**
 * Verify reset password token
 */
export const VERIFY_RESET_PASSWORD_TOKEN = gql`
  query($phonenumber: String!, $token: String!) {
    verifyResetPasswordToken(phone: $phone, token: $token) {
      message
    }
  }
`;

/**
 * Reset password
 */
export const RESET_PASSWORD = gql`
  mutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      token
    }
  }
`;

/**
 * People suggestions for auth user
 */
export const USER_SUGGESTIONS = gql`
  query($userId: String!) {
    suggestPeople(userId: $userId) {
      id
      username
      image
      phonenumber
    }
  }
`;

/**
 * Get users with whom authUser had a conversation
 */
export const GET_CONVERSATIONS = gql`
  query($authUserId: ID!) {
    getConversations(authUserId: $authUserId) {
      id
      username
      image
      isOnline
      seen
      lastMessage
      lastMessageSender
      lastMessageCreatedAt
    }
  }
`;

/**
 * Checks if user is online in real time
 */
export const IS_USER_ONLINE_SUBSCRIPTION = gql`
  subscription($authUserId: ID!, $userId: ID!) {
    isUserOnline(authUserId: $authUserId, userId: $userId) {
      userId
      isOnline
    }
  }
`;
