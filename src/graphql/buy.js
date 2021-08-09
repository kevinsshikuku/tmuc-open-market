import gql from 'graphql-tag';



/** Records to select from buy author */
export const buyAuthorPayload = `
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

/** Records to select from buy likes */
export const buyLikesPayload = `
  likes {
    id
    user
    buy
  }
`;


/** Creates a buy */
export const CREATE_BUY
= gql`
  mutation(
        $title:String,
        $description:String,
        $pricerange:String,
        $features: String
        $authorId: ID!,
  ) {
    createBuy(title:$title, description:$description, features:$features, pricerange:$pricerange, authorId:$authorId) {
      id
    }
  }
`;



/** Gets all buys from followed users */
export const GET_FOLLOWED_BUYS = gql`
  query($userId: String!, $skip: Int, $limit: Int) {
    getFollowedBuys(userId: $userId, skip: $skip, limit: $limit) {
      count
      buys {
        id
        title
        description
        features
        pricerange
        createdAt
        ${buyAuthorPayload}
      }
    }
  }
`;

/**Gets all available buys */
export const GET_BUYS = gql`
  query( $skip: Int, $limit: Int) {
    getBuys( skip: $skip, limit: $limit)
     {
      count
      buys {
        id
        title
        description
        features
        pricerange
        location
        createdAt
        ${buyAuthorPayload}
      }
    }
  }
`;


/**Gets all available buys */
export const GET_PAGINATED_BUYS = gql`
  query( $after: String, $limit: Int) {
    getPaginatedBuys( after: $after, limit: $limit)
     {
      count
      cursor
      hasMore
      buys {
        id
        title
        description
        features
        pricerange
        location
        createdAt
        ${buyAuthorPayload}
      }
    }
  }
`;




/** Gets specific buy by id */
export const GET_BUY
= gql`
  query($id: ID!) {
    getBuy(id: $id) {
      id
      title
      description
      features
      pricerange
      location
      createdAt
      ${buyAuthorPayload}
    }
  }
`;


/**
 * Searches buys by title or description or price
 */
export const SEARCH_BUYS = gql`
  query($searchQuery: String!) {
    searchBuys(searchQuery: $searchQuery) {
      id
      title
      description
      features
      location
      pricerange
      crossedPrice
      createdAt
    }
  }
`;


/** Deletes a buy */
export const DELETE_BUY
= gql`
  mutation($id: ID!) {
    deleteBuy(id: $id ) {
      id
    }
  }
`;
