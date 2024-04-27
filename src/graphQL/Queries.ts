import {gql} from "@apollo/client";


export const SHOW_ALL_EVENTS = gql`
    query {
        getEvents {
            event_id
            name
            description
            location
            date
            image_cover
            author_event {
                user_id
                firstname
                lastname
                email
            }
            guests {
                user_id
                firstname
                lastname
                email
            }
        }
    }
`;

export const SHOW_EVENT_BY_ID = gql`
  query getEventById($eventId: String!) {
    getEventById(id: $eventId) {
      event_id
      name
      description
      date
      time
      location
      image_cover
      author_event {
        avatar
        user_id
        email
        firstname
        lastname
      }
      guests {
        avatar    
        user_id
        email
        firstname
        lastname
      }
    }
  }
`;

export const GET_CREATED_EVENTS = gql`
    query getEventsByUser($userId: String!) {
        getEventsByUser(userId: $userId) {
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

export const GET_ATTENDED_EVENTS = gql`
    query getUserById($userId: String!) {
        getUserById(id: $userId) {
              user_id
              firstname
              lastname
              email
                attendedEvents {
                    event_id
                    name
                    description
                    location
                    date
                    time
                    image_cover
                    author_event {
                        user_id
                        firstname
                        lastname
                        email
                    }
            }
        }
    }
`;

export const GET_USERS = gql`
query {
  getUsers {
    user_id
    firstname
    lastname
    email
  }
}
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
    getUserById (id: $userId) {
      user_id
      avatar
      firstname
      lastname
      email
      xp
      coins
      participatedChallenges {
        participated_id 
        result
        result_state
        challenge {
          challenge_id
          name
          description
          deadline
          xp_award
          coins_award
          image_cover
        }
      }
      attendedEvents {
                    event_id
                    name
                    description
                    location
                    date
                    time
                    image_cover
                    author_event {
                        user_id
                        firstname
                        lastname
                        email
                    }
            }
    }
  }
`;

export const VERIFY_TOKEN = gql`
    query verifyToken ($token: String!) {
        verifyToken (token: $token) {
           user_id
        }
    }
`;

export const GET_CHALLENGES = gql`
    query {
        getChallenges {
            challenge_id
            name
            description
            deadline
            xp_award
            coins_award
            image_cover
            participants {
                participated_id 
                result
                result_state
                updated_at
                user {
                    user_id
                    email
                    firstname
                    lastname
                }
            }
        }
    }
`;

export const GET_CHALLENGE_ONE = gql`
    query getChallengeById($challengeId: String!) {
        getChallengeById(id: $challengeId) {
            challenge_id
            name
            description
            deadline
            xp_award
            coins_award
            image_cover
            participants {
                participated_id 
                result
                result_state
                updated_at
                user {
                    user_id
                    email
                    firstname
                    lastname
                }
            }
        }
    }
`;

export const GET_USERS_CHALLENGES = gql`
    query getUserById($userId: String!) {
        getUserById(id: $userId) {
            user_id
            firstname
            lastname
            email
            participatedChallenges {
                participated_id
                result
                result_state
                challenge {
                    challenge_id
                    name
                    description
                    deadline
                    xp_award
                    coins_award
                    image_cover
                }
            }
        }
    }
`;