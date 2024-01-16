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

