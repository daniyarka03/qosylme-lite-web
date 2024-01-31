import {gql} from "@apollo/client";

// Create User Mutation
export const CREATE_USER = gql`
  mutation createUser($email: String!, $firstname: String!, $lastname: String!, $password: String!) {
    createUser(email: $email, firstname: $firstname, lastname: $lastname, password: $password) {
        user {
            userId
            email
            firstname
            lastname
        }
        token
    }
  }
`;
export const LOGIN_MUTATION = gql`
    mutation TokenAuthWithUser($email: String!, $password: String!) {
        tokenAuthWithUser (email: $email, password: $password) {
        token,
        refreshToken,
        user {
          userId
        }
      }
    }
`;

export const GET_USER_INFO = gql`
  mutation getUserInfo($token: String!) {
    getUserInfoFromToken(token: $token) {
      user {
        userId,
        firstname,
        lastname,
        email
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($name: String!, $description: String!, $date: Date!, $time: Time!, $location: String!, $image_cover: String!, $userId: ID!, $email: String!, $firstname: String!, $lastname: String!) {
    createEvent( name: $name, description: $description, date: $date, time: $time, location: $location, imageCover: $image_cover, userId: $userId, email: $email, firstname: $firstname, lastname: $lastname) {
      event {
        eventId
        name
        description
        date
        time
        location
        imageCover
        authorEvent {
            userId
            email
            firstname
            lastname
        }
      }
    }
  }
`;


export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $eventId: ID!
    $name: String!
    $description: String!
    $date: Date!
    $time: Time!
    $location: String!
    $image_cover: String!
  ) {
    updateEvent(
      eventId: $eventId
      name: $name
      description: $description
      date: $date
      time: $time
      location: $location
      imageCover: $image_cover
    ) {
      event {
        eventId
        name
        description
        date
        time
        location
        imageCover
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      success
    }
  }
`;

// Update User Mutation
export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $email: String, $firstname: String, $lastname: String, $password: String) {
    updateUser(userId: $userId, email: $email, firstname: $firstname, lastname: $lastname, password: $password) {
      user {
        userId
        email
        firstname
        lastname
      }
    }
  }
`;

// Delete User Mutation
export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      success
    }
  }
`;

export const REFRESH_TOKEN = gql`
    mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
        token
        refreshToken
        }
    }
`;
