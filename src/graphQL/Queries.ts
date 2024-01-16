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
                firstname
                lastname
                email
            }
        }
    }
    `;

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
    }
  }
`;
