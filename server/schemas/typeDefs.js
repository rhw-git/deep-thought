// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactions: [Reaction]
    reactionCount: Int
  }
  type Reaction {
    _id: ID
    reactionBody: String
    username: String
    createdAt: String
  }
  type User {
    _id: ID
    username: String
    email: String
    pasword: String
    thoughts: [Thought]
    friends: [User]
    friendCount: Int
  }
  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID): Thought
  }
`;

// export the typeDefs
module.exports = typeDefs;
