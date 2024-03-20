import {gql} from "@apollo/client";

// Create User Mutation
export const CREATE_USER = gql`
  mutation signup($email: String!, $firstname: String!, $lastname: String!, $password: String!) {
    signup(email: $email, firstname: $firstname, lastname: $lastname, password: $password) {
        user {
            user_id
            email
            firstname
            lastname
        }
        token
        refreshToken
    }
  }
`;
export const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            token,
            refreshToken,
            user {
              user_id
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
  mutation createEvent($name: String!, $description: String!, $date: String!, $time: String!, $location: String!, $image_cover: String!, $userId: String!, $guestIds: [String]!) {
    createEvent( name: $name, description: $description, date: $date, time: $time, location: $location, image_cover: $image_cover, author_event_id: $userId, guests_ids: $guestIds) {
        event_id
        name
        description
        date
        time
        location
        image_cover
        author_event {
            user_id
            email
            firstname
            lastname
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
  mutation updateUser($userId: String!, $email: String!, $firstname: String!, $lastname: String!) {
    updateUser(id: $userId, email: $email, firstname: $firstname, lastname: $lastname) {
        user_id
        email
        firstname
        lastname
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

export const UPDATE_EVENT_JOIN_FUNCTION = gql`
  mutation updateEvent($eventId: ID!, $guests: [ID!]) {
    updateEvent(event_id: $eventId, guests: $guests) {
        eventId
        guests
    }
  }
`;

export const SINGLE_UPLOAD_FILE = gql`
    mutation singleUploadFile($file: Upload!) {
        singleUploadFile(file: $file)
    }
    `;

export const GET_GUESTS_BY_EVENT = gql`
    query getEventById($eventId: String!) {
        getEventById(id: $eventId) {
            guests {
                user_id
                email
                firstname
                lastname
            }
        }
    }
`;

export const ADD_GUEST_TO_EVENT = gql`
    mutation updateEventGuests($eventId: String!, $guests: [String!]!) {
        updateEventGuests(id: $eventId, guests: $guests) {
            event_id
            guests {
                user_id
                email
                firstname
                lastname
            }
        }
    }
`;

export const DELETE_GUEST_FROM_EVENT = gql`
    mutation deleteEventGuest($eventId: String!, $guestId: String!) {
        deleteEventGuest(eventId: $eventId, guestId: $guestId) {
            event_id
            guests {
                user_id
                email
                firstname
                lastname
            }
        }
    }
`;