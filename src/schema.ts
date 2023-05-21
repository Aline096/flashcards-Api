import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    flashcards: [Flashcard!]!
  }

  type Flashcard {
    id: Int!
    question: String!
    answer: String!
    isDone: Boolean!
    user: User!
  }

  type Query {
    users: [User!]
    user(id: Int!): User!
    flashcards: [Flashcard!]!
    flashcard(id: Int!): Flashcard!
  }

  type Mutation {
    registerUser(email: String!, name: String!, password: String): User!
    loginUser(email: String!, password: String!): String!
    createFlashcard(question: String!, answer: String!): Flashcard!
    updateFlashcard(id: Int!, question: String, answer: String, isDone: Boolean): Flashcard!
    deleteFlashcard(id: Int!): Flashcard!
  }
`;

export default typeDefs;
