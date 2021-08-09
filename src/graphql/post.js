import gql from 'graphql-tag';

/** Records to select from post comments */
export const postCommentsPayload = `
  comments {
    id
    comment
    author {
      id
      username
      image
    }
  }
`;

/** Records to select from post author */
export const postAuthorPayload = `
  author {
    id
    username
    phonenumber
    image
    following {
      id
      user
    }
    followers {
      id
      user
    }
    notifications {
      id
      author {
        id
        username
      }
      follow {
        id
      }
      like {
        id
      }
      comment {
        id
      }
    }
  }
`;

/** Records to select from post likes */
export const postLikesPayload = `
  likes {
    id
    user
    post
  }
`;


/** Records to select from post likes */
export const likesPostPayload = `
  likes{
      id
      post {
          id
          title
          description
          features
          inStock
          price
          crossedPrice
          imagePublicId
          image
          createdAt
      }
     user {
        username
        fullname
        phonenumber
        email
        image
        imagePublicId
        location
        businessdescription
        createdAt
    }
  }
`;


/** Records to select from post views */
export const postViewsPayload = `
  views {
    id
    user
    post
  }
`;

/** Creates a post */
export const CREATE_POST = gql`
  mutation(
        $title:String,
        $description:String,
        $price:String,
        $features: String
        $location: String
        $image: Upload,
        $authorId: ID!,
        $crossedPrice:String
  ) {
    createPost(title:$title, description:$description, features:$features, price:$price, crossedPrice:$crossedPrice, location:$location, image:$image, authorId:$authorId) {
      id
    }
  }
`;



/** Gets all posts from followed users */
export const GET_FOLLOWED_POSTS = gql`
  query($userId: String!, $skip: Int, $limit: Int) {
    getFollowedPosts(userId: $userId, skip: $skip, limit: $limit) {
      count
      likes {
          id
          post {
              id
              title
              description
              features
              inStock
              price
              crossedPrice
              image
              imagePublicId
              createdAt
              ${postAuthorPayload}
              ${postCommentsPayload}
              ${likesPostPayload}
              ${postViewsPayload}
          }
        user {
              id
              username
              location
              businessdescription
              phonenumber
              email
              image
         }
      }
      posts {
        id
        title
        description
        features
        inStock
        price
        crossedPrice
        image
        imagePublicId
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${likesPostPayload}
        ${postViewsPayload}
      }
    }
  }
`;

/**Gets all available posts */
export const GET_POSTS = gql`
  query( $skip: Int, $limit: Int) {
    getPosts( skip: $skip, limit: $limit)
     {
      # cache_posts @client
      posts {
        id
        title
        description
        features
        inStock
        price
        location
        crossedPrice
        image
        imagePublicId
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${likesPostPayload}
        ${postViewsPayload}
      }
    }
  }
`;


/**Gets all available posts */
export const GET_PAGINATED_POSTS = gql`
  query( $cursor: String, $limit: Int) {
    getPaginatedPosts( cursor: $cursor, limit: $limit)
     {
      count
      cursor
      hasMore
      posts {
        id
        title
        description
        features
        inStock
        price
        location
        crossedPrice
        image
        createdAt
        ${postAuthorPayload}
        ${postCommentsPayload}
        ${likesPostPayload}
      }
    }
  }
`;




/** Gets specific post by id */
export const GET_POST = gql`
  query($id: ID!) {
    getPost(id: $id) {
      id
      title
      description
      features
      inStock
      price
      location
      crossedPrice
      image
      createdAt
      ${postAuthorPayload}
      ${postCommentsPayload}
      ${likesPostPayload}
    }
  }
`;



/**
 * Gets user's specific post in real time
 */
export const GET_ITEMS_SUBSCRIPTION = gql`
  subscription {
    newPost {
        id
        title
        description
        features
        inStock
        location
        price
        crossedPrice
        image
        imagePublicId
        createdAt
    }
  }
`;








/**
 * Searches posts by title or description or price
 */
export const SEARCH_POSTS = gql`
  query($searchQuery: String!) {
    searchPosts(searchQuery: $searchQuery) {
      id
      title
      description
      features
      location
      price
      crossedPrice
      image
      imagePublicId
      createdAt
    }
  }
`;


/** Edits specific user post  */
export const UPDATE_POST = gql`
 mutation($postId:ID! $title:String $description:String $features:String, $inStock:String, $price:String, $crossedPrice:String){
   updatePost(
     postId:$postId
     title:$title
     description:$description
     features:$features
     inStock:$inStock
     price:$price
     crossedPrice:$crossedPrice
   ){
      id
      title
      description
      features
      price
      location
      inStock
      crossedPrice
      image
   }
 }
`;

/** Deletes a post */
export const DELETE_POST = gql`
  mutation($id: ID! $imagePublicId:String) {
    deletePost(id: $id imagePublicId:$imagePublicId){
      id
    }
  }
`;


/**
 * Get new post updates in real time
 */
export const GET_NEW_POST_SUBSCRIPTION = gql`
  subscription {
  newPost {
        id
        title
        description
        features
        location
        price
        crossedPrice
        image
        imagePublicId
        createdAt
        updatedAt
    }
  }
`;