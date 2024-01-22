import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation TokenAuthWithUser($email: String!, $password: String!) {
        tokenAuthWithUser (email: $email, password: $password) {
        token,
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
  mutation createEvent($name: String!, $description: String!, $date: Date!, $time: Time!, $location: String!, $image_cover: String!) {
    createEvent( name: $name, description: $description, date: $date, time: $time, location: $location, imageCover: $image_cover) {
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