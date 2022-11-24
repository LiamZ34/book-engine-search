import {gql} from '@apollo/client'

export const QUERY_ME = gql`

    query getMe {
        User {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;