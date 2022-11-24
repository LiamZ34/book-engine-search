import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation loginUser ($email: String!, $password: String!){
    login (email: $email, password: $password) {
        token {
            _id
            username
        }

        }

}
`;

export const ADD_USER = gql`
mutation addUser ($username: String!, $email: String!, $password: String!){
    addUser (username: $username, email: $email, password: $password) {
        token {
            
            _id
            username
        }
        
    }
}
`

export const SAVE_BOOK = gql`
mutation saveBook ($bookData: BookInput!) {
    saveBook (bookData: $BookInput) {
        bookId 
        authors
        title
    }
}
`

export const REMOVE_BOOK = gql`
mutation removeBook ($bookId: ID) {
    removeBook (bookId: $ID) {
        authors
        description
        bookId
    }
}
`

