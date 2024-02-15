import {gql} from "@apollo/client";


export const SHOW_ALL_EVENTS = gql`
    query {
    events {
        eventId
        name
        description
        location
        date
        imageCover
        authorEvent {
            userId
            firstname
            lastname
            email
        }
        guests
    }
}
    `;

// export const SHOW_ALL_EVENTS = gql`
//     query GetEvents ($first: Int!) {
//     events(first: $first) {
//         eventId
//         name
//         description
//         location
//         date
//         imageCover
//         authorEvent {
//             userId
//             firstname
//             lastname
//             email
//         }
//         guests
//     }
// }
//     `;

export const SHOW_EVENT_BY_ID = gql`
  query GetEventById($eventId: Int!) {
    eventById(eventId: $eventId) {
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
      guests
    }
  }
`;

export const GET_CURRENT_USER = gql`
query {
  loggedIn {
    userId,
    firstname
    lastname,
    email
  }
}
`;

export const GET_USERS = gql`
query {
  users {
    userId
    firstname
    lastname
    email
  }
}
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user (userId: $userId) {
      userId
      firstname
      lastname
      email
      
    }
  }
`;

// events {
//   eventId
//   name
//   description
//   location
//   date
//   imageCover
//   authorEvent {
//     userId
//     firstname
//     lastname
//     email
//   }
//   guests
// }