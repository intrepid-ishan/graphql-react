const { gql } = require('apollo-server')

const typeDefs = gql`
    type User{
        id: ID!
        username: String!
    }

    type Pet{
        id: ID!
        createdAt: String!
        name: String!
        type: String!
    }

    input PetInput{
        name: String
        type: String
    }

    type Query{
        getUser: User
        getPets(input: PetInput): [Pet]!
        getPet(input: PetInput): Pet
    }
`;

module.exports = typeDefs
